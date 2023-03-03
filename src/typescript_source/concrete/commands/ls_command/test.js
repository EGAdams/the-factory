/*
 * Test for LsCommand
 */
const LsCommand = require( "../../../../../out/typescript_source/concrete/commands/ls_command/LsCommand" );
const CommandExecutor = require( "../../../../../out/typescript_source/concrete/CommandExecutor" );

/** test for LsCommand */
let commandObject = new LsCommand.default();
let executor      = new CommandExecutor.default( commandObject );

executor.execute();
