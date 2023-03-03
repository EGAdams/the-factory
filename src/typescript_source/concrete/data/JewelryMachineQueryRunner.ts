import ITestable from '../../abstract/ITestable';
import IQueryRunner from "../../abstract/data/IQueryRunner";
import axios from "axios";
// import JewelryMachineQueryRunnerTest from "../../test/data/JewelryMachineQueryRunnerTest";
import IApiArgs from "../../abstract/data/IApiArgs";

/**
 * @description
 *  
 *  Sends the results of a query to the query result processor pointed to by the api argument object.
 * 
 *  In order to send the query, we use axios to establish communication.
 *  An object of this class uses axios to fire off the query that is included in the passed in api arguments.
 *  What is done with this data is determined by the queryResultProcessor that is sent in the api arguments.
 * 
 *  This is begging to be turned into a more generic class or interface.  The only thing specific about
 *  this class is the fact that it is using the jewelry machine for communication.
 *
 * @export
 * @class JewelryMachineQueryRunner
 * @implements {IQueryRunner}
 * @implements {ITestable}
 */
export default class JewelryMachineQueryRunner implements IQueryRunner, ITestable {
    url = "http://americansjewelry.com/test2/runQuery.php";

    constructor() { console.log( 'constructing JewelryMachineQueryRunner object...' ); }

    /**
     *
     *
     * @param {IApiArgs} apiArguments
     * @return {*}  {Promise<void>}
     * @memberof JewelryMachineQueryRunner
     */
    async runQuery ( apiArguments: IApiArgs ): Promise< void > {
        const queryResults = await axios.get( this.url, { params: { sql: apiArguments.query } } );
        apiArguments.queryResultProcessor.processQueryResult( queryResults );
    }
    
    /**
     *
     *
     * @memberof JewelryMachineQueryRunner
     */
    testMe (): void {
        // const test = new JewelryMachineQueryRunnerTest( this );
        // test.run();
    }
}

if ( typeof process != "undefined" ) {  // node runner.js testMe
    const theArguments = process.argv.slice( 2 );
    if ( theArguments.includes( "testMe" ) ) {
        const runner = new JewelryMachineQueryRunner();
        runner.testMe();
    }
}
