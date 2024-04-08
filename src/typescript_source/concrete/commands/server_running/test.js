const ServerRunningCommand = require( "../../../../../out/typescript_source/concrete/commands/server_running/ServerRunningCommand" );
const CommandExecutor      = require( "../../../../../out/typescript_source/concrete/CommandExecutor"                              );

/** test for Server Running Command */
let commandObject = new ServerRunningCommand.default();
let executor      = new CommandExecutor.default( commandObject );

executor.execute();
