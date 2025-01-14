import { ICommand } from "../ICommand";

export class ValueCommand implements ICommand {
  private value: number;

  constructor(value: number) {
    this.value = value;
  }

  execute(): number {
    return this.value;
  }
}
