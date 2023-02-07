import IObserver from "../../abstract/IObserver";
import ISubject from '../../abstract/ISubject';
import MonitoredObjectsTableUpdater from './MonitoredObjectsTableUpdater';
/**
 *
 *  @description
 *  This is an observer of a monitored object.  When the monitored
 *  object calls it's notify() method, it will trigger this object 
 *  to update the information in the monitored object database.  
 *
 *  @export
 *  @class DatabaseObserver
 *  @implements {IObserver}
 */
export default class DatabaseObserver implements IObserver {
    private subject: ISubject;
    private tableUpdater = new MonitoredObjectsTableUpdater();
    private id = "0";  // initialize to zero, but store fresh id after construction
    
    constructor( subjectArg: ISubject ) { 
        console.log( `constructing database observer...`);
        this.subject = subjectArg;  // because update(): void takes no arguments according to GoF
    }

    /**
     *  @method update
     *  @description
     *  Writes the stringified, presumably freshly updated 
     *  Subject into the database.
     * 
     *  @memberof DatabaseObserver
     */
    update(): void { this.tableUpdater.update( this.subject, this.id ); }
}
