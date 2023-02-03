import IQueryResultProcessor from '../../abstract/data/IQueryResultProcessor';
/**
 * @description
 * Verifies whether or not a data packet contains a valid object.
 * 
 * This may need to be turned into an interface in the future.  At this time
 * it is being used to verify whether or not a monitored object exists in 
 * the monitored_objects database.
 * 
 * @class DataPacketVerifier
 * 
 */
export default class DataPacketVerifier implements IQueryResultProcessor{
    constructor() { console.log( 'constructing DataPacketVerifier object...' ); }
    
    /**
     * @method validateDataPacket 
     * @description Takes an object and verifies it's contents.
     *
     * @param {*} freshObject Any object that needs it's contents verified.
     * @memberof DataPacketVerifier
     */
    validateDataPacket( freshObject: any ) {
        console.log( "verifying data packet..." );
        
        // check the packet for a monitored object.
        console.log( "freshObject[ 0 ] : " + freshObject[ 0 ]);
        
    }
    
    processQueryResult ( queryResultToBeProcessed: any ): void {
        this.validateDataPacket( queryResultToBeProcessed );
    }
}
