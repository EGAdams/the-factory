import IQueryResultProcessor from "../../abstract/data/IQueryResultProcessor";

/**
 * @description
 * Handles object returned from an insert
 * query operation.
 * 
 * It is using the DataPacketVerifier for this purpose.
 * 
 * @class QueryInsertProcessor
 * @implements {IQueryResultProcessor}
 */
export default class QueryInsertProcessor implements IQueryResultProcessor {
    constructor() { console.log( 'constructing QueryInsertProcessor object...' ); }
    processQueryResult( queryResult: any ): void {
        console.log( "processing query result..." );
        console.log( "queryResult.data: " + queryResult.data );
        console.log( "checking table for inserted object..." );
        console.log( "Done processing query result." ); }
        
}
