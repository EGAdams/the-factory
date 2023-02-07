import DataSource from "./DataSource";

/*
 *  class DataSourceFactory
 */
class DataSourceFactory {
  private constructor() {
    console.log("constructing DataSourceFactory...");
  }

  static getDataSource(): DataSource {
    return DataSource.getInstance();
  }
}

export default DataSourceFactory;
