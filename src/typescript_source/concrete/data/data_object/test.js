/**  Data Object Test */
const DataObject = require( '../../../../../out/typescript_source/concrete/data/data_object/DataObject.js' );
const JewelryMachineDataConfig = require( "../../../../../out/typescript_source/config/JewelryMachineDataConfig.js" );
let dataObject = new DataObject.default( new JewelryMachineDataConfig.default());
const DELAY_BEFORE_DATABASE_DELETE = 5 * 1000; // wait 5 seconds before clearing out monitored_objects so that they will show

async function check_select_results( these_results ) {
    console.log( "results inside then: " + these_results );
    if ( these_results.length === 0 ) {
        console.log( "test object does not exist." );
        console.log( "inserting test object..." );
            let object_view_id = "test_id_101";
            let insertQuery = "insert into monitored_objects ( object_view_id, object_data ) values ( '"
                               + object_view_id + "', '" + object_string + "' )";
            dataObject.runSyncQuery( insertQuery ).then( function() {
                console.log( "test object inserted." );
                console.log( "selecting test object..." );
                let selectObjectQuery = "select * from monitored_objects where object_view_id='" + object_view_id + "'";
                dataObject.runSyncQuery( selectObjectQuery ).then( check_select_results );
            });
    } else {
        console.log( "test object exists." );
		await dataObject.logger.logUpdate( "finished successful creation of test object. " ); 
	}}

function check_delete_results() {
    dataObject.runSyncQuery( selectObjectQuery ).then( function( delete_results ) {
        console.log( "delete_results: " + delete_results );
        if ( delete_results.length === 0 ) {
            console.log( "test object deleted." );
        } else {
            console.log( "test object not deleted." );
            throw( Error( "*** ERROR: Can not delete test object. ***" )); }}); }

async function wait_for_insert( this_id, this_test_object ) {
    return dataObject.insertObject( this_id, this_test_object );
}

console.log( "checking for test object existence..." );
let id = "test_id_101";
let test_object = { name: "test" };

let object_string = JSON.stringify( test_object );
console.log( "object_string: " + object_string );
let selectObjectQuery = "select object_data from monitored_objects where object_view_id='" + id + "'";
console.log( "selectObjectQuery: " + selectObjectQuery );
console.log( "running query for object_data..." );
let results = dataObject.runSyncQuery( selectObjectQuery ).then( check_select_results )
														  .then( setTimeout( function() {
															dataObject.deleteMonitoredObjects( dataObject );
															process.exit( 0 );
														  }, DELAY_BEFORE_DATABASE_DELETE /* AND EXIT */ ));

