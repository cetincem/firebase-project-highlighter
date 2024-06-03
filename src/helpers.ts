import * as vscode from 'vscode';
import { exec } from 'child_process';

export function getFirebaseProjectName(): Promise<string> {
    return new Promise((resolve, reject) => {
        exec('firebase use', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing firebase command: ${stderr}`);
                vscode.window.showErrorMessage(`Error fetching Firebase project: ${stderr}`);
                reject(stderr);
                return;
            }

            console.log(`Firebase command output: ${stdout}`);
            resolve(stdout.trim());
        });
    });
}


export function changeThemeBasedOnProject(projectName: string) {
    let theme: string;
    console.info('changing theme based on project');
    console.log('projectName:', projectName);

    switch (projectName) {
        case 'vickyparking-dev':
        case 'development':
            theme = 'Abyss';
            break;
        case 'vickyparking-demo':
        case 'demo':
            theme = 'Monokai';
            break;
        case 'vickyparking-prod':
        case 'production':
            theme = 'Default Light+';
            break;
        default:
            theme = 'Default Dark+';
    }

    vscode.workspace.getConfiguration().update('workbench.colorTheme', theme, vscode.ConfigurationTarget.Global);
}