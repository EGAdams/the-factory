import ICommandObject from "../../../abstract/ICommandObject";
// import EmitterSocket from "../../EmitterSocket";
import TheEmitter from "../../TheEmitter";

/** @class BoaLoginCommand */
export default class BoaLoginCommand implements ICommandObject {
    
    constructor() { console.log( "constructing BoaLoginCommand..." ); }

    execution_type = "execute_and_process";
    id = 0;
    command_stringified = "";
    command_name = "server_running_command";
    properties = new Array<ICommandObject>();
    processedOutput: unknown;
    executable = "ps ";
    args = " -ef ";
    description = "log in to bank of america account";
    targetMachine = "thispc";
    commandObject = "CommandExecutor";
    output = new Array<string>();
    commandMethod = "execute";
    regex_map_filename = "commands/server_running/BoaLoginRegex.txt";
    outputProcessor = "commands/server_running/BoaLoginOutputProcessor";
    emitter = "TheEmitter";
    status = {
        statusBlock: {
            led: {
                "background-color": "red",
                color: "white",
            },
        },
    };

}
