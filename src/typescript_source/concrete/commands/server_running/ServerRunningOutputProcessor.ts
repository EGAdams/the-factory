/*
 * ServerRunningOutputProcessor
 */
import OutputProcessor from "../../commands/OutputProcessor";

class ServerRunningOutputProcessor extends OutputProcessor {
    async server_running( matchedRegex: { [ x: string ]: any; matchedString: string }, _index: unknown ) {
        console.log( "found this process: " + matchedRegex.regex[ 1 ] + " so it must be running." ); 
        setTimeout( () => { this.logger?.logUpdate( "finished processing output.  The server is running." ); }, 1000 );
    }
}        
module.exports = ServerRunningOutputProcessor; // don't forget this!
