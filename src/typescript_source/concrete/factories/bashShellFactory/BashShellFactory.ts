
/** @class BashShellFactory */
class BashShellFactory {
    clients: any;
    emitter: any;

    createClient( clientConfig: { name: string; host: string; }) {
        // console.log( `createClient() called with config.name: ${clientConfig.name}  host:${clientConfig.host}` );
        const Client = require( "ssh2" ).Client;
        const conn = new Client();
        const self = this;

        conn.on( "ready", () => {
            console.log("Client :: ready");
            conn.shell((err: any, stream: { on: (arg0: string, arg1: { (): void; (data: any): void; }) => void; }) => {
                if (err) throw err;
                stream.on("close", () => {
                    console.log("Stream :: close");
                    conn.end();
                });

                stream.on("data", ( data?: any ) => {
                    console.log(`OUTPUT: ${data}`);
                    // self.clients[clientConfig.name] = conn;
                    // self.emitter.emit("gotClientConnection", conn);
                    conn.exec("ls -lart", (err: any, stream: any) => {
                        if (err) {
                          console.log(`SECOND :: exec error: ${err}`);
                          return conn.end();
                        }
                        stream.on("end", () => {
                          // conn.end(); // close parent (and this) connection
                        });
                        stream.on("data", (data: any) => {
                          console.log(data.toString());
                          console.log("processing output...");
                          self.clients[clientConfig.name] = conn;
                        });
                      });
                      
                  });
                //stream.end('./alertCheck.sh\n./blotterCheck.sh\nexit\n');
            });
        }).connect({
            host: "americansjewelry.com",
            password: "",
            username: 'tinman72',
            privateKey: require( 'fs' ).readFileSync( '/home/adamsl/.ssh/id_rsa' )
        });
    }
}
export default BashShellFactory;