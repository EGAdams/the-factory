/*
 * class TableManager

 *    A ChangeManager has three responsibilities:
 * 
 *  1. It maps a subject to its observers and provides an interface
 *      to maintain this mapping. This eliminates the need for subjects to
 *      maintain references to their observers and vice versa.
 *
 *  2. It defines a particular update strategy.
 * 
 *  3. It updates all dependent observers at the request of a subject. 
 * 
 */
import DataSourceFactory from "./DataSourceFactory";
import IDataObject from "../../abstract/data/IDataObject";
import ISubject from "../../abstract/ISubject";

class TableManager {
    // dataSource: IDataObject;
    subjects: Array< ISubject > = [];

    constructor() {
        // this.dataSource = DataSourceFactory.getDataSource();
    }

    createObjectRow ( object_id: string ): void {
        const nextFunction = "checkResults";
        // create a new row in the monitored objects table  
    }

    checkResults (
        _event: unknown,
        results: { data: { error: string | string[] }; query: string }
    ): void {
        console.log(
            "checking results of table manager inserting new object row... "
        );
        if ( results.data.error ) {
            if ( results.data.error.includes( "Duplicate entry" ) ) {
                console.log(
                    "*** WARNING: duplicate entry in monitored objects table. ***"
                );
            } else {
                console.error(
                    "*** ERROR: while running query: " + results.query + " ***"
                );
            }
        }
    }
}

export default TableManager;

// https://youtu.be/Z6dIdJX4ens?t=185
