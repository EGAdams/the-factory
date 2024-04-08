import ICommandFinishedEmitter from '../abstract/ICommandFinishedEmitter';
import ICommandObject from '../abstract/ICommandObject';

let io = require( "socket.io-client" );

export default class EmitterSocket {
	socket: ICommandFinishedEmitter;

    constructor() {
        this.socket = io( "http://localhost:3000" );
        if ( this.socket ) { console.log( "socket constructed." ); }}

    emit( listenerText :string, objectToEmit :ICommandObject ) {
        if ( this.socket ) {
            console.log( "socket defined." );
        } else { console.error( "*** ERROR: socket not defined!  exiting... *** " ); return; }

        this.socket.emit( listenerText, objectToEmit ); }

    on( triggerText :string, method :string ) {
        this.socket.on( triggerText, method ); }

    testMe() {
        console.log( "creating test command object... " );
        let commandObject = {
			id: 0,
			command_name: "",
			command_stringified: "",
			execution_type: "thispc",
            executable: "cat",
            args: " alertCheck_1615899731770.txt ",
            description: "Test Alert Monitor",
            targetMachine: "thispc",
            commandObject: "CommandExecutor",
            output: [],
            status: "",
            regex_map_filename: "customerAlertRegex.txt",
            outputProcessor: "AlertPopulator",
            processedOutput: {},
			emitter: "EmitterSocket" };
        this.emit( "sendCommand", commandObject ); }
}
