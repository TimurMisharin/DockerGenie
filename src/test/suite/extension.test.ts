import * as vscode from 'vscode';
import { activate, deactivate } from '../../extension';
import { expect } from 'chai';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Activate Extension', () => {
		const context: vscode.ExtensionContext = {
			subscriptions: [],
			workspaceState: {} as any,
			globalState: {} as any,
			extensionPath: '',
			globalStorageUri: vscode.Uri.file(''),
			logUri: vscode.Uri.file(''),
			storageUri: vscode.Uri.file(''),
			extensionUri: vscode.Uri.file(''),
			extensionMode: vscode.ExtensionMode.Test,
			logPath: '',
			asAbsolutePath: (relativePath: string) => relativePath,
			environmentVariableCollection: {} as any,
			extension: {} as any,
			storagePath: '',
			globalStoragePath: '',
			secrets: {} as any,
		};
		activate(context);
		expect(context.subscriptions.length).to.be.greaterThan(0);
	});

	test('Deactivate Extension', () => {
		deactivate();
	});
});
