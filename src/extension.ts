import * as vscode from 'vscode';
import { ActivityTracker } from './activityTracker';
import { ContextExtractor } from './contextExtractor';
import { StateManager } from './stateManager';
import { ResumePopup } from './resumePopup';
import { WorkContext, ExtensionConfig } from './types';

let activityTracker: ActivityTracker | undefined;
let contextExtractor: ContextExtractor | undefined;
let stateManager: StateManager | undefined;
let resumePopup: ResumePopup | undefined;
let statusBarItem: vscode.StatusBarItem | undefined;

/**
 * Get extension configuration
 */
function getConfig(): ExtensionConfig {
	const config = vscode.workspace.getConfiguration('whatWasIDoing');
	return {
		idleTimeoutMinutes: config.get('idleTimeoutMinutes', 10),
		maxHistorySize: config.get('maxHistorySize', 10),
		excludePatterns: config.get('excludePatterns', []),
		autoShowResumePopup: config.get('autoShowResumePopup', true),
		todoKeywords: config.get('todoKeywords', ['TODO', 'FIXME', 'HACK', 'NOTE', 'BUG', 'XXX']),
	};
}

/**
 * Check if file should be tracked based on exclude patterns
 */
function shouldTrackFile(filePath: string, excludePatterns: string[]): boolean {
	// Skip non-file schemes
	if (!filePath.startsWith('/') && !filePath.match(/^[a-zA-Z]:\\/)) {
		return false;
	}

	// Check exclude patterns
	for (const pattern of excludePatterns) {
		const regex = new RegExp(pattern.replace(/\*/g, '.*'));
		if (regex.test(filePath)) {
			return false;
		}
	}

	return true;
}

/**
 * Update status bar with last activity info
 */
function updateStatusBar(context?: WorkContext): void {
	if (!statusBarItem) {
		return;
	}

	if (context) {
		const timeAgo = formatTimeAgo(context.timestamp);
		statusBarItem.text = `$(clock) Last: ${timeAgo}`;
		statusBarItem.tooltip = `Last active: ${context.functionName || 'Unknown'}\nClick to view history`;
		statusBarItem.show();
	}
}

function formatTimeAgo(timestamp: number): string {
	const diff = Date.now() - timestamp;
	const minutes = Math.floor(diff / (60 * 1000));
	const hours = Math.floor(diff / (60 * 60 * 1000));

	if (minutes < 1) { return 'now'; }
	if (minutes < 60) { return `${minutes}m ago`; }
	return `${hours}h ago`;
}

export async function activate(context: vscode.ExtensionContext) {
	console.log('What Was I Doing extension is now active');
	
	// Show visible confirmation that extension loaded
	vscode.window.showInformationMessage('✅ What Was I Doing extension activated!');

	const config = getConfig();

	// Initialize components
	stateManager = new StateManager(context, config.maxHistorySize);
	activityTracker = new ActivityTracker(config.idleTimeoutMinutes);
	contextExtractor = new ContextExtractor();
	resumePopup = new ResumePopup();

	contextExtractor.setTodoKeywords(config.todoKeywords);

	// Create status bar item
	statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	statusBarItem.command = 'whatWasIDoing.showHistory';
	context.subscriptions.push(statusBarItem);

	// Set up idle detection callback
	activityTracker.onIdle(async (workContext) => {
		if (!stateManager || !contextExtractor) {
			return;
		}

		// Check if file should be tracked
		if (!shouldTrackFile(workContext.filePath, config.excludePatterns)) {
			return;
		}

		// Enhance context with function name and TODO comments
		const enhancedContext = await contextExtractor.enhanceContext(workContext);

		// Save to state
		await stateManager.saveContext(enhancedContext);

		console.log('Saved work context:', enhancedContext);
	});

	// Show resume popup on activation if appropriate
	setTimeout(async () => {
		if (!stateManager || !resumePopup || !config.autoShowResumePopup) {
			return;
		}

		const lastContext = await stateManager.getLastContext();

		if (lastContext && stateManager.shouldShowResumePopup()) {
			await resumePopup.show(lastContext);
			await stateManager.markResumePopupShown();
		}

		updateStatusBar(lastContext);
	}, 2000); // Delay to avoid interfering with startup

	// Register commands
	context.subscriptions.push(
		vscode.commands.registerCommand('whatWasIDoing.showLastContext', async () => {
			if (!stateManager || !resumePopup) {
				return;
			}

			const lastContext = await stateManager.getLastContext();
			if (lastContext) {
				await resumePopup.show(lastContext);
			} else {
				vscode.window.showInformationMessage('No saved work context available');
			}
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('whatWasIDoing.showHistory', async () => {
			if (!stateManager || !resumePopup) {
				return;
			}

			const history = await stateManager.getHistory();
			await resumePopup.showHistoryQuickPick(history);
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('whatWasIDoing.clearHistory', async () => {
			if (!stateManager) {
				return;
			}

			const confirm = await vscode.window.showWarningMessage(
				'Clear all work context history?',
				{ modal: true },
				'Clear'
			);

			if (confirm === 'Clear') {
				await stateManager.clearHistory();
				if (statusBarItem) {
					statusBarItem.hide();
				}
			}
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('whatWasIDoing.saveCurrentContext', async () => {
			if (!activityTracker || !stateManager || !contextExtractor) {
				return;
			}

			const currentContext = activityTracker.getCurrentContext();
			if (currentContext) {
				const enhancedContext = await contextExtractor.enhanceContext(currentContext);
				await stateManager.saveContext(enhancedContext);
				vscode.window.showInformationMessage('Current context saved');
				updateStatusBar(enhancedContext);
			} else {
				vscode.window.showWarningMessage('No active context to save');
			}
		})
	);

	// Listen for configuration changes
	context.subscriptions.push(
		vscode.workspace.onDidChangeConfiguration((e) => {
			if (e.affectsConfiguration('whatWasIDoing')) {
				const newConfig = getConfig();

				if (activityTracker) {
					activityTracker.setIdleTimeout(newConfig.idleTimeoutMinutes);
				}

				if (stateManager) {
					stateManager.setMaxHistorySize(newConfig.maxHistorySize);
				}

				if (contextExtractor) {
					contextExtractor.setTodoKeywords(newConfig.todoKeywords);
				}
			}
		})
	);

	// Periodically update status bar
	const statusUpdateInterval = setInterval(async () => {
		if (stateManager) {
			const lastContext = await stateManager.getLastContext();
			updateStatusBar(lastContext);
		}
	}, 30000); // Update every 30 seconds

	context.subscriptions.push({
		dispose: () => clearInterval(statusUpdateInterval),
	});
}

export function deactivate() {
	if (activityTracker) {
		activityTracker.dispose();
	}
}
