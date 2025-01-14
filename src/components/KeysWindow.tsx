type KeysWindowProps = {
  handleButton: (value: string) => void;
  commands: {
    name: string;
    enabled: boolean;
  }[];
};

const KeysWindow: React.FC<KeysWindowProps> = ({ handleButton, commands }) => {
  // const sciKeys: string[] = [
  //   "sin",
  //   "cos",
  //   "ln",
  //   "log",
  //   "tan",
  //   "π",
  //   "e",
  //   "^",
  //   "!",
  //   "√",
  // ];

  const fixedKeys: string[] = [
    "9",
    "8",
    "7",
    "6",
    "5",
    "0",
    "1",
    "2",
    "3",
    "4",
    "(",
    ")",
    // ".",
    "DEL",
    "AC",
    "=",
  ];

  return (
    <div className="keysWindow">
      <div className="keys_scientific">
        {commands
          .filter((command) => command.enabled)
          .map((command, index) => (
            <button
              key={index}
              className={`${
                command.name >= "0" && command.name <= "9" ? "number" : ""
              } ${command.name === "=" && "equal"}`}
              onClick={() => handleButton(command.name)}
            >
              {command.name}
            </button>
          ))}
      </div>
      <div className="line"></div>
      <div className="keys_basic">
        {fixedKeys.map((item, index) => (
          <button
            key={index}
            className={`${item >= "0" && item <= "9" ? "number" : ""} ${
              item === "=" && "equal"
            }`}
            onClick={() => handleButton(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default KeysWindow;
