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
	constructor( objectName: string ) {
		console.log( "creating a log object from " + objectName + "..." );
	}
	
	/**
	 * @method getLogger
	 * @description	 gets a live logger from taken out of the types folder.
	 *
	 * @param {string} objectName
	 * @param {Array< unknown >} arrayToRemoveItFrom
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
		return monitoredObject;
	}


	/** useful methods below can be safely deleted.  just listed here for convenience */
	static capitalizeFirstLetter ( stringToUppercase: string ): string {
		return stringToUppercase.charAt( 0 ).toUpperCase() + stringToUppercase.slice( 1 ); }

	static isInArray ( objectToSearchFor: any, arrayToSearch: Array<any> ): boolean {
		return ( arrayToSearch.indexOf( objectToSearchFor ) > -1 );	}

	static assert ( condition: any, msg?: string ): asserts condition {
		if ( !condition ) { throw new Error( msg ) }}
}
