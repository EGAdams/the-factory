import ICommandObject from "../../abstract/ICommandObject";
/**  @class VanillaCommand */
class VanillaCommand implements ICommandObject {
  execution_type = "";
  id = 0;
  command_stringified = "";
  command_name = "";
  children = new Array<ICommandObject>();
  processedOutput: unknown;
  executable = "";
  args = "";
  description = "";
  targetMachine = "";
  commandObject = "";
  output = new Array<string>();
  commandMethod = "execute";
  regex_map_filename = "t";
  outputProcessor = "";
  emitter = "EmitterSocket";
  status = {
    statusBlock: {
      led: {
        "background-color": "yellow",
        color: "black",
      },
    },
  };

  constructor() { console.log("constructing VanillaCommand..."); }}

export default VanillaCommand;
