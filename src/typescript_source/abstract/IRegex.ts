import INameRegexPair from "./INameRegexPair";

/*
 *  interface IRegex
 */
interface IRegex {
  matchedString(line: string): boolean | INameRegexPair;
}

export default IRegex;
