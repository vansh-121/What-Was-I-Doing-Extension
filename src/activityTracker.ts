import * as vscode from 'vscode';
import { WorkContext } from './types';

/**
 * Tracks user activity and detects idle periods
 */
export class ActivityTracker {
    private lastActivityTime: number = Date.now();
    private idleCheckInterval: NodeJS.Timeout | undefined;
    private disposables: vscode.Disposable[] = [];
    private currentContext: WorkContext | undefined;
    private onIdleCallback: ((context: WorkContext) => void) | undefined;
    private idleTimeoutMs: number;

    constructor(idleTimeoutMinutes: number = 10) {
        this.idleTimeoutMs = idleTimeoutMinutes * 60 * 1000;
        this.setupActivityListeners();
        this.startIdleDetection();
    }

    /**
     * Set up listeners for various user activities
     */
    private setupActivityListeners(): void {
        // Track document changes
        this.disposables.push(
            vscode.workspace.onDidChangeTextDocument(() => {
                this.recordActivity();
            })
        );

        // Track selection changes (cursor movement)
        this.disposables.push(
            vscode.window.onDidChangeTextEditorSelection((e) => {
                this.recordActivity();
                this.updateCurrentContext(e.textEditor);
            })
        );

        // Track active editor changes
        this.disposables.push(
            vscode.window.onDidChangeActiveTextEditor((editor) => {
                this.recordActivity();
                if (editor) {
                    this.updateCurrentContext(editor);
                }
            })
        );

        // Track visible editors changes
        this.disposables.push(
            vscode.window.onDidChangeVisibleTextEditors(() => {
                this.recordActivity();
            })
        );
    }

    /**
     * Record user activity and update timestamp
     */
    private recordActivity(): void {
        this.lastActivityTime = Date.now();
    }

    /**
     * Update the current work context based on active editor
     */
    private updateCurrentContext(editor: vscode.TextEditor): void {
        if (!editor || !editor.document || editor.document.uri.scheme !== 'file') {
            return;
        }

        const position = editor.selection.active;
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(editor.document.uri);

        this.currentContext = {
            filePath: editor.document.uri.fsPath,
            line: position.line,
            column: position.character,
            timestamp: Date.now(),
            workspaceFolder: workspaceFolder?.uri.fsPath,
        };
    }

    /**
     * Start periodic idle detection checks
     */
    private startIdleDetection(): void {
        // Check every minute for idle state
        this.idleCheckInterval = setInterval(() => {
            const idleTime = Date.now() - this.lastActivityTime;

            if (idleTime >= this.idleTimeoutMs && this.currentContext && this.onIdleCallback) {
                // User is idle, trigger callback with current context
                this.onIdleCallback(this.currentContext);
            }
        }, 60 * 1000); // Check every minute
    }

    /**
     * Register a callback to be invoked when user becomes idle
     */
    public onIdle(callback: (context: WorkContext) => void): void {
        this.onIdleCallback = callback;
    }

    /**
     * Get the current work context
     */
    public getCurrentContext(): WorkContext | undefined {
        // Update context from active editor if available
        if (vscode.window.activeTextEditor) {
            this.updateCurrentContext(vscode.window.activeTextEditor);
        }
        return this.currentContext;
    }

    /**
     * Get time since last activity in milliseconds
     */
    public getTimeSinceLastActivity(): number {
        return Date.now() - this.lastActivityTime;
    }

    /**
     * Check if user is currently idle
     */
    public isIdle(): boolean {
        return this.getTimeSinceLastActivity() >= this.idleTimeoutMs;
    }

    /**
     * Update idle timeout threshold
     */
    public setIdleTimeout(minutes: number): void {
        this.idleTimeoutMs = minutes * 60 * 1000;
    }

    /**
     * Clean up resources
     */
    public dispose(): void {
        if (this.idleCheckInterval) {
            clearInterval(this.idleCheckInterval);
        }
        this.disposables.forEach(d => d.dispose());
        this.disposables = [];
    }
}
