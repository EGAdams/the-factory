# Who you are
- Expert TypeScript Developer
- Seasoned user of the GoF Design Patterns.
- World-class Functional Programming Guru

# Your Task
Please write the Socket.ts file.  Use the following JavaScript code as a base and make sure that it fits in with the existing Typescript code.  Correct any errors that you find.  Use the same coding style like keeping a space before and after text inside parenthesis, brackets, and braces.

# JavaScript code that needs translating to TypeScript code
```javascript

var io = require( "socket.io-client" );

class Socket {
    constructor() {
        this.socket = io("http://localhost:3000");
        if ( this.socket ) {
            console.log( "socket constructed inside Socket." );
        }
    }

    emit( listenerText, objectToEmit ) {
        if ( this.socket ) {
            console.log( "socket defined." );
        } else {
            console.error( "*** ERROR: socket not defined!  exiting... *** " );
            return;
        }
        this.socket.emit( listenerText, objectToEmit );
    }

    on( triggerText, method ) {
        this.socket.on( triggerText, method );
    }

    testMe() {
        var errors = new Array();
        console.log( "creating test command object... " );
        var commandObject = {
            executable: "cat",
            args: " alertCheck_1615899731770.txt ",
            description: "Test Alert Monitor",
            targetMachine: "thispc",
            commandObject: "CommandExecutor",
            output: "",
            status: "",
            regex_map_filename: "customerAlertRegex.txt",
            outputProcessor: "AlertPopulator",
            processedOutput: {}
        };
        this.emit( "sendCommand", commandObject );

        commandObject.executable = "cat "
        commandObject.args       = " blotterCheck_1616764097554.txt ";
        commandObject.description = "blotter check";
        commandObject.targetMachine = "thispc";
        commandObject.regex_map_filename = "customerBlotterRegex.txt";
        commandObject.outputProcessor = "BlotterPopulator";
        this.emit( "sendCommand", commandObject );
    }
}

module.exports = Socket;


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

import TheEmitter from '/home/adamsl/the-factory/dist/typescript_source/concrete/TheEmitter'; // Make sure the path and file extension are correct.
import fs from 'fs';
import { Client as SSH2Client } from 'ssh2';

interface ClientConfig {
    name: string;
    host: string;
    port?: number;
    username?: string;
    privateKey?: string | Buffer;
}

// Add an interface for the `data` event's callback parameter.
interface DataEventCallbackParameter {
    // Define the structure here. As an example:
    // data: string;
}

class ClientFactory {
    private clients: { [key: string]: SSH2Client } = {};
    private settingsObject: { [key: string]: any } = {};
    private emitter: TheEmitter;

    constructor(initObj: { [key: string]: any }) {
        for (const key in initObj) {
            this.settingsObject[key] = initObj[key];
        }
        this.emitter = new TheEmitter();
    }

    getClient(clientConfig: ClientConfig): void {
        const debug = true;
        if (debug) {
            console.log("In getClient");
            console.log(`getClient() called with config: ${JSON.stringify(clientConfig)}`);
        }

        if (this.clients[clientConfig.name]) {
            if (debug) console.log("*** Done getClient");
            this.emitter.emit('gotClientConnection', this.clients[clientConfig.name]);
        } else {
            console.log(`${clientConfig.name} does not exist. creating...`);
            this.createClient(clientConfig);
            if (debug) console.log("*** Done getClient, creating...");
        }
    }

    private createClient(clientConfig: ClientConfig): void {
        const debug = true;
        if (debug) console.log("In createClient");

        console.log(`createClient() called with config.name: ${clientConfig.name}  host:${clientConfig.host}`);

        const conn = new SSH2Client();
        conn.on('ready', () => {
            console.log('Client :: ready');
            conn.shell((err: any, stream: any) => { // Consider defining proper types for err and stream
                if (err) throw err;
                stream.on('close', () => console.log('Stream :: close'))
                      .on('data', (data: any) => { // Consider defining proper types for data
                          console.log('OUTPUT: ' + data);
                          this.clients[clientConfig.name] = conn;
                          this.emitter.emit('gotClientConnection', conn);
                          conn.exec('ls -lart', (err: any, stream: any) => { // Again, consider proper types
                              if (err) {
                                  console.log('SECOND :: exec error: ' + err);
                                  return conn.end();
                              }
                              stream.on('data', (data: any) => console.log(data.toString()));
                          });
                      });
            });
        }).connect({
            host: clientConfig.host,
            username: clientConfig.username || 'adamsl',
            privateKey: fs.readFileSync('/home/adamsl/.ssh/id_rsa')
        });

        if (debug) console.log("done createClient");
    }

    // Similar adjustments for testMe()
}
export default ClientFactory;
```
This line of code is causing a TypeScript error:
```typescript
 this.socket = new IOSocket("http://localhost:3000", undefined, {});
```
Please fix this error:
```error
Argument of type 'string' is not assignable to parameter of type 'Manager<DefaultEventsMap, DefaultEventsMap>'.ts(2345)
```