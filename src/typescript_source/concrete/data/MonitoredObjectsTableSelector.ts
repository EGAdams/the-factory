/**
 * @description
 * Selects an object from the monitored objects table.
 * 
 * @class MonitoredObjectsTableSelector
 *  
 */
export default class MonitoredObjectsTableSelector {
    constructor() { console.log( 'constructing MonitoredObjectsTableSelector object...' ); }

    public selectMonitoredObject( objectViewIdArg: string ): void {
        console.log( "selecting monitored object..." );
        const query = `select object_data from monitored_objects where object_view_id='${ objectViewIdArg }'`;
    }
    
}
