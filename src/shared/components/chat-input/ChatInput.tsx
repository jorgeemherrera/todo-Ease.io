import React from "react";
import { Input } from "@shared/components";

interface ChatInputProps {
  command: string;
  commandText: string;
  onCommandChange: (command: string, text: string) => void;
  onCommandExecute: (action: string, title: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ command, commandText, onCommandChange, onCommandExecute }) => {
  return (
    <Input
      command={command}
      commandText={commandText}
      onCommandChange={onCommandChange}
      onCommandExecute={onCommandExecute}
    />
  );
};

export default ChatInput;
