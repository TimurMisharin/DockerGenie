import * as vscode from 'vscode';
import axios from 'axios';
import MockAdapter from 'axios-adapter';
import { activate, deactivate } from '../../extension';
import { ChatGptResponse } from '../../interfaces/chatGptResonse';

// Initialize axios mock adapter
const mockAxios = new MockAdapter(axios);

// Mock vscode API
jest.mock('vscode');

describe('Extension', () => {
  let context: vscode.ExtensionContext;

  beforeEach(() => {
    // Setup mock context
    context = {
      // Fill in the necessary methods with mock implementations
      // For example, the following is a mock implementation for the subscriptions.push method
      subscriptions: {
        push: jest.fn()
      },
      // Add other methods as required
    };

    // Mock the vscode API
    vscode.window.showErrorMessage = jest.fn();
    vscode.workspace.getConfiguration = jest.fn().mockReturnValue({
      get: jest.fn().mockReturnValue('test-key') // replace 'test-key' with the actual test key
    });
    vscode.workspace.workspaceFolders = [{ uri: { fsPath: '/test' } }];

    // Setup mock axios response
    const mockResponse: ChatGptResponse = {
      // Fill in the mock response details
    };
    mockAxios.onPost("https://api.openai.com/v1/chat/completions").reply(200, mockResponse);
  });

  afterEach(() => {
    jest.resetAllMocks();
    mockAxios.reset();
    deactivate();
  });

  it('should register a command', async () => {
    await activate(context);
    expect(vscode.commands.registerCommand).toBeCalledWith(
      'dockerfile-generator.generateDockerfile',
      expect.any(Function),
    );
  });

  it('should handle API key absence', async () => {
    vscode.workspace.getConfiguration = jest.fn().mockReturnValue({
      get: jest.fn().mockReturnValue('')
    });
    await activate(context);
    expect(vscode.window.showErrorMessage).toBeCalledWith('No API key for OpenAI provided.');
  });

  // Add more tests...
});
