/*
 *  Data Object Test
 */
const DataObject = require( '../../../../../out/typescript_source/concrete/data/data_object/DataObject.js' );
const BasicConfig = require( '../../../../../out/typescript_source/config/BasicConfig.js' );
let dataObject = new DataObject.default( new BasicConfig.default());


// function checkExistence( result ) {
//     if ( result.length === 0 ) {
//         console.log( "test object does not exist." );
//     } else {
//         console.log( "test object exists.  deleting..." );
//         dataObject.deleteObject( id, checkExistence );
//     }
// }

// function checkresult( result ) {
//     console.log( "result: " + result );
//     if ( !result[ 0 ]) { console.log( "result is not defined!" ); return; }
//     let objectView = JSON.parse( result[ 0 ][ "object_data" ] );
//     if ( objectView.name === "test" ) {
//         console.log( "test passed" );
//     } else {
//         console.log( "test failed" );
//     }
    
// }
async function wait_for_insert( this_id, this_test_object ) {
    return dataObject.insertObject( this_id, this_test_object );
}

console.log( "checking for test object existence..." );

//dataObject.getObject( id, checkExistence );
let id = "test_id_101";
let test_object = { name: "test" };

// is it in the database already?

let object_string = JSON.stringify( test_object );
console.log( "object_string: " + object_string );
let selectObjectQuery = "select object_data from monitored_objects where object_view_id='" + id + "'";
console.log( "selectObjectQuery: " + selectObjectQuery );
console.log( "running query for object_data..." );
let results = dataObject.runSyncQuery( selectObjectQuery ).then( function( these_results ) {
    console.log( "results inside then: " + these_results );
    if ( these_results.length === 0 ) {
        console.log( "test object does not exist." );
        console.log( "inserting test object..." );
        //dataObject.insertObject( id, test_object );
    } else {
        console.log( "test object exists.  deleting..." );
        //dataObject.deleteObject( id, checkExistence );
        let deleteQuery = "delete from monitored_objects where object_view_id='" + id + "'";
        dataObject.runSyncQuery( deleteQuery ).then( function() {
            dataObject.runSyncQuery( selectObjectQuery ).then( function( check_delete_results ) {
                console.log( "check_delete_results: " + check_delete_results );
                if ( check_delete_results.length === 0 ) {
                    console.log( "test object deleted." );
                    console.log( "inserting test object..." );
                    //dataObject.insertObject( id, test_object );
                } else {
                    console.log( "test object not deleted." );
                    throw( Error( "*** ERROR: Can not delete test object. ***" ));
                }
            });
        });
    }
})
console.log( "results at end of test: " + results );


// console.log( "waiting for insert..." );
// result = wait_for_insert( id, test_object ).then( function( result ) {
//     console.log( "result: " + result );
// }).catch( function( error ) {
//     console.log( error );
// });
