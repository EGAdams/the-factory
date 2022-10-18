// this._attrArr.push( { "name": prop, "oldValue": "", "newValue": ( this._originalComp as any )[ prop ] });
console.log( `prop written, new value: ${ logObjects } log length: ${ this.log_length }` );
if ( logObjects.length !== this.log_length ) { 
    console.log( "length changed! "); 
    this.log_length = logObjects.length;
    this.displayLogObjects( logObjects );
}

/**
 * October 18, 2022
 * 
 * When changing to response.text() we get rid of the unacceptable json error,
 * but we need to do things like JSON.parse( JSON.parse( query_result ).object_data )
 * because query_result is now text.
 * 
 * now to get insert object working...
 * 
 */
