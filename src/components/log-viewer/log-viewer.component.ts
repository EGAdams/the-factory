import html from './log-viewer.html';
import style from './styles/main.css';
import { Component } from "@/utils";
import ILogObject from '@/typescript_source/abstract/ILogObject';
import { LogObjectContainerSource } from '@/typescript_source/concrete/LogObjectContainerSource';
import { SourceConfig } from '@/typescript_source/concrete/SourceConfig';

@Component({ html: html, style: style, properties: [ "logs" ]})
export class LogViewer implements IWebComponent {
    static observedAttributes() {} // return an array containing the names of the attributes you want to observe
    
    $log_viewer_container  !: HTMLElement;      //   <div class="screen-area"> 
	$object_name_header    !: HTMLElement;      //       <h1 class="object-name"></h1>
	$list_of_log_objects   !: HTMLElement;      //       <div class="list-of-log-objects"></div>
    $cloneable_log_object  !: HTMLElement;      //       <log-object class="cloneable-log-object">terminal ready.
                                                //       <!-- clone me --></log-object>
                                                //   </div>
    object_name:          string       = "";  
    // logs:                 ILogObject[] = [];
    monitored_object_id:  string       = "";
    data_source_location: string       = "";
    log_length:           number       =  0;
    logObjectContainerSource!: LogObjectContainerSource;
    
    

    get logs() {
        console.log( 'logs read' );
        return [];
    }
    
    set logs( logObjects: ILogObject[]) {
        console.log('prop written, new value', logObjects );
        if ( logObjects.length !== this.log_length ) { 
            console.log( "length changed! "); 
            this.log_length = logObjects.length;
            this.displayLogObjects( logObjects, this );
        }
    }  
    constructor( private $el: HTMLElement, private $host: Element ) {}

    /**
     * Invoked each time the custom element is appended into a document-connected element.
     * This will happen each time the node is moved, and may happen before the element's contents have been fully parsed.
     */
    connectedCallback() {
        console.log( 'defining log viewer elements...' );
        this.$log_viewer_container = this.$el.querySelector(                   ".screen-area"          )!;
        this.$object_name_header   = this.$log_viewer_container.querySelector( ".object-name"          )!;
        this.$list_of_log_objects  = this.$log_viewer_container.querySelector( ".list-of-log-objects"  )!;
        this.monitored_object_id   = document.querySelector( "log-viewer" )?.getAttribute( "monitored_object_id"  ) as string;
        this.data_source_location  = document.querySelector( "log-viewer" )?.getAttribute( "data_source_location" ) as string;
        this.$object_name_header.innerHTML = this.monitored_object_id;
        const logObjectSourceConfiguration = new SourceConfig( "url", this.data_source_location, this.monitored_object_id );
        this.logObjectContainerSource      = new LogObjectContainerSource( logObjectSourceConfiguration );
        this.start();
    }

    disconnectedCallback() { console.log( 'log-viewer disconnected' ); }
    adoptedCallback() {      console.log(      'log-viewer moved'   ); }

    /**
     * Invoked each time one of the custom element's attributes is added, removed, or changed.
     * Which attributes to notice change for is specified in a static get observedAttributes method
     *
     * @param name
     * @param oldValue
     * @param newValue
     */
    attributeChangedCallback( name: string, oldValue: any, newValue: any ) {
        const nameProp = name.replace( /-[a-zA-Z]/g, ( found: string ) => found.slice( 1 ).toUpperCase() );
        ( this as any )[ nameProp ] = newValue; }

    start() {
        setInterval(() => { 
            console.log( "refreshing logs... " );
            this.logObjectContainerSource.refresh();
            this.logs = this.logObjectContainerSource.logObjectProcessor.getWrittenLogs(); }, 1000 ); }

    displayLogObjects( logObjects: ILogObject[], logViewer: LogViewer ) {
        console.log( "displaying log objects..." );
        logObjects.forEach( log_object => {
            let formatted_time_stamp = new Date( log_object?.timestamp ).toLocaleString()
            let li_inner_html = `
                <div class="log-object-container">
                    <div class="timestamp">${ formatted_time_stamp }</div>
                    <div class="method"   >${ log_object.method    }</div>
                    <div class="message"  >${ log_object.message   }</div>
                </div>`;
            let $new_list_element = document.createElement( 'li' );
            $new_list_element.innerHTML = li_inner_html;
            this.$list_of_log_objects.appendChild( $new_list_element );
        });
    }
}

// Ref.: https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements