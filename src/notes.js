// this._attrArr.push( { "name": prop, "oldValue": "", "newValue": ( this._originalComp as any )[ prop ] });
console.log( `prop written, new value: ${ logObjects } log length: ${ this.log_length }` );
if ( logObjects.length !== this.log_length ) { 
    console.log( "length changed! "); 
    this.log_length = logObjects.length;
    this.displayLogObjects( logObjects );
}