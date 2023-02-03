import ISubject from "../../abstract/ISubject";
/**
 *  @class MonitoredObjectsTableUpdater
 *  
 *  @description
 *  Create the query that query runner 
 *  will then use to update the monitored 
 *  objects table.
 * 
 */
export default class MonitoredObjectsTableUpdater {    
    constructor() { console.log( 'constructing MonitoredObjectsTableUpdater object...' ); }
    
    /**
     *  @method update
     *  @description
     *  
     *  Stringifies the passed in Subject and updates the monitored_objects table with this information.
     * 
     *  @param {ISubject} subject The subject to be stringified.
     *      
     *  @param {string} objectViewIdArg This is needed to locate the correct object in the table that will be updated.
     *  @return {*}  {void}
     *  @memberof MonitoredObjectsTableUpdater
     */
    public update( subject: ISubject, objectViewIdArg: string ): void {
        console.log( "updating table..." );
        if ( !objectViewIdArg  ) { console.log( "*** ERROR: no id sent to update method! ***" ); return; }
        const query = "update monitored_objects set object_data='" + JSON.stringify( subject ) + 
                      "' where object_view_id='" + objectViewIdArg + "'";

        console.log( `running query${ query }...` ); }
}
