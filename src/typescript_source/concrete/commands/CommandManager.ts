import ICommandObject from "../../abstract/ICommandObject";
import ICommandFinishedEmitter from "../../abstract/ICommandFinishedEmitter";

class CommandManager implements ICommandFinishedEmitter {

    commands: ICommandObject[] = [];


  constructor() {
    // initialize commands array
  }

  addCommand(command: ICommandObject) {
    this.commands.push(command);
  }

  runCommands() {
    // loop through commands and execute them
  }

  emit(listenerText: string, objectToEmit: unknown) {
    // implement emit method
  }

  on(queryResultProcessorText: string, objectToEmit: unknown) {
    // implement on method
  }

}

export default CommandManager;