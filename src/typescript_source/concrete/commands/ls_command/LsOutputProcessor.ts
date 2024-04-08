/*
 * LsOutputProcessor
 */
import OutputProcessor from "../../commands/OutputProcessor";

class LsOutputProcessor extends OutputProcessor {
    server_js_size ( matchedRegex: { matchedString: string }, _index: unknown ) {
        console.log(
            "the size of cdrul.sh is: " + matchedRegex.matchedString + " bytes"
        );
        console.log( _index ); // hush eslint
    }
}
module.exports = LsOutputProcessor; // don't forget this!
// export default was suggested here if this doesn't work.
