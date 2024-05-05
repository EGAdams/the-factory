
const BashShellFactory = require( "../../../../../dist/typescript_source/concrete/factories/bashShellFactory/BashShellFactory" );    

let shell = new BashShellFactory.default();
shell.createClient();
console.log( shell );