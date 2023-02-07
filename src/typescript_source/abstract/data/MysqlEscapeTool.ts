/*
 *  class MysqlEscapeTool
 */
export default class MysqlEscapeTool {

    constructor() { console.log( 'constructing MysqlEscapeTool object...' ); }
    
    mysqlEscape( stringToEscape: string ) {
        return stringToEscape
            .replace( /\\/g, "\\\\" )
            .replace( /\\n/g, "\\n" )
            .replace( /\'/g, "\\'" )
            .replace( /\"/g, '\\"' )
            .replace( /\\&/g, "\\&" )
            .replace( /\\r/g, "\\r" )
            .replace( /\\t/g, "\\t" )
            .replace( /\\b/g, "\\b" )
            .replace( /\\f/g, "\\f" ); }
}
