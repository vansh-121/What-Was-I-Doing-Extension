import * as vscode from 'vscode';
import { WorkContext } from './types';
import * as path from 'path';

/**
 * Displays resume popup and handles navigation to saved context
 */
export class ResumePopup {
    /**
     * Show the resume work popup with context information
     */
    public async show(context: WorkContext): Promise<void> {
        const message = this.formatMessage(context);

        const continueButton = '✅ Continue';
        const dismissButton = '✖ Dismiss';
        const viewHistoryButton = '📋 View History';

        const selection = await vscode.window.showInformationMessage(
            message,
            { modal: false },
            continueButton,
            viewHistoryButton,
            dismissButton
        );

        if (selection === continueButton) {
            await this.navigateToContext(context);
        } else if (selection === viewHistoryButton) {
            // Command will be handled by extension
            await vscode.commands.executeCommand('whatWasIDoing.showHistory');
        }
    }

    /**
     * Navigate to the saved work context
     */
    public async navigateToContext(context: WorkContext): Promise<void> {
        try {
            // Check if file exists
            const uri = vscode.Uri.file(context.filePath);

            try {
                await vscode.workspace.fs.stat(uri);
            } catch {
                vscode.window.showWarningMessage(
                    `File not found: ${path.basename(context.filePath)}`
                );
                return;
            }

            // Open the document
            const document = await vscode.workspace.openTextDocument(uri);

            // Calculate position and selection range
            const position = new vscode.Position(context.line, context.column);
            const selectionRange = new vscode.Range(position, position);

            // Show the document with selection
            const editor = await vscode.window.showTextDocument(document, {
                selection: selectionRange,
                preview: false,
                viewColumn: vscode.ViewColumn.One,
            });

            // Reveal the line in the center of the viewport
            editor.revealRange(
                selectionRange,
                vscode.TextEditorRevealType.InCenter
            );

            // Show a subtle confirmation
            vscode.window.setStatusBarMessage(
                `Resumed at ${context.functionName || 'last position'}`,
                3000
            );

        } catch (error) {
            console.error('Failed to navigate to context:', error);
            vscode.window.showErrorMessage('Failed to navigate to saved position');
        }
    }

    /**
     * Format the popup message with context details
     */
    private formatMessage(context: WorkContext): string {
        const timeAgo = this.formatTimeAgo(context.timestamp);
        const fileName = path.basename(context.filePath);

        let message = `🧠 Welcome back! You were last active ${timeAgo}\n`;
        message += `📄 File: ${fileName}`;

        // Show the auto-generated note prominently
        if (context.note) {
            message += `\n💡 ${context.note}`;
        }

        if (context.functionName) {
            message += `\n🔍 Location: ${context.functionName}`;
        }

        if (context.todoComment) {
            message += `\n📝 ${context.todoComment}`;
        }

        return message;
    }

    /**
     * Format timestamp as human-readable "time ago"
     */
    private formatTimeAgo(timestamp: number): string {
        const now = Date.now();
        const diff = now - timestamp;

        const minutes = Math.floor(diff / (60 * 1000));
        const hours = Math.floor(diff / (60 * 60 * 1000));
        const days = Math.floor(diff / (24 * 60 * 60 * 1000));

        if (minutes < 1) {
            return 'just now';
        } else if (minutes < 60) {
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else if (hours < 24) {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (days < 7) {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else {
            const date = new Date(timestamp);
            return `on ${date.toLocaleDateString()}`;
        }
    }

    /**
     * Show a quick pick menu with context history
     */
    public async showHistoryQuickPick(contexts: WorkContext[]): Promise<void> {
        if (contexts.length === 0) {
            vscode.window.showInformationMessage('No work context history available');
            return;
        }

        const items = contexts.map(ctx => ({
            label: `$(file) ${path.basename(ctx.filePath)}`,
            description: ctx.note || ctx.functionName || `Line ${ctx.line + 1}`,
            detail: `${this.formatTimeAgo(ctx.timestamp)}${ctx.todoComment ? ` • ${ctx.todoComment}` : ''}`,
            context: ctx,
        }));

        const selected = await vscode.window.showQuickPick(items, {
            placeHolder: 'Select a previous work context to resume',
            matchOnDescription: true,
            matchOnDetail: true,
        });

        if (selected) {
            await this.navigateToContext(selected.context);
        }
    }

    /**
     * Show minimal notification (less intrusive alternative)
     */
    public async showMinimalNotification(context: WorkContext): Promise<void> {
        const fileName = path.basename(context.filePath);
        const message = `Last active in ${fileName}${context.functionName ? ` @ ${context.functionName}` : ''}`;

        const action = await vscode.window.showInformationMessage(
            message,
            'Resume'
        );

        if (action === 'Resume') {
            await this.navigateToContext(context);
        }
    }
}
