import ICommandObject from "../../../abstract/ICommandObject";

/**  @class LsCommand implements ICommandObject */
/**
 * Represents a command object for the 'ls' command.
 * by implementing the ICommandObject,it gives the LsCommand * the ability to be a CommandObject in the framework that we * are using.  This way, if we lose a variable like
 * executable because we fat fingered something to comment
 * out the needed property, the compiler will catch the error
 * for us.  so if it says "implements ICommandObject", we
 * can be pretty sure that it will work in the framework.
 * 
 */
export default class LsCommand implements ICommandObject {
  execution_type = "execute_and_process";
  id = 0;
  command_stringified = "";
  command_name = "lscommand";
  children = new Array< ICommandObject >();
  processedOutput: unknown;
  executable = "ls ";
  args = " -lart ";
  description = "show dir";
  targetMachine = "jewelry_machine";
  commandObject = "CommandExecutor";
  output = new Array< string >();
  commandMethod = "execute";
  regex_map_filename = "LsRegex.txt";
  outputProcessor = "LsCommandOutputProcessor";
  emitter = "EmitterSocket";
  status = {
    statusBlock: {
      led: {
        "background-color": "yellow",
        color: "black",
      },
    },
  };

  constructor() { console.log( "constructing LsCommand..." ); }
}
