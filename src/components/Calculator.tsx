import React, { useEffect, useState } from "react";
import DisplayWindow from "./DisplayWindow";
import KeysWindow from "./KeysWindow";
import { parseExpression } from "../x/ExpressionParser";
import { Calc } from "../x/Calculator";
import { PluginManager } from "../x/PluginManager";
import CommandSelector from "./CommandSelector";

const Calculator: React.FC = () => {
  const [expression, setExpression] = useState<string>("");
  const [displayEXP, setDisplayEXP] = useState<string>("");
  const [result, setResult] = useState<string | number>("0");
  const [commands, setCommands] = useState<
    {
      name: string;
      enabled: boolean;
    }[]
  >([]);

  const pluginManager = React.useMemo(() => new PluginManager(), []);
  const calculator = React.useMemo(
    () => new Calc(pluginManager),
    [pluginManager]
  );

  useEffect(() => {
    setCommands(
      Array.from(pluginManager.getSupportedCommands.entries()).map(
        ([name, enabled]) => ({ name, enabled })
      )
    );
  }, [pluginManager.getSupportedCommands]);
  function handleCommandSelect(name: string): void {
    setCommands((prev) => {
      return prev.map((command) => {
        if (command.name === name) {
          pluginManager.toggleCommand(command.name);
          return { ...command, enabled: !command.enabled };
        }
        return command;
      });
    });
  }

  function calcResult(): void {
    calculator.setResult(0);
    if (expression.length !== 0) {
      try {
        parseExpression(expression, calculator, pluginManager);

        setResult(calculator.execute());
      } catch (error) {
        setResult("An Error Occurred!" + error);
      }
    } else {
      setResult("An Error Occurred!");
    }
  }

  function handleButton(value: string): void {
    if (value === "AC") {
      setExpression("");
      setDisplayEXP("");
      setResult("0");
    } else if (value === "DEL") {
      setDisplayEXP(displayEXP.slice(0, -1));
      setExpression(expression.slice(0, -1));
    } else if (value === "=") {
      calcResult();
    } else {
      setExpression(expression + value);
      setDisplayEXP(displayEXP + value);
    }
  }

  return (
    <>
      <CommandSelector
        availableCommands={commands}
        onChange={handleCommandSelect}
      />
      <div className="calculator">
        <DisplayWindow expression={displayEXP} result={result} />
        <KeysWindow handleButton={handleButton} commands={commands} />
      </div>
    </>
  );
};

export default Calculator;
