/*
 *  The DataObject
 */
import mysql from 'mysql';
import util  from  'util';
import io from "socket.io-client";
import MonitoredObject from "../../MonitoredObject";
import ICommandFinishedEmitter from "../../../abstract/ICommandFinishedEmitter";
import IDatabaseConfig from "../../../abstract/IDatabaseConfig";
import IMonitoredObject from '../../../abstract/IMonitoredObject';
import LoggerFactory from '../../logger/LoggerFactory';

class DataObject {
    //pool: mysqlObject.Pool;
    emitter: ICommandFinishedEmitter | undefined;
    io: unknown;
    connection!: mysql.Connection;
	logger: any;
 
    constructor( config: IDatabaseConfig ) {
		this.getMyLogger().then( ( loggerArg: any ) => { this.logger = loggerArg; })
		this.emitter = io( "http://localhost:3000" );
		try {
			console.log( "***** DATA OBJECT CONNECTING *****" );
			this.connection = mysql.createConnection( config );
		} catch ( error ) {
			console.log( "*** ERROR: Database connection error.  calling dataObject.connect()... ***" ); }
			
		console.log( "new DataObject created." );
	}
			
	async getMyLogger() {
		let logger = await LoggerFactory.getLogger( "DataObjectLogger" );
		return logger; }

    connect (): void {}

    async insertObject ( objectName: string, objectData: string ): Promise< void >{
        try {
            this.logger.logUpdate( "executing await query in insertObject..." );
            let object_string = JSON.stringify( objectData );
            this.logger.logUpdate( "object_string: " + object_string );
            let dataQuery = "insert into monitored_objects (object_view_id, object_data) values ('";
            dataQuery += objectName + "', '" + object_string + "')";
            let results: any;
            const query = util.promisify( this.connection.query ).bind( this.connection );
            try {
                results = await query( dataQuery );
            } catch ( error :any ) {
				// await this.logger.logUpdate( "*** ERROR: " + error.message + " ***" );
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
			this.connection.query( dataQuery, function (_err, result, _fields) {
				if (_err) throw _err;
				console.table( result );
				// callback( result );
				});
		} catch ( error :any ) { console.log( "*** ERROR: problem while selectingObject(): " +
												error.message + " ***" ); }}

    deleteMonitoredObjects( dataObject: DataObject ): void {
		let dataQuery = "delete from monitored_objects";
		console.log( "running query: " + dataQuery );
		dataObject.runSyncQuery( dataQuery ); }

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
			// this.connection.destroy();
            return results;
        } catch ( e ) {
            throw Error( "*** ERROR: running query: " + queryArg + " ***" );
        }
    }
}

export default DataObject;
