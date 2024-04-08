const GetBalanceCommand = require( "../../../../../out/typescript_source/concrete/commands/delete_html_logs/GetBalanceCommand" );
const CommandExecutor = require( "../../../../../out/typescript_source/concrete/CommandExecutor" );
/** test for GetBalance Command */
let commandObject = new GetBalanceCommand.default();
let executor      = new CommandExecutor.default( commandObject );

executor.execute();
