/*
 * interface ArrayPopulator ( kind of an interface i guess.  need typescript, no time... )
 *
 * ArrayPopulator( *.populateArray(), argumentFor1stArgument )
 *
 */
import FileManager from "../FileManager";
import IPopulator from "../../abstract/IPopulator";

class ArrayPopulator implements IPopulator {
    private populator: IPopulator;
    private source: string;

    constructor( populatorArg: IPopulator, sourceArg: string ) {
        this.populator = populatorArg;
        this.source = sourceArg;
    }

    // for testing, i dont know how to pass args
    // to the constructor, so for now, just use these in testMe();

    setPopulator ( populatorArg: IPopulator ): void {
        this.populator = populatorArg;
    }
    setSource ( sourceArg: string ): void {
        this.source = sourceArg;
    }

    populateArray ( sourceArg: string ): string[] {
        return this.populator.populateArray( sourceArg );
    }

    testMe (): void {
        const errors = [];
        this.setPopulator( new FileManager() );
        const testArray = this.populateArray( "parsingTools/test.txt" );
        if ( testArray.length != 5 ) {
            errors.push( `*** ERROR: failed lenghth test.  length was expected to be 5.  got: ${ testArray.length } instead. ***` );
        } else {
            console.log( "ArrayPopulator passed array length test." );
        }

        if ( !testArray[ 0 ].includes( "first" ) ) {
            errors.push(
                "*** ERROR: first slot in array expected to contain " +
                ' "first" instead we got: ' +
                testArray[ 0 ] +
                " ***"
            );
        } else {
            console.log( "ArrayPopulator passes first index array test." );
        }

        if ( errors.length == 0 ) {
            console.log( "ArrayPopulator Object passsed all tests." );
        } else {
            errors.forEach( ( error ) => {
                console.error( error );
            } );
        }
    }
}

export default ArrayPopulator;
