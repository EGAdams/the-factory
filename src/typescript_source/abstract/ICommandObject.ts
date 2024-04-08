import ICommandFinishedEmitter from "./ICommandFinishedEmitter";

/*
 * interface ICommandObject
 * 
 */
interface ICommandObject {
  execution_type: string;
  id: number;
  command_stringified: string;
  command_name: string;
  executable: string;
  args: string;
  description: string;
  targetMachine: string;
  output: Array<string>;
  regex_map_filename: string;
  outputProcessor: string;
  emitter: string;
  status: unknown;
  processedOutput: unknown;
}

export default ICommandObject;
