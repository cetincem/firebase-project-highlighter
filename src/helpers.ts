import * as vscode from 'vscode';
import { exec } from 'child_process';

export function getFirebaseProjectName(): Promise<string> {
    return new Promise((resolve, reject) => {
        exec('firebase use --add', (error, stdout, stderr) => {
            if (error) {
                vscode.window.showErrorMessage(`Error fetching Firebase project: ${stderr}`);
                reject(error);
                return;
            }

            const match = stdout.match(/projects\/([^:]+)/);
            if (match) {
                resolve(match[1]);
            } else {
                reject('No project found');
            }
        });
    });
}

export function changeThemeBasedOnProject(projectName: string) {
    let theme: string;

    switch (projectName) {
        case 'project-one':
            theme = 'Abyss';
            break;
        case 'project-two':
            theme = 'Monokai';
            break;
        default:
            theme = 'Default Dark+';
    }

    vscode.workspace.getConfiguration().update('workbench.colorTheme', theme, vscode.ConfigurationTarget.Global);
}