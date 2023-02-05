import IMonitoredObject from "../../abstract/IMonitoredObject";

/**
 *  @class LoggerFactory
 * 
 *  @description
 *  a factory for log objects.
 * 
 */
export default class LoggerFactory {
	static factory_id: string;
	constructor( objectName: string ) { console.log( "creating a log object from " + objectName + "..." );	}
	
	/**
	 * @method getLogger
	 * @description	 gets a live logger from taken out of the types folder.
	 *
	 * @param {string} objectName
	 * @param {Array< unknown >}
	 * @return { IMonitoredObject }
	 * @memberof LoggerFactory
	 */
	static async getLogger ( objectName: string, ...args: any[] ): Promise< IMonitoredObject | undefined> {
		console.log( "getting logger for " + objectName + "..." );
		const FACTORY_ID = "2022";
        const DATA_LOCATION = "https://americansjewelry.com/libraries/local-php-api/index.php/";
		const Subject = await import( "./types/" + objectName );
		let config = { new_id: FACTORY_ID, data_source_location: DATA_LOCATION };
        const monitoredObject = new Subject.default( config );
		// monitoredObject.constructor.apply( monitoredObject, args );
		return monitoredObject;	}
}
