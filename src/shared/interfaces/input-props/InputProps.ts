export interface InputProps {
    command: string;
    commandText: string;
    onCommandChange: (command: string, commandText: string) => void;
    onCommandExecute: (action: string, title: string) => void;
}