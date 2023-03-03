/*
 * class StopServerCommand
 */

import ICommandObject from "../../../abstract/ICommandObject";

class StopServerCommand implements ICommandObject {
  executable: string;
  args: string;
  description: string;
  targetMachine: string;
  output: Array<string>;
  regex_map_filename: string;
  outputProcessor: string;
  emitter: string;
  processedOutput: unknown;
  name: string;
  status: unknown;
  execution_type: string;
  id: number;
  command_stringified: string;
  command_name: string;
  properties: ICommandObject[];

  constructor() {
    this.command_name = "stop_server";
    this.executable = "stop_nodemon_server.sh ";
    this.args = "";
    this.name = "Stop Server";
    this.description = "attempts to stop nodemon server";
    this.targetMachine = "thispc";
    this.output = new Array<string>();
    this.regex_map_filename = "StopServerRegex.txt";
    this.outputProcessor = "StopServerOutputProcessor";
    this.emitter = "EmitterSocket";
    this.execution_type = "execute_and_process";
    this.status = {
      statusBlock: {
        led: "yellow",
      },
    };
    this.processedOutput = {};
    this.id = 0;
    this.command_stringified = "";
    this.properties = [];
  }
}

export default StopServerCommand;
