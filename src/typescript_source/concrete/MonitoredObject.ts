import FetchRunner from "./FetchRunner.js";
import ILogObject       from "../abstract/ILogObject";
import LogObjectFactory from "./LogObjectFactory";
import Model            from "./Model";
import MonitorLed       from "./MonitorLed";
import SourceData       from "./SourceData.js";
/** @class  MonitoredObject */
export default class MonitoredObject {
    object_view_id:     string;
    logObjects:         ILogObject[];
    model:              Model;
    logObjectFactory:   LogObjectFactory;
    monitorLed:         MonitorLed;
    constructor( config: { new_id: string, data_source_location: string; } ) {
        this.object_view_id    = `${ this.constructor.name }_${ config.new_id }`;
        this.logObjects        = [];
        this.model             = new Model( new SourceData({ Runner: FetchRunner, url: config.data_source_location }));
        this.logObjectFactory  = new LogObjectFactory();
        this.monitorLed        = new MonitorLed();
        const data_config        = { object_view_id: this.object_view_id, object_data: JSON.stringify( this )};
        this.model.insertObject( data_config, this ); } // xtra line of code, but more readable

    logUpdate( message : string ) {
        if ( !this.object_view_id ) {  console.log( "*** ERROR: object needs an id to log. ***" ); return; }
        if ( message.includes( "ERROR" )) { this.monitorLed.setFail( message ); }
        this.logObjects.push( this.logObjectFactory.createLogObject( message, this                   ));
        const data_config = { object_view_id: this.object_view_id, object_data: JSON.stringify( this )};
        this.model.updateObject( data_config, this                                                   ); }

    processQueryResult( _event: any, results: { data: string | any[]; } ) { if ( results.data.length > 0 ) { console.log( results.data ); }}
    getObjectViewId() { return this.object_view_id; }
}
