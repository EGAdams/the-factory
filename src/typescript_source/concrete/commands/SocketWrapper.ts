import { Socket as IOSocket } from "socket.io-client";
import ICommandObject from "/home/adamsl/the-factory/src/typescript_source/abstract/ICommandObject";

import io, { Socket } from "socket.io-client";

class SocketWrapper {
  private socket: Socket;

  constructor() {
    this.socket = io( "http://localhost:3000" );
    if ( this.socket ) {
      console.log("socket constructed inside SocketWrapper.");
    }
  }

  emit( listenerText: string, objectToEmit: ICommandObject ): void {
    if ( this.socket ) {
      console.log( "socket defined." );
    } else {
      console.error( "*** ERROR: socket not defined!  exiting... *** " );
      return;
    }
    this.socket.emit(listenerText, objectToEmit);
  }

  on(triggerText: string, method: (data: any) => void): void {
    this.socket.on(triggerText, method);
  }

  testMe(): void {
    let errors: Array<any> = new Array();
    console.log("creating test command object... ");
    let commandObject: ICommandObject = {
      execution_type: "",
      id: 0,
      command_stringified: "",
      command_name: "cat",
      executable: "cat",
      args: " alertCheck_1615899731770.txt ",
      description: "Test Alert Monitor",
      targetMachine: "thispc",
      output: [],
      regex_map_filename: "customerAlertRegex.txt",
      outputProcessor: "AlertPopulator",
      emitter: "",
      status: "",
      processedOutput: {}
    };
    this.emit("sendCommand", commandObject);

    commandObject.executable = "cat ";
    commandObject.args = " blotterCheck_1616764097554.txt ";
    commandObject.description = "blotter check";
    commandObject.targetMachine = "thispc";
    commandObject.regex_map_filename = "customerBlotterRegex.txt";
    commandObject.outputProcessor = "BlotterPopulator";
    this.emit("sendCommand", commandObject);
  }
}

export default SocketWrapper;
