import IPopulator from "../abstract/IPopulator";
import FileManager from "../concrete/FileManager";
import INameRegexPair from "../abstract/INameRegexPair";
import IRawRegexStringPair from "../abstract/IRawRegexStringPair";
/**
 * @description 
 *  this object is used to find any string of interest in an array of strings.
 *  it was originally designed to pull a list of targeted regular expressions
 *  for processing HUGE, browser crashing log files.  I was working on a java
 *  version of this before they hauled me out of FPL like a criminal in 2016.
 *  That's when they stole my monitoring ideas and left me on the streets.
 *  been homeless ever since...
 * 
 * @class Regex
 */
class Regex {
    regexClip: Array<IRawRegexStringPair> = [];
    tempArray: Array<string> = []; // holds lines of text from regex.txt file

    constructor( populator: IPopulator, regex_source_file: string ) {
        console.log( "constructing Regex object..." );
        if ( populator ) {
            this.regexClip = new Array<IRawRegexStringPair>();
            this.regexClip.length = 0;
            this.tempArray = [];

            // regex clip holds an array of objects
            // that define a matchedString, ie: name of
            // regex, reg expresion, group info, etc...
            this.fillClip( populator.populateArray( regex_source_file ) );
        }
    }

    /**
     *
     * @method fillClip
     * @private
     * @param {string[]} raw_regex_source_file_array
     * @memberof Regex
     */
    private fillClip ( raw_regex_source_file_array: string[] ): void {
        for ( const line in raw_regex_source_file_array ) {
            if ( raw_regex_source_file_array[ line ].includes( "<--*-->" ) ) {
                this.tempArray = raw_regex_source_file_array[ line ].split( "<--*-->" );
                const bullet = {} as IRawRegexStringPair;
                bullet.name = this.tempArray[ 0 ];
                bullet.regex_string = this.tempArray[ 1 ];
                this.regexClip.push( bullet );
                this.tempArray = []; // clear temp array for next iteration.  may not need this
            }
        }
    }

    public matchedString ( line: string ): boolean | INameRegexPair {
        for ( const bullet of this.regexClip ) {
            const match = line.match( bullet.regex_string ); // creates Regex object
            if ( match ) {
                const nameRegexPair = {} as INameRegexPair;
                nameRegexPair.name = bullet.name; // match[ 1 ];
                nameRegexPair.regex = match;
                return nameRegexPair;
            }
        }
        return false;
    }

    public testMe (): void {
        const errors = [];
        const populator = new FileManager();
        const regex = new Regex( populator, "parsingTools/testRegex.txt" );
        const testLine = "ok: [acp] => {";

        const result = regex.matchedString( testLine ) as INameRegexPair;
        if ( result.name.includes( "alertCustomerName" ) ) {
            console.log( "Regex passes regex name test." );
        } else {
            errors.push( "*** ERROR: Regex fails regex name test. ***" );
        }

        if ( result.regex.includes( "ok: \\[(\\w+)\\] =>" ) ) {
            console.log( "Regex passes regex regex text test." );
        } else {
            errors.push( "*** ERROR: Regex fails regex regex text test. ***" );
        }

        if ( result.name == "acp" ) {
            console.log( "Regex passes customer match test." );
        } else {
            errors.push( "*** ERROR: Regex fails customer match test" );
        }

        if ( errors.length == 0 ) {
            console.log( "Regex Object passsed all tests." );
        } else {
            errors.forEach( ( error ) => {
                console.error( error );
            } );
        }
    }
}

export default Regex;
