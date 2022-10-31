import html from './accordion-section.html';
import style from './styles/main.css';
import { Component } from "@/utils";

@Component({ html: html, style: style, properties: [ "object_id", "data_source_location" ]})
export class AccordionSection implements IWebComponent {
    [x: string]: any;
    
    monitored_object_id  :string | null = "";
    data_source_location :string | null = "";
    
    static observedAttributes(){} // return an array containing the names of the attributes you want to observe
	
    constructor( private $el: HTMLElement, private $host: Element ) {
        console.log( "constructing accordion..." );
        this.monitored_object_id = $host.getAttribute( "monitored_object_id" );
        this.data_source_location = $host.getAttribute( "data_source_location" );
        console.log( "monitored_object_id: " + this.monitored_object_id );
        let name_split = this.monitored_object_id?.split( "_" );
        let numeral_id = name_split![ 1 ];
        let kebob_name = this.kebabize( name_split![ 0 ] );
        this.sourceHtmlText = this.sourceHtmlText?.
            replaceAll( "{{ kebob_name }}", kebob_name  ).
            replaceAll( "{{ numeral_id }}", numeral_id  ).
            replaceAll( "{{ monitored_object_id }}" , this.monitored_object_id  ).
            replaceAll( "{{ data_source_location }}", this.data_source_location );
    }

    /**
     * Invoked each time the custom element is appended into a document-connected element.
     * This will happen each time the node is moved, and may happen before the element's contents have been fully parsed.
     */
    connectedCallback() {
        console.log( 'accordion-section connected' );
        console.log( "monitored_object_id: " + this.monitored_object_id );
        let name_split = this.monitored_object_id?.split( "_" );
        let numeral_id = name_split![ 1 ];
        let kebob_name = this.kebabize( name_split![ 0 ] );
    
        let led_listen_event = `event-${ kebob_name}-${numeral_id}`;
        let accordion_color = `accordion-color-${ kebob_name}-${numeral_id}`;
        let accordion_text  = `accordion-text-${ kebob_name}-${numeral_id}`;
        document.addEventListener( led_listen_event,  ( event: any ) => {
                let accordion_background_element = event.detail.noisy_component.$host.parentElement.previousElementSibling;
                if ( !accordion_background_element ) { throw ( Error( "*** ERROR: element not defined! ***" ) ); }
                console.log( "*** accordion-section: event received: " + led_listen_event );
                accordion_background_element!.style.backgroundColor = event.detail.monitorLed.classObject.background_color;
                event.detail.noisy_component.$host.parentElement.style.backgroundColor = event.detail.monitorLed.classObject.background_color;
                let accordion_text_element = event.detail.noisy_component.$host.parentElement.previousElementSibling.firstElementChild.nextElementSibling;
                if ( !accordion_text_element ) { throw ( Error( "*** ERROR: element not defined! ***" ) ); }
                accordion_text_element.innerHTML = event.detail.monitorLed.ledText;
            });

        setTimeout( () => {
            let accordion_element = this.$host;    
            accordion_element!.addEventListener( "click", ( click_event ) => {
                const accordion_section_clicked = click_event.currentTarget as HTMLElement;
                const panel = accordion_section_clicked.shadowRoot?.querySelector<HTMLElement>( ".panel" );
                if ( panel?.style.display === "block" ) {
                    panel.style.display = "none";
                } else {
                    if ( panel )
                    panel.style.display = "block"; }}); }, 1000 );
    }

    kebabize( str: string ) {
        return str.split('').map((letter, idx) => {
            return letter.toUpperCase() === letter
            ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
            : letter; }).join(''); }

    /** Invoked each time the custom element is disconnected from the document's DOM. */
    disconnectedCallback() { console.log( 'accordion-section disconnected' ); }
    adoptedCallback() {      console.log( 'accordion-section moved'        ); }

    /**
     * Invoked each time one of the custom element's attributes is added, removed, or changed.
     * Which attributes to notice change for is specified in a static get observedAttributes method
     *
     * @param name
     * @param oldValue
     * @param newValue
     */
    attributeChangedCallback(name: string, oldValue: any, newValue: any ) {
        const nameProp = name.replace( /-[a-zA-Z]/g, ( found: string) => found.slice(1).toUpperCase());
        ( this as any )[ nameProp ] = newValue;
    }
}

// Ref.: https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements
