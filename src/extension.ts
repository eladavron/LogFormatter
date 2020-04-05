// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('LogFormatter is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('logformatter.logFormatter', () => {
		let editor = vscode.window.activeTextEditor;
		if (editor) {
			let document = editor.document;
			let documentText = document.getText();
			if (!documentText.match(/^import\s.*logging.*/gm))
			{
				vscode.window.showInformationMessage('Logging module not imported!');
				return;
			}
			let logMatch = documentText.match(/(\S+)\s*=\s*.*getLogger\(.*\)/);
			if (!logMatch)
			{
				vscode.window.showInformationMessage('Logging instance not found!');
				return;
			}
			var logInstance = logMatch[1];
			vscode.window.showInformationMessage(`Logging instance called "${logInstance}"!`);

		}

	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
