/*
 *  class AxiosPacketFactory
 */
import FreshToolBox from "../FreshToolBox";

export default class AxiosPacketFactory {

    constructor() { console.log( 'constructing AxiosPacketFactory object...' ); }

    async createPacketFromQuery( queryString: string, machineName: string ): Promise< string > {
        const ApiConfiguration = await import( "../config/" + FreshToolBox.capitalizeFirstLetter( machineName + "Config" ));
        const apiConfiguration = new ApiConfiguration.default();
        apiConfiguration[ "sql" ] = queryString;
        return JSON.stringify( apiConfiguration );
    }
}
