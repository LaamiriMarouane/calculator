import { CommandFactory } from "./CommandFactory";
import { ICommand } from "./ICommand";

export class PluginManager {
  private supportedCommands: Map<string, boolean> = new Map();

  get getSupportedCommands() {
    this.addCommand("+", true);
    this.addCommand("-", true);
    this.addCommand("*", true);
    this.addCommand("/", true);
    this.addCommand("sqrt", false);
    this.addCommand("²", false);
    this.addCommand("sin", false);
    return this.supportedCommands;
  }

  addCommand(name: string, enabled: boolean = false) {
    this.supportedCommands.set(name, enabled);
  }

  removeCommand(name: string) {
    this.supportedCommands.delete(name);
  }
  toggleCommand(name: string) {
    const currentState = this.supportedCommands.get(name);
    if (currentState !== undefined) {
      this.supportedCommands.set(name, !currentState);
    }
  }
  getCommand(
    operator: string,
    left: ICommand,
    right: ICommand
  ): ICommand | undefined {
    return CommandFactory.createCommand(operator, left, right);
  }
}
