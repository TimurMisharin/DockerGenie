import * as vscode from 'vscode';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { activate, deactivate } from '../../extension';

// Initialize axios mock adapter
const mockAxios = new MockAdapter(axios);

jest.mock('vscode', () => ({
  workspace: {
    getConfiguration: jest.fn(),
    workspaceFolders: [{ uri: { fsPath: '/test' } }],
    fs: {
      writeFile: jest.fn(),
    },
  },
  commands: {
    registerCommand: jest.fn(),
  },
  window: {
    showErrorMessage: jest.fn(),
    showInputBox: jest.fn(),
    activeTextEditor: {
      edit: jest.fn(),
    },
  },
  Uri: {
    file: jest.fn(),
  },
}), { virtual: true });

describe('Extension', () => {
  let context: vscode.ExtensionContext;

  beforeEach(() => {
    // Setup mock context
    context = {
      subscriptions: {
        push: jest.fn()
      },
    } as unknown as vscode.ExtensionContext;

    // Mock the vscode API
    (vscode.window.showErrorMessage as jest.Mock).mockImplementation(jest.fn());
    (vscode.workspace.getConfiguration as jest.Mock).mockImplementation(() => ({
      get: jest.fn().mockReturnValue('test-key'), // replace 'test-key' with the actual test key
    }));
    (vscode.window.showInputBox as jest.Mock).mockResolvedValue('Some input');
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
    (vscode.workspace.getConfiguration as jest.Mock).mockImplementation(() => ({
      get: jest.fn().mockReturnValue(''),
    }));
    await activate(context);
    expect(vscode.window.showErrorMessage).toBeCalledWith('No API key for OpenAI provided.');
  });

  // Add more tests...
});
