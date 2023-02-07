/*
 *	DataSource class
 */
import jQuery from "jquery";
import IDataObject from "../../abstract/data/IDataObject";
import ITestable from '../../abstract/ITestable';

class DataSource implements IDataObject, ITestable {
    private static _instance: DataSource = new DataSource();
    url = "https://mycustombusinessapp.com/wp-content/plugins/MCBA-Wordpress/runQuery.php";

    constructor() {
        if ( DataSource._instance ) {
            throw new Error(
                "Error: Instantiation failed: Use SingletonClass.getInstance() instead of new."
            );
        }
        DataSource._instance = this;
    }

    public static getInstance (): DataSource { return DataSource._instance; }

    runQuery ( apiArgs: any ): void {
        jQuery.post( this.url, { sql: apiArgs.query } ).done( function ( dataArg ) {
            apiArgs.data = JSON.parse( dataArg );
            jQuery( document ).trigger( apiArgs.queryResultProcessor, apiArgs );
        } );
    }

    public testMe (): void {
        const errors = new Array<string>();
        jQuery( document ).off().one( "insertedObject", insertedObject );
        const args = {
            query: "insert into monitored_objects( object_view_id, object_data ) values ( '100', 'test data' )",
            queryResultProcessor: "insertedObject",
            data: this
        };
        console.log( "running query: " + args.query );
        this.runQuery( args );

        function insertedObject () {
            console.log( "insertObject called." );
            args.query = "select object_data from monitored_objects where object_view_id='100'";

        }


        if ( errors.length == 0 ) {
            console.log( "DataSource Object passed all tests." );
        } else {
            errors.forEach( ( error ) => {
                console.error( error );
            } );
        }
    }
}

export default DataSource;
