import ICommandFinishedEmitter from "./ICommandFinishedEmitter";

/*
 * interface ICommandObject
 *
 * TODO: try to put a different type into the properties array for a test.
 * not sure why im disabling no-unused-vars here.  eslint bitching about it.
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
