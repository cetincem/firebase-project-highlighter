import * as vscode from 'vscode';
import { exec } from 'child_process';

export function getFirebaseProjectName(): Promise<string> {
    return new Promise((resolve, reject) => {
        exec('firebase use --json', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing firebase command: ${stderr}`);
                vscode.window.showErrorMessage(`Error fetching Firebase project: ${stderr}`);
                reject(stderr);
                return;
            }

            console.log(`Firebase command output: ${stdout}`);
            
            try {
                const jsonOutput = JSON.parse(stdout);
                if (jsonOutput.status === 'success' && jsonOutput.result) {
                    resolve(jsonOutput.result);
                } else {
                    reject('No project found or invalid response format');
                }
            } catch (parseError) {
                console.error(`Error parsing JSON output: ${parseError}`);
                reject('Error parsing JSON output');
            }
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