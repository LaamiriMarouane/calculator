import { Calc } from "./Calculator";
import { ICommand } from "./ICommand";
import { PluginManager } from "./PluginManager";
import { ValueCommand } from "./commands/ValueCommand";

export function parseExpression(
  expression: string,
  calculator: Calc,
  pluginManager: PluginManager
): void {
  const tokens = expression.match(/(\d+|\+|\-|\*|\/|\(|\))/g);

  if (!tokens) {
    throw new Error("Invalid expression");
  }

  const command = parseTokens(tokens, pluginManager);
  calculator.setRootCommand(command);
}

function parseTokens(tokens: string[], pluginManager: PluginManager): ICommand {
  const values: ICommand[] = [];
  const operators: string[] = [];

  let i = 0;
  while (i < tokens.length) {
    const token = tokens[i];

    if (!isNaN(Number(token))) {
      values.push(new ValueCommand(Number(token)));
    } else if (token === "(") {
      const subExpressionTokens = [];
      let openParens = 1;
      i++;
      while (i < tokens.length && openParens > 0) {
        if (tokens[i] === "(") openParens++;
        if (tokens[i] === ")") openParens--;
        if (openParens > 0) subExpressionTokens.push(tokens[i]);
        i++;
      }
      const subCommand = parseTokens(subExpressionTokens, pluginManager);
      values.push(subCommand);
    } else if (token === ")") {
      throw new Error("Mismatched parentheses");
    } else {
      while (
        operators.length &&
        precedence(operators[operators.length - 1]) >= precedence(token)
      ) {
        const operator = operators.pop()!;
        const rightCommand = values.pop()!;
        const leftCommand = values.pop()!;
        values.push(
          pluginManager.getCommand(operator, leftCommand, rightCommand)!
        );
      }
      operators.push(token);
    }
    i++;
  }

  while (operators.length) {
    const operator = operators.pop()!;
    const rightCommand = values.pop()!;
    const leftCommand = values.pop()!;
    values.push(pluginManager.getCommand(operator, leftCommand, rightCommand)!);
  }

  return values[0];
}

function precedence(operator: string): number {
  switch (operator) {
    case "+":
    case "-":
      return 1;
    case "*":
    case "/":
      return 2;
    case "(":
    case ")":
      return 0;
    default:
      return 0;
  }
}
