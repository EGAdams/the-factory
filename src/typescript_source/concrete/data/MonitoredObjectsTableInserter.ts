import IApiArgs from "../../abstract/data/IApiArgs";
import QueryInsertProcessor from './QueryInsertProcessor';
/**
 *  @class MonitoredObjectsTableInserter
 *
 *  @description
 *  Inserts a new object into the monitored objects table.
 * 
 *  In an effort to follow SRP, this object basically has only one responsibility;
 * 
 *  <b>To create the insert query for the query runner.</b> 
 * 
 *  The query runner will then use the created query to insert a new object into the 
 *  monitored objects table.
 * 
 *  I'm not sure if the design of this object violates the SRP rule or not by validating the
 *  insertion.  
 * 
 */
class MonitoredObjectsTableInserter {

    constructor() { console.log( 'constructing MonitoredObjectsTableInserter object...' ); }
    queryInsertProcessor = new QueryInsertProcessor();
    insertMonitoredObject ( object_view_id: string, object_data: string ): void {
        const args: IApiArgs  = {
            query: "insert into monitored_objects( object_view_id, object_data ) values ( '"
                + object_view_id + "', '" + object_data + "' )",
            data: {},
            queryResultProcessor: this.queryInsertProcessor
        }
        console.log( "running query: " + args.query );
        // this.dataSource.runQuery( args );
    }
}

export default MonitoredObjectsTableInserter;
