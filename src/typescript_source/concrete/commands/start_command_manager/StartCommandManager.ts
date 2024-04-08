/*
 *  class StartCommandManager
 */
import ICommandObject from "../../../abstract/ICommandObject";
import EmitterSocket from "../../EmitterSocket";

class StartCommandManager implements ICommandObject {
    execution_type = "execute_and_process";
    id = 0;
    command_stringified = "";
    command_name = "start_command_manager";
    executable = "node ";
    args = " runCommandManager.js ";
    description = "Start Command Manager";
    targetMachine = "thispc";
    output = new Array< string >();
    regex_map_filename = "";
    outputProcessor = "StartCommandManagerOutputProcessor";
    emitter = "EmitterSocket";
    properties = [];
    status = {};
    processedOutput = {};
}

export default StartCommandManager;
