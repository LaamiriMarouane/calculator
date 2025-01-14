import { ICommand } from "../ICommand";

export class DivideCommand implements ICommand {
  private left: ICommand;
  private right: ICommand;

  constructor(left: ICommand, right: ICommand) {
    this.left = left;
    this.right = right;
  }

  execute(): number {
    if (this.right.execute() === 0) {
      throw new Error("Division by zero");
    }
    return this.left.execute() / this.right.execute();
  }
}
