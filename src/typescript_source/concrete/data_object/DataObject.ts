/*
 *  The DataObject
 */
import mysql from 'mysql';
import util  from  'util';
import ISshConfig from "../../abstract/ISshConfig";
// import BasicConfig from "../../../config/BasicConfig";

class DataObject {
    connection!: mysql.Connection;
 
    constructor( config: ISshConfig ) {
        try {
            console.log( "***** DATA OBJECT CONNECTING *****" );
            this.connection = mysql.createConnection( config );
        } catch ( error ) { console.log( "*** ERROR: Database connection error.  calling dataObject.connect()... ***" ); }
        console.log( "new DataObject created." ); }

    async insertObject ( objectName: string, objectData: string ): Promise< void >{
        try {
            console.log( "executing await query in insertObject..." );
            let object_string = JSON.stringify( objectData );
            console.log( "object_string: " + object_string );
            let dataQuery = "insert into monitored_objects (object_view_id, object_data) values ('";
            dataQuery += objectName + "', '" + object_string + "')";
            let results: any;
            const query = util.promisify( this.connection.query ).bind( this.connection );
            try {
                results = await query( dataQuery );
            } catch ( error :any ) {
                throw Error( "error: " + error.toString() );
            }
            return results;
        } catch ( e ) {
            throw Error( "*** ERROR: problem while insertingObject() ***" );
        }
    }

    async getObject ( object_view_id: string ): Promise< void > {
        let dataQuery = "select object_data from monitored_objects where object_view_id='";
        dataQuery += object_view_id + "'";
        console.log( "running query: " + dataQuery );
            try {
                this.connection.query( dataQuery, function (_err: any, result: any, _fields: any) {
                    if (_err) throw _err;
                    console.table( result );
                  });
            } catch ( error :any ) { console.log( "*** ERROR: problem while selectingObject(): " +
                                                  error.message + " ***" ); }}

    deleteObject ( object_view_id: string, callback: any ): void {
            let dataQuery = "delete from monitored_objects where object_view_id='";
            dataQuery += object_view_id + "'";
            console.log( "running query: " + dataQuery );
            try {
                this.connection.query( dataQuery, function (_err: any, delete_result: any, _fields: any) {
                    if (_err) throw _err;
                    console.table( delete_result );
                    callback( delete_result );
                  });
            } catch ( error :any ) { console.log( "*** ERROR: problem while deletingObject(): " +
                                                  error.message + " ***" ); }}

    async runSyncQuery( queryArg :string ) {
        try {
            let results: any;
            const query = util.promisify( this.connection.query ).bind( this.connection );
            try {
                console.log( "executing await query in runSyncQuery..." );
                results = await query( queryArg );
            } catch ( error :any ) {
                throw Error( "error: " + error.toString() );
            }
            return results;
        } catch ( e ) {
            throw Error( "*** ERROR: problem while insertingObject() ***" );
        }
    }
}

export default DataObject;
