import MonitoredObject from "../../MonitoredObject";

/**
 *  @class DataObjectLogger
 * 
 *  @description
 *  a logger for the DataObject.
 * 
 */
 export default class DataObjectLogger extends MonitoredObject {

	constructor( config :IMonitoredObjectConfig ) { super( config ); }
	
    static capitalizeFirstLetter ( stringToUppercase: string ): string {
        return stringToUppercase.charAt( 0 ).toUpperCase() + stringToUppercase.slice( 1 ); }

    static isInArray ( objectToSearchFor: any, arrayToSearch: Array< any > ): boolean {
        return( arrayToSearch.indexOf( objectToSearchFor ) > -1 ); }
    
    static assert( condition: any, msg?: string ): asserts condition {
        if ( !condition ) {
            throw new Error( msg )
        }}
}
