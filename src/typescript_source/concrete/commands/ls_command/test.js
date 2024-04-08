/*
 * Test for LsCommand
 */
const LsCommand = require("/home/adamsl/the-factory/dist/typescript_source/concrete/commands/ls_command/LsCommand").default;

const CommandExecutor = require( "/home/adamsl/the-factory/dist/typescript_source/concrete/CommandExecutor" );

/** test for LsCommand */
let commandObject = new LsCommand.default();
let executor      = new CommandExecutor.default( commandObject );

executor.execute();
