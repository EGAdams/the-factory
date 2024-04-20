import ICommandObject from '/home/adamsl/the-factory/src/typescript_source/abstract/ICommandObject';
import ICommandFinishedEmitter from "/home/adamsl/the-factory/src/typescript_source/abstract/ICommandFinishedEmitter";
import { exec } from "child_process";
import SocketWrapper from './SocketWrapper';
import ClientFactory from '../factories/clientFactory/ClientFactory';
import EmitterSocket from '../EmitterSocket';
// import EmitterSocket from '../EmitterSocket';

class CommandExecutor {
    private commandObject: ICommandObject;
	private io: ICommandFinishedEmitter; // = new SocketWrapper();
    private clients: { [key: string]: any } = {};

    constructor(commandObjectArg: ICommandObject) {
		this.commandObject = commandObjectArg;
		let path_to_io_emitter = "/home/adamsl/the-factory/dist/typescript_source/concrete/";
		console.log(`path_to_io_emitter: ${path_to_io_emitter}${this.commandObject.emitter}.js`);
		
		// Dynamically require the emitter module
		const CommandFinishedEmitterModule = require(`${path_to_io_emitter}${this.commandObject.emitter}`);
		
		// Assuming the emitter module exports a class or a factory function that needs to be instantiated.
		// If the emitter is a class:
		this.io = new CommandFinishedEmitterModule.default();
	
		// If the emitter is a factory function, you might do:
		// this.io = CommandFinishedEmitterModule.createInstance();
		
		// Additional setup or initialization could be placed here if necessary
	}
	
	public executeCommand(): void {
		

		console.log('processing command...');

		this._execute();
	}

	private _execute(): void {
		console.log(`executable: ${this.commandObject.executable}`);
		if (this.commandObject.targetMachine === 'thispc') {
			const executing = `${this.commandObject.executable} ${this.commandObject.args}`;
			console.log(`executing: ${executing}`);
			exec(executing, (error, stdout, stderr) => {
				if (error) {
					console.log(`error in CommandExecutor: ${error.message}`);
					return;
				}
				if (stderr) {
					console.log(`stderr: ${stderr}`);
					return;
				}

				this.commandObject.output = [stdout]; // Assuming output is an array of strings
				console.log('emitting command finished...');
				this.io.emit('commandFinished', this.commandObject);
			});
		} else {
			// Execute command on target machine
			if ( this.commandObject.targetMachine === 'dev' ) {
				const factory = new ClientFactory( this.commandObject ); // Create an instance of ClientFactory
				const clientConfig = { name: 'dev', host: '10.170.150.4' };
				this.io.on('gotConnection', (conn: any) => {
					conn.shell((err: Error, stream: any) => {
						if (err) throw err;
						stream
							.on('close', () => {
								console.log('Stream :: close');
								conn.end();
							})
							.on('data', (data: Buffer) => {
								console.log('OUTPUT: ' + data.toString());
								this.clients = { ...this.clients, [clientConfig.name]: conn };
								this.io.emit('gotClientConnection', conn);
								var executable = this.commandObject.executable;
								var args = this.commandObject.args;
								conn.exec(
									`${executable} ${args}`,
									(err: Error, stream: any) => {
										if (err) {
											console.log('SECOND :: exec error: ' + err);
											return conn.end();
										}
										stream
											.on('end', () => {
												// Execution and data handling logic
											})
											.on('data', (data: Buffer) => {
												console.log(data.toString());
												console.log('processing output...');
											});
									},
								);
							});
					});
				});
				factory.getClient(clientConfig);
			} else {
				console.error('No target machine defined! Exiting command executor...');
				return;
			}
		}
	}

    public testMe(): void {
        // Test function implementation
    }
}

export default CommandExecutor;
