import React, { useState } from "react";

type CommandSelectorProps = {
  availableCommands: {
    name: string;
    enabled: boolean;
  }[];
  onChange: (name: string) => void;
};

const CommandSelector: React.FC<CommandSelectorProps> = ({
  availableCommands,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  function handleCheckboxChange(name: string): void {
    onChange(name);
  }

  return (
    <div className="commandSelector">
      <label htmlFor="command-select">Select Commands:</label>
      <div className="dropdown">
        <button type="button" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "Close" : "Open"} Commands
        </button>
        {isOpen && (
          <div className="dropdown-menu">
            {availableCommands.map((command, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  checked={command.enabled}
                  onChange={() => handleCheckboxChange(command.name)}
                />
                {command.name}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommandSelector;
