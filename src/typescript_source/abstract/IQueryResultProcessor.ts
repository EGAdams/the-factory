/**
 *
 * @description
 * Objects that represent finished queries are sent
 * to this type of object for further processing.
 *
 * @interface IQueryResultProcessor
 */
/**
 * Represents an interface for processing query results.
 */
export default interface IQueryResultProcessor {
    /**
     * Processes the given query result.
     * 
     * @param thisObject - The instance of the query result processor.
     * @param queryResultToBeProcessed - The query result to be processed.
     */
    processQueryResult(thisObject: IQueryResultProcessor, queryResultToBeProcessed: any): void;
}
