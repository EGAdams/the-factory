/*
 *  interface IQueryRunner
 */
import IApiArgs from "./IApiArgs";

interface IQueryRunner {
    runQuery( apiArguments: IApiArgs ): void;
}

export default IQueryRunner;
