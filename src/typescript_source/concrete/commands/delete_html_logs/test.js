const DeleteHtmlCommand = require( "../../../../../out/typescript_source/concrete/commands/delete_html_logs/DeleteHtmlCommand" );
const CommandExecutor = require( "../../../../../out/typescript_source/concrete/CommandExecutor" );
/** test for DeleteHtml Command */
let commandObject = new DeleteHtmlCommand.default();
let executor      = new CommandExecutor.default( commandObject );

executor.execute();
