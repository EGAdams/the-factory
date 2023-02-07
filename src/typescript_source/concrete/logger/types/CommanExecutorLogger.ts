import IMonitoredObjectConfig from "../../../abstract/IMonitoredObjectConfig";
import MonitoredObject from "../../MonitoredObject";

/**
 *  @class CommandExecutorLogger
 * 
 *  @description
 *  a logger for the CommandExecutor.
 * 
 */
 export default class CommandExecutorLogger extends MonitoredObject {

	constructor( config :IMonitoredObjectConfig ) { super( config ); }
	
	/**  these can be removed at any point.  
	 * just keeping them here because they're used everywhere.  */
    static capitalizeFirstLetter ( stringToUppercase: string ): string {
        return stringToUppercase.charAt( 0 ).toUpperCase() + stringToUppercase.slice( 1 ); }

    static isInArray ( objectToSearchFor: any, arrayToSearch: Array< any > ): boolean {
        return( arrayToSearch.indexOf( objectToSearchFor ) > -1 ); }
    
    static assert( condition: any, msg?: string ): asserts condition {
        if ( !condition ) { throw new Error( msg ) }}
}
