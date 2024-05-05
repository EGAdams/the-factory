/** @interface ISourceQueryConfig */
/**
 * @interface ISourceQueryConfig 
 * Defines the shape of an object to configure queries to a data source.
 * 
 * @property {string} object_view_id - An identifier for the view or subset of data to query
 * 
 * @property {any} object_data - Additional data needed for the query
 * 
 * @returns {ISourceQueryConfig} - The interface definition for the config object shape
 * 
 * This allows creating a config object matching this shape and passing to query methods.
 * The methods can rely on the defined properties to configure the query.
 * 
 * Usage:
 * 
 * interface QueryConfig implements ISourceQueryConfig {
 *   object_view_id: string; 
 *   object_data: any;
 * }
 * 
 * const config: QueryConfig = {
 *   object_view_id: 'users',
 *   object_data: {name: 'John'} 
 * }
 * 
 * dataSource.query(config)
 */
interface ISourceQueryConfig {
  object_view_id :string;
  object_data    :any;
}

export default ISourceQueryConfig;
