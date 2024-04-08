import OutputProcessor from "../../commands/OutputProcessor"

/** @class GetBalanceOutputProcessor */
export default class GetBalanceOutputProcessor extends OutputProcessor {
    server_js_size ( matchedRegex: { matchedString: string }, _index: unknown ) {
        console.log( "the size of cdrul.sh is: " + matchedRegex.matchedString + " bytes" );
        console.log( _index ); // hush eslint
    }
}
