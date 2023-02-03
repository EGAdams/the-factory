import IQueryProcessor from './IQueryResultProcessor';
/*
 *  interface IApiArgs
 */
interface IApiArgs {
    data: unknown;
    queryResultProcessor: IQueryProcessor;
    query: string;
}

export default IApiArgs;
