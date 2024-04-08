import IMonitoredObjectConfig from "../../../abstract/IMonitoredObjectConfig";
import MonitoredObject from "../../MonitoredObject";

/**
 *  @class CommandExecutorLogger
 * 
 *  @description
 *  a logger for the CommandExecutor.
 * 
 */
 export default class CommandExecutorLogger extends MonitoredObject {
	constructor(config: IMonitoredObjectConfig) { super(config); }
 }
 