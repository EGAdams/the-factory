/*
 *  interface IDataObject
 *
 *  The api arguments hold the query and the 
 *  ( "event" or "callback" ) instructions for the next move .
 * 
 */

interface IDataObject {
    runQuery( apiArgs: any ): void;
}

export default IDataObject;
