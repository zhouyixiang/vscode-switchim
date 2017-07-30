'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
const spawnCommand = require('spawn-command');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "switchim" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('switchim.use', (imId: string[]) => {
        if (!imId || imId.length < 1) {
            const options = {
                placeHolder: 'Type input method id here (use "swim list" to get}).',
                value: 'com.apple.keyboardlayout.all'
            };

            vscode.window.showInputBox(options).then((id) => {
                console.log('id', id);
                switchIm(id);
            });
        } else {
            switchIm(imId[0]);
        }
    });

    context.subscriptions.push(disposable);
}

function switchIm(imId: string) {
    const config = vscode.workspace.getConfiguration('switchim');
    const swimPath = config.swimPath || 'swim';
    const methodId = imId;
    const cmd = `${swimPath} use ${methodId}`;

    const switchCmd = spawnCommand(cmd);

    // child.stdout.on('data', function (data) {
    //     console.log('data', data);
    // });

    switchCmd.on('exit', function (exitCode) {
        console.log('switch im done. exit code: ', exitCode);
    });
}

// this method is called when your extension is deactivated
export function deactivate() {
}