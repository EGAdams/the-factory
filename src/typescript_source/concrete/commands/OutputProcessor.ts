import FileManager from "../FileManager";
import ArrayPopulator from "./ArrayPopulator";
import ICommandObject from "../../abstract/ICommandObject";
import IRegex from "../../abstract/IRegex";
import INameRegexPair from "../../abstract/INameRegexPair";
import Regex from "../../concrete/Regex";
import LsCommand from "./ls_command/LsCommand";
import IMonitoredObject from "../../abstract/IMonitoredObject";
import LoggerFactory from "../../concrete/logger/LoggerFactory";

/** @class OutputProcessor */
class OutputProcessor {
    logger: IMonitoredObject | undefined;
    constructor() {
        console.log( "constructing OutputProcessor..." );
        this.getMyLogger().then( ( loggerArg: any ) => {
            this.logger = loggerArg;
            this.logger?.logUpdate( this.constructor.name + "Logger constructed." )
        } )
    }

    private async getMyLogger () {
        let logger = await LoggerFactory.getLogger( this.constructor.name + "Logger" );
        return logger;
    }

    async processOutput ( commandObjectArg: ICommandObject, regexArg: IRegex ): Promise<void> {
        const ConcreteProcessor = await import( "." + commandObjectArg.outputProcessor );
        const concreteProcessor = new ConcreteProcessor.default();
        concreteProcessor.commandObject = commandObjectArg;
        const rawArray = commandObjectArg.output;
        for ( const index in rawArray ) {
            const line = rawArray[ index ];
            // console.log( "line: [" + line + "]" );
            const matchedRegex: INameRegexPair | boolean = regexArg.matchedString( line );
            if ( typeof matchedRegex != "boolean" ) {
                if ( matchedRegex.name ) {
                    // call the processors method with the regex name.
                    // it already has output[], just need index into the
                    // raw array and the Regex object that matched.

                    await concreteProcessor[ matchedRegex.name ]( matchedRegex, index );
                } else {
                    const errmsg = "*** ERROR: Regex object returned a matched string without a name! ***";
                    console.log( errmsg );
                    throw errmsg;
                }
            }
        }

        if ( !commandObjectArg.processedOutput ) {
            commandObjectArg.processedOutput =
                "no output processed by " + commandObjectArg.outputProcessor + ".  just sayin.";
        }
    }

    async testMe (): Promise<void> {
        const errors = [] as string[];
        const fileManager = new FileManager();
        const populator = new ArrayPopulator(
            fileManager,
            "parsingTools/LsRegex.txt"
        );
        // regex needs a populator to fill it's clip.  populators have a populateArray() method.
        const regex = new Regex( populator, "parsingTools/LsRegex.txt" );

        // regardless of the processor type, we need a fresh array here.
        // any kind of output processor needs example output text for the test.

        const freshArray = fileManager.populateArray(
            "../../test/OutputProcessorTest.txt"
        );

        const commandObject = new LsCommand();
        commandObject[ "output" ] = freshArray; // this is what happens in real life.
        this.processOutput( commandObject, regex );
        if ( commandObject.processedOutput ) {
            console.log( "OutputProcessor passed processed output length test." );
        } else {
            errors.push( "*** ERROR: OutputProcessor fails output exists test. ***" );
        }
        if ( errors.length == 0 ) {
            console.log( "OutputProcessor Object passed all tests." );
        } else {
            errors.forEach( ( error ) => {
                console.error( error );
            } );
        }
    }
}
export default OutputProcessor; // don't forget this!
