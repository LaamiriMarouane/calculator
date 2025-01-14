import { PluginManager } from "./PluginManager";
import { ICommand } from "./ICommand";

export class Calc {
  private result: number = 0;
  private pluginManager: PluginManager;
  private commands: Map<string, boolean>;
  private rootCommand: ICommand | null = null;

  constructor(pluginManager: PluginManager) {
    this.pluginManager = pluginManager;
    this.commands = this.pluginManager.getSupportedCommands;
  }

  getResult(): number {
    return this.result;
  }

  get getCommands(): Map<string, boolean> {
    return this.commands;
  }

  setResult(value: number) {
    this.result = value;
  }

  setRootCommand(command: ICommand): void {
    this.rootCommand = command;
  }

  execute(): number {
    if (this.rootCommand) {
      this.result = this.rootCommand.execute();
    }
    return this.result;
  }
}
