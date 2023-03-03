/*
 * class FileManager
 *
 *  populateArray()  takes a path for a string and populates an array
 *                   from the contents of the text in the file that the
 *                   path points to.
 */
import * as filesystem from "fs";
import IPopulator from "../abstract/IPopulator";

class FileManager implements IPopulator {
    constructor() {
        console.log( "constructing FileManager... " );
    }

    public populateArray ( path: string ): string[] {
        console.log( "reading source file in " + path + "..." );
        return filesystem
            .readFileSync( path )
            .toString()
            .replace( /\r\n/g, "\n" )
            .split( "\n" );
    }

    getCommands ( path: string ): string[] {
        return filesystem.readFileSync( path ).toString().split( "\n" );
    }

    public testMe (): void {
        const errors = [];
        const testArray = this.populateArray( "parsingTools/test.txt" );
        if ( testArray.length != 5 ) {
            errors.push(
                "*** ERROR: failed length test. " +
                " length was expected to be 5.  got: " +
                testArray.length +
                " instead. ***"
            );
        } else {
            console.log( "FileManager passed array length test." );
        }

        if ( !testArray[ 0 ].includes( "first" ) ) {
            errors.push(
                "*** ERROR: first slot in array expected to contain " +
                ' "first" instead we got: ' +
                testArray[ 0 ] +
                " ***"
            );
        } else {
            console.log( "FileManager passes first index array test." );
        }

        if ( errors.length == 0 ) {
            console.log( "FileManager Object passed all tests." );
        } else {
            errors.forEach( ( error ) => {
                console.error( error );
            } );
        }
    }
}

export default FileManager;
