/*
*  class GetBalanceCommand
*/
import ICommandObject from '../../../abstract/ICommandObject';

export default class GetBalanceCommand implements ICommandObject  {
    execution_type = "execute_and_process";
    id = 0;
    command_stringified = ""
    command_name = "get_boa_balance"
    properties = new Array< ICommandObject >();
    processedOutput: unknown;
    executable = "get_boa_balance.sh  ";
    args = " ";
    description = "deletes html logs from remote machine";
    targetMachine = "thispc";
    commandObject = "CommandExecutor";
    output = new Array< string >();
    commandMethod = "execute";
    regex_map_filename = "src/typescript_source/concrete/commands/get_boa_balance/GetBalanceRegex.txt";
    outputProcessor = "./commands/get_boa_balance/GetBalanceOutputProcessor";
    emitter = "EmitterSocket"
    status =  {
        statusBlock: {
            led: {
                "background-color": "yellow",
                color: "black"
            }
        }        
    }

    constructor() {
        console.log( "constructing GetBalanceCommand..." );
    }
    
}
