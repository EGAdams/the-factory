import OutputProcessor from "../../commands/OutputProcessor"

/** @class DeleteHtmlOutputProcessor */
export default class DeleteHtmlOutputProcessor extends OutputProcessor {
    server_js_size ( matchedRegex: { matchedString: string }, _index: unknown ) {
        console.log( "the size of cdrul.sh is: " + matchedRegex.matchedString + " bytes" );
        console.log( _index ); // hush eslint
    }
}
