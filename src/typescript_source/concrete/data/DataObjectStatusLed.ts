import IMonitorLedData from "../../abstract/IMonitorLedData";

/*
 * class DataObjectStatus
 */
class DataObjectStatus implements IMonitorLedData {
  constructor() {
    console.log("constructing DataObjectStatus object...");
  }

  ledText = "checking data object status...";
  classObject = {
    background_color: "yellow",
    text_align: "left",
    margin_top: "4px",
    color: "black",
  };
}

export default DataObjectStatus;
