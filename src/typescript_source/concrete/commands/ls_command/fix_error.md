# Who you are
You are an expert TypeScript debugger

# Your First Task
Analyze the following source code for correct TypeScript syntax.

# Source code for the LSCommand 
```typescript
import ICommandObject from "../../../abstract/ICommandObject";

/**  @class LsCommand implements ICommandObject */
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

# Test for the LsCommand
```javascript 
/*
 * Test for LsCommand
 */
const LsCommand = require("/home/adamsl/the-factory/dist/typescript_source/concrete/commands/ls_command/LsCommand").default;

const CommandExecutor = require("/home/adamsl/the-factory/dist/typescript_source/concrete/commands/CommandExecutor").default;

/** test for LsCommand */
let commandObject = new LsCommand.default();
let executor      = new CommandExecutor.default( commandObject );

executor.execute();
```

# Your Second Task
Help me debug the following TypeScript error

# Error from running test.js
```bash
adamsl@penguin:~/the-factory/src/typescript_source/concrete/commands/ls_command$ node test.js 
/home/adamsl/the-factory/src/typescript_source/concrete/commands/ls_command/test.js:9
let commandObject = new LsCommand.default();
                    ^

TypeError: LsCommand.default is not a constructor
    at Object.<anonymous> (/home/adamsl/the-factory/src/typescript_source/concrete/commands/ls_command/test.js:9:21)
    at Module._compile (internal/modules/cjs/loader.js:1068:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1097:10)
    at Module.load (internal/modules/cjs/loader.js:933:32)
    at Function.Module._load (internal/modules/cjs/loader.js:774:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:72:12)
    at internal/main/run_main_module.js:17:47
adamsl@penguin:~/the-factory/src/typescript_source/concrete/commands/ls_command$  
```

