import html from './monitor-led.html';
import style from './styles/main.css';
import { Component } from "@/utils";
import ServerLedData from "@/typescript_source/concrete/ServerLedData";
import FetchRunner from "@/typescript_source/concrete/FetchRunner";
import SourceData from "@/typescript_source/concrete/SourceData";
import MonitoredObject from "@/typescript_source/concrete/MonitoredObject";
import Model from "@/typescript_source/concrete/Model";
import IQueryResultProcessor from '@/typescript_source/abstract/IQueryResultProcessor';

@Component({ html: html, style: style, properties: []})
export class MonitorLed extends MonitoredObject implements IWebComponent, IQueryResultProcessor {

    monitored_object_id  :string = "";
    data_source_location :string = "";
    monitor_led_data     :ServerLedData = new ServerLedData();

    // return an array containing the names of the attributes you want to observe.  Not sure why this is here yet.
    static observedAttributes () {}

    constructor( private $el: HTMLElement, private $host: Element ) { super( { new_id: "", data_source_location: "" }); }

    /**
     * Invoked each time the custom element is appended into a document-connected element.
     * This will happen each time the node is moved, and may happen before the element's contents have been fully parsed.
     */
    connectedCallback () {
        this.monitored_object_id  = document.querySelector( "monitor-led" )?.getAttribute( "monitored_object_id"  ) as string;
        this.data_source_location = document.querySelector( "monitor-led" )?.getAttribute( "data_source_location" ) as string;
        console.log( 'monitor-led connected' );
        this.render().start();
    }

    render() { console.log( "render called." ); 
        this.$el.innerHTML = `
        <div class="monitor-led">${ this.monitor_led_data.ledText }</div>
        `;
        let monitor_led = this.$el.querySelector< HTMLElement >( '.monitor-led' ); 
        monitor_led!.style.backgroundColor = this.monitor_led_data.classObject.background_color;
        monitor_led!.style.textAlign       = this.monitor_led_data.classObject.text_align;
        monitor_led!.style.marginTop       = this.monitor_led_data.classObject.margin_top;
        monitor_led!.style.color           = this.monitor_led_data.classObject.color;
        return this;
    }

    /** Invoked each time the custom element is disconnected from the document's DOM. */
    disconnectedCallback () { console.log( 'monitor-led disconnected' ); }

    /** Invoked each time the custom element is moved to a new document. */
    adoptedCallback () {  console.log( 'monitor-led moved' ); }

    /**
     * Invoked each time one of the custom element's attributes is added, removed, or changed.
     * Which attributes to notice change for is specified in a static get observedAttributes method
     *
     * @param name
     * @param oldValue
     * @param newValue
     */
    attributeChangedCallback ( name: string, oldValue: any, newValue: any ) {
        const nameProp = name.replace( /-[a-zA-Z]/g, ( found: string ) => found.slice( 1 ).toUpperCase() );
        ( this as any )[ nameProp ] = newValue;
    }

    start() {
        let source_query_config = { object_view_id: this.monitored_object_id, object_data: {}};
        let model               = new Model( new SourceData({ Runner: FetchRunner, url: this.data_source_location }));
        setInterval(() => { model.selectObject( source_query_config, this ); }, 2500 ); }

    processQueryResult( callbackObject: MonitorLed, query_result: any ) {
        if( !query_result || !query_result.object_data ) { return; }
        let data = JSON.parse( query_result.object_data );
        callbackObject.monitor_led_data = data.monitorLedData;
        callbackObject.render();
        const event_name = "event-" + callbackObject.kebabize( data.construction_name ) + "-" + data.object_id;
        let led_event = new CustomEvent( event_name, { bubbles: true, detail: data });
        document.dispatchEvent( led_event); } // this.$emit( 'led-data', data.monitorLedData ); doesn't work! 
    
    kebabize( str: string ) {
        return str.split('').map((letter, idx) => {
            return letter.toUpperCase() === letter
            ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
            : letter;
    }).join(''); }
}

// Ref.: https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements