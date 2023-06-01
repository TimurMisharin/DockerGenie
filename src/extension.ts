import * as vscode from 'vscode';
import axios from 'axios';
import { ChatGptResponse } from './interfaces/chatGptResonse';

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('dockerfile-generator.generateDockerfile', async () => {
		const workspaceFolders = vscode.workspace.workspaceFolders;
		if (!workspaceFolders) {
			vscode.window.showErrorMessage("No workspace folder is opened.");
			return;
		}
		const dockerfilePath = `${workspaceFolders[0].uri.fsPath}/Dockerfile`;

		try {
			await vscode.workspace.fs.writeFile(vscode.Uri.file(dockerfilePath), Buffer.from(""));
		} catch(e) {
			if (e instanceof Error) {
				vscode.window.showErrorMessage(`Failed to create Dockerfile: ${e.message}`);
				return;
			} else {
				// Re-throw if it's not an Error we can handle
				throw e;
			}
		}

		const config = vscode.workspace.getConfiguration('dockerfile-generator');
		const chatGptVersion = config.get('chatGptVersion', 'gpt-3.5-turbo');
		
		const input = await vscode.window.showInputBox({prompt: 'What should the Dockerfile include?'});
		
		const apiKey = config.get('openaiApiKey', '');
		if (!apiKey) {
			vscode.window.showErrorMessage("No API key for OpenAI provided.");
			return;
		}


		try {

			  
			const chatGptResponse = await axios.post<ChatGptResponse>(
				"https://api.openai.com/v1/chat/completions",
			{
				"model": chatGptVersion,
				"messages": [
					{
						"role": "user",
						"content": `Generate Dockerfile code only with comments for: ${input}`,
					}
				]
			},
			{
				headers: {
						// eslint-disable-next-line @typescript-eslint/naming-convention
						'Content-Type': 'application/json',
						// eslint-disable-next-line @typescript-eslint/naming-convention
						'Authorization': `Bearer ${apiKey}`
					},
				maxBodyLength: Infinity,
				// timeout: 100000
			});

			const dockerfile = await vscode.workspace.openTextDocument(vscode.Uri.file(dockerfilePath));
			await vscode.window.showTextDocument(dockerfile, {preview: false});
			await vscode.window.activeTextEditor?.edit(edit => {
				edit.insert(new vscode.Position(0, 0), chatGptResponse.data.choices[0].message.content);
			});


		} catch(e) {
			if (e instanceof Error) {
				vscode.window.showErrorMessage(`Failed to generate Dockerfile content: ${e}`);
			} else {
				// Re-throw if it's not an Error we can handle
				throw e;
			}
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}

