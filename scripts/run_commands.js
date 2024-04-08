

  // Import the classes
const CommandManager = require("../src/typescript_source/concrete/commands/CommandManager.ts"); 
const DeleteHtmlCommand = require("../src/typescript_source/concrete/commands/delete_html_logs/DeleteHtmlCommand");

// Create a CommandManager instance 
const manager = new CommandManager();

// Create the DeleteHtmlCommand
const deleteCommand = new DeleteHtmlCommand();

// Add the command to the manager
manager.addCommand(deleteCommand); 

// Run the commands
manager.runCommands();

