import INameRegexPair from "./INameRegexPair";

/*
 *  interface IRegex
 *
 *  In this system, we either get back a boolean or an
 *  object with a name and a regex match.  The name that
 *  is returned in the case of a match is used to create
 *  a function that will be called to process the line of
 *  text that triggered the match.
 * 
 */
interface IRegex {
  matchedString( line: string ): boolean | INameRegexPair;
}

export default IRegex;
