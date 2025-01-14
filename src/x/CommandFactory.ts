import { AddCommand } from "./commands/AddCommand";
import { DivideCommand } from "./commands/DivideCommand";
import { MultiplyCommand } from "./commands/MultiplyCommand";
import { SubtractCommand } from "./commands/SubtractCommand";
import { ICommand } from "./ICommand";
export class CommandFactory {
  static createCommand(
    operator: string,
    left: ICommand,
    right: ICommand
  ): ICommand {
    switch (operator) {
      case "+":
        return new AddCommand(left, right);
      case "-":
        return new SubtractCommand(left, right);
      case "*":
        return new MultiplyCommand(left, right);
      case "/":
        return new DivideCommand(left, right);
      default:
        throw new Error("Invalid operator");
    }
  }
}
