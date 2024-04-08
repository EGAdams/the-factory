# Who you are
Expert TypeScript Developer

# Your Task
Please write the TheEmitter.ts file.  Use the following javascript code as a base and make sure that it fits in with the existing Typescript code.  Correct any errors that you find.  Use the same coding style like keeping a space before and after text inside parenthesis, brackets, and braces.

# JavaScript code that needs translating to TypeScript code
```javascript



```

#  Existing TypeScript source code
```typescript
import ICommandObject from "../../../abstract/ICommandObject";
/**  @class LsCommand */
/**
 * Represents a command object for the 'ls' command.
 */
export default class LsCommand implements ICommandObject {
  execution_type = "execute_and_process";
  id = 0;
  command_stringified = "";
  command_name = "lscommand";
  properties = new Array< ICommandObject >();
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
```

# Command Object Parts
```typescript
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

/** 
 *  interface ICommandFinishedEmitter
  * The ICommandFinishedEmitter interface defines a contract for objects that want to emit events 
 * when a command finishes executing. This allows other code to subscribe to be notified when 
 * certain events occur without having to know the implementation details.
 * 
 * This interface has two key methods:
 * 
 * emit(listenerText: string, objectToEmit: unknown): void
 * - Emits a named event that listeners can subscribe to. The listenerText indicates which listener to notify.
 *   objectToEmit is the data that will be passed to the subscribed listeners.
 *   
 * on(queryResultProcessorText: string, objectToEmit: unknown): void
 * - Allows listeners to subscribe to the "emit" events by passing a callback function. 
 *   queryResultProcessorText indicates which event they want to subscribe to.
 *   
 * Any class implementing ICommandFinishedEmitter gains the ability to emit events that others can subscribe
 * to when commands complete. This is a common pattern to loosen coupling between components in an application.
 */
interface ICommandFinishedEmitter {
    emit ( listenerText: string, objectToEmit: unknown ): void;
    on ( queryResultProcessorText: string, objectToEmit: unknown ): void;
}

export default ICommandFinishedEmitter;


/*
 * LsOutputProcessor
 */
import OutputProcessor from "../../commands/OutputProcessor";

class LsOutputProcessor extends OutputProcessor {
    server_js_size ( matchedRegex: { matchedString: string }, _index: unknown ) {
        console.log(
            "the size of cdrul.sh is: " + matchedRegex.matchedString + " bytes"
        );
        console.log( _index ); // hush eslint
    }
}
module.exports = LsOutputProcessor; // don't forget this!
// export default was suggested here if this doesn't work.
```
