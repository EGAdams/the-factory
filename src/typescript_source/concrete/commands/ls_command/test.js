/*
 * Test for LsCommand
 */
const LsCommand = require("/home/adamsl/the-factory/dist/typescript_source/concrete/commands/ls_command/LsCommand").default;

const CommandExecutor = require("/home/adamsl/the-factory/dist/typescript_source/concrete/commands/CommandExecutor").default;

/** test for LsCommand */
let commandObject = new LsCommand();
let executor = new CommandExecutor( commandObject );

executor.executeCommand();