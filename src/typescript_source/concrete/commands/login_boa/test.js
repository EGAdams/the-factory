const BoaLoginCommand = require( "../../../../../out/typescript_source/concrete/commands/server_running/BoaLoginCommand" );
const CommandExecutor = require( "../../../../../out/typescript_source/concrete/CommandExecutor"                         );

/** test for BoaLoginCommand */
let commandObject = new BoaLoginCommand.default();
let executor      = new CommandExecutor.default( commandObject );

executor.execute();
