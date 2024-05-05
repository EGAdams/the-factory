import TheEmitter from "/home/adamsl/the-factory/src/typescript_source/concrete/TheEmitter";
import fs from 'fs';
import { Client as SSH2Client } from 'ssh2';

interface ClientConfig {
    name: string;
    host: string;
    port?: number;
    username?: string;
    privateKey?: string | Buffer;
}

// Add an interface for the `data` event's callback parameter.
interface DataEventCallbackParameter {
    // Define the structure here. As an example:
    // data: string;
}

class ClientFactory {
    private clients: { [key: string]: SSH2Client } = {};
    private settingsObject: { [key: string]: any } = {};
    private emitter: TheEmitter;

    constructor(initObj: { [key: string]: any }) {
        for (const key in initObj) {
            this.settingsObject[key] = initObj[key];
        }
        this.emitter = new TheEmitter();
    }

    getClient(clientConfig: ClientConfig): void {
        const debug = true;
        if (debug) {
            console.log("In getClient");
            console.log(`getClient() called with config: ${JSON.stringify(clientConfig)}`);
        }

        if (this.clients[clientConfig.name]) {
            if (debug) console.log("*** Done getClient");
            this.emitter.emit('gotClientConnection', this.clients[clientConfig.name]);
        } else {
            console.log(`${clientConfig.name} does not exist. creating...`);
            this.createClient(clientConfig);
            if (debug) console.log("*** Done getClient, creating...");
        }
    }

    private createClient(clientConfig: ClientConfig): void {
        const debug = true;
        if (debug) console.log("In createClient");

        console.log(`createClient() called with config.name: ${clientConfig.name}  host:${clientConfig.host}`);

        const conn = new SSH2Client();
        conn.on('ready', () => {
            console.log('Client :: ready');
            conn.shell((err: any, stream: any) => { // Consider defining proper types for err and stream
                if (err) throw err;
                stream.on('close', () => console.log('Stream :: close'))
                      .on('data', (data: any) => { // Consider defining proper types for data
                          console.log('OUTPUT: ' + data);
                          this.clients[clientConfig.name] = conn;
                          this.emitter.emit('gotClientConnection', conn);
                          conn.exec('ls -lart', (err: any, stream: any) => { // Again, consider proper types
                              if (err) {
                                  console.log('SECOND :: exec error: ' + err);
                                  return conn.end();
                              }
                              stream.on('data', (data: any) => console.log(data.toString()));
                          });
                      });
            });
        }).connect({
            host: clientConfig.host,
            username: clientConfig.username || 'adamsl',
            privateKey: fs.readFileSync('/home/adamsl/.ssh/id_rsa_aj')
        });
        console.log("done createClient");
    }

    // Similar adjustments for testMe()
}

export default ClientFactory;

