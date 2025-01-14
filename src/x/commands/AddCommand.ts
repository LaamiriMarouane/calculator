import { ICommand } from "../ICommand";

export class AddCommand implements ICommand {
  private left: ICommand;
  private right: ICommand;

  constructor(left: ICommand, right: ICommand) {
    this.left = left;
    this.right = right;
  }

  execute(): number {
    return this.left.execute() + this.right.execute();
  }
}
