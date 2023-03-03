/*
 * ServerRunningOutputProcessor
 */
import OutputProcessor from "../OutputProcessor";

class ServerRunningOutputProcessor extends OutputProcessor {
    server_js_size ( matchedRegex: { matchedString: string }, _index: unknown ) {
        console.log(
            "the size of cdrul.sh is: " + matchedRegex.matchedString + " bytes"
        );
        console.log( _index ); // hush eslint
    }
}
module.exports = ServerRunningOutputProcessor; // don't forget this!
