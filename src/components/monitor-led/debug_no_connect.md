# Your role
- Expert Typescript Web Component developer
- My helpful assistant

# Your task
- Help me debug the reason why connectedCallback is not being called.

## Typescript Source
```ts
import html from './monitor-led.html';
import style from './styles/main.css';
import { Component } from "@/utils";
import ServerLedData from "@/typescript_source/concrete/ServerLedData";
import FetchRunner from "@/typescript_source/concrete/FetchRunner";
import SourceData from "@/typescript_source/concrete/SourceData";
import Model from "@/typescript_source/concrete/Model";
import IQueryResultProcessor from '@/typescript_source/abstract/IQueryResultProcessor';

@Component({ html: html, style: style, properties: []})
export class MonitorLed implements IWebComponent, IQueryResultProcessor {
    monitored_object_id  = "";
    data_source_location :string | null = "";
    monitor_led_data     :ServerLedData = new ServerLedData();

    // return an array containing the names of the attributes you want to observe.  Not sure why this is here yet.
    static observedAttributes () {}

    constructor( private $el: HTMLElement, private $host: Element ) {
        this.data_source_location = $host.getAttribute( "data_source_location" ) as string; }

    /**
     * Invoked each time the custom element is appended into a document-connected element.
     * This will happen each time the node is moved, and may happen before the element's contents have been fully parsed.
     */
    connectedCallback () {
        // this.logUpdate( 'monitor-led connected' );
        this.render().start();
    }

    render() { 
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
        // this.logUpdate( "monitor led component starting..." );
        let object_being_monitored = this.$host.getAttribute( "monitored_object_id"  ) as string;
        let source_query_config = { object_view_id: object_being_monitored, object_data: {}};
        let model               = new Model( new SourceData({ Runner: FetchRunner, url: this.data_source_location! }));
        setInterval(() => { model.selectObject( source_query_config, this ); }, 2500 ); }

    processQueryResult( callbackObject: MonitorLed, query_result: any ) {
        if( query_result.length < 15 || !JSON.parse( query_result ).object_data ) { return; }
        let data = JSON.parse( JSON.parse( query_result ).object_data );
        this.monitor_led_data = data.monitorLed;
        this.render();
        let object_being_monitored = this.$host.getAttribute( "monitored_object_id"  ) as string;
        let the_number_part = object_being_monitored.match( /\d+/ )![0]!;
        let the_name_part   = object_being_monitored.replace( "_" + the_number_part, ""); 
        const event_name = "event-" + this.kebabize( the_name_part ) + "-" + the_number_part;
        data.noisy_component = this;
        let led_event = new CustomEvent( event_name, { bubbles: true, detail: data });
        document.dispatchEvent( led_event); }
    
    kebabize( str: string ) {
        return str.split('').map((letter, idx) => {
            return letter.toUpperCase() === letter
            ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
            : letter;
    }).join(''); }
}
```

## HTML Source
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>TypeScript Web Component</title>
    <style></style>
</head>
<body>
    <script src="./dist/bundle.js"></script>
    <monitor-led class=""
        monitored_object_id="MessageManager_2021" 
        data_source_location="https://americansjewelry.com/libraries/local-php-api/index.php/">
    </monitor-led>
</body>
</html>
```

## gpt-4 answer
https://chat.openai.com/share/376bbee1-27c9-4660-94cb-aa1889a3ca55
