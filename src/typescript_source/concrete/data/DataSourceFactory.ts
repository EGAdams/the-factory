/*
 *  class DataSourceFactory
 */
class DataSourceFactory {
  private constructor() {
    console.log( "constructing DataSourceFactory..." );
  }

  static getDataSource(): string {
    return "the data source is a string";
  }
}

export default DataSourceFactory;
