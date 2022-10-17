import html from './log-object.html';
import style from './styles/main.css';
import { Component } from "@/utils";

@Component({ html: html, style: style, properties: []})
export class LogObject implements IWebComponent {

    timestamp  :number =  0;
    method     :string = "";
    message    :string = "";
    
    $log_object_container !:HTMLElement;

    setMessage( message_arg :string ){ this.message = message_arg; }

    static observedAttributes(){} // return Array<String> of attributes you want to observe

    constructor( private $el: HTMLElement, private $host: Element ) {} // $el is the shadowRoot at this point
    
    cloneMe() { return this.$el.cloneNode( false ); }

    /**
     * Invoked each time the custom element is appended into a document-connected element.
     * This will happen each time the node is moved, and may happen before the element's contents have been fully parsed.
     */
    connectedCallback() {
        console.log( 'defining log-object inner html...' );
        this.$log_object_container = this.$el.querySelector( ".log-object-container" )!;
        this.$log_object_container.querySelector( ".timestamp" )!.innerHTML = this.timestamp.toString();
        this.$log_object_container.querySelector( ".method"    )!.innerHTML = this.method;
        this.$log_object_container.querySelector( ".message"   )!.innerHTML = this.message;
    }

    /** Invoked each time the custom element is disconnected from the document's DOM. */
    disconnectedCallback() { console.log( 'log-object disconnected' ); }
    adoptedCallback() {      console.log( 'log-object moved'        ); }

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
