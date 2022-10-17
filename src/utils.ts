interface IWebComponentDecorated extends IWebComponent { sourceHtmlText : string, sourceStyleText: string }
interface OriginalComponentClassType { observedAttributes: Array< string >; new( ...args: any[] ): IWebComponentDecorated }
interface AttributeValue { name: string, oldValue: string, newValue: string }

export function wrap ( importComponent: () => Promise<any>, className: string, observedAttributes: Array< string > ) {
    
    class CustomComponent extends HTMLElement {

        private _newComponentInstance: IWebComponentDecorated = {} as IWebComponentDecorated;
        private _connected = false;
        private _componentConstructor: OriginalComponentClassType = {} as OriginalComponentClassType;
        private _changedAttributes = false;
        private _attrArr: Array< AttributeValue > = [];

        static originalObservedAttributes: any;

        static get observedAttributes (): Array< string > { return observedAttributes; }

        constructor() {
            super();
            const shadow = this.attachShadow({ mode: 'open' });
            importComponent().then(( component ) => {
                this._componentConstructor = component[ className ];
                this._newComponentInstance = new this._componentConstructor( shadow, shadow.host );
                this._componentConstructor.prototype?.properties?.forEach(( componentPrototypeProperty: string ) => {
                    Object.defineProperty( this, componentPrototypeProperty, {
                        get: (     ) => { return ( this._newComponentInstance as any )[ componentPrototypeProperty ]      ; },
                        set: ( val ) => { (        this._newComponentInstance as any )[ componentPrototypeProperty ] = val; },
                    }); });

                shadow.innerHTML = this._newComponentInstance!.sourceHtmlText;
                const firstChild = shadow.firstChild;

                const styleTag = document.createElement( 'style' ) ;
                styleTag.innerHTML = this._newComponentInstance?.sourceStyleText;

                shadow.insertBefore( styleTag, firstChild );

                if ( this._connected ) {
                    this._newComponentInstance.connectedCallback();
                    if ( !this._changedAttributes ) {
                        this._attrArr.forEach(( attr: AttributeValue ) => this._newComponentInstance?.attributeChangedCallback( attr.name, attr.oldValue, attr.newValue ) );
                        this._changedAttributes = true;
                    }
                }
                this.dispatchEvent( new Event( 'ready' ) );
            });
        }

        connectedCallback() {    this._connected = true;                             }
        disconnectedCallback() { this._newComponentInstance?.disconnectedCallback(); }
        adoptedCallback () {     this._newComponentInstance?.adoptedCallback();      }

        attributeChangedCallback ( name: string, oldValue: any, newValue: any ) {
            if ( !this._changedAttributes ) {
                this._attrArr.push({ name, oldValue, newValue });
            }
            else {
                this._newComponentInstance?.attributeChangedCallback( name, oldValue, newValue );
            }
        }
    }
    return CustomComponent; }

type MetaDataComponent = { html?: string, style?: string, properties?: Array< string > };

export function Component ( meta: MetaDataComponent ) {
    return ( target: Function ) => {
        target.prototype.sourceHtmlText  = meta?.html  || '';
        target.prototype.sourceStyleText = meta?.style || '';
        target.prototype.properties = meta?.properties || [];

        // Ref.: https://gist.github.com/remojansen/16c661a7afd68e22ac6e

        // // save a reference to the original constructor
        // var original = target;
        //
        // // a utility function to generate instances of a class
        // const construct = (constructor: Function, args: any) => {
        //     let c : any = function () {
        //         return constructor.apply(this, args);
        //     }
        //     c.prototype = constructor.prototype;
        //     return new c();
        // }
        //
        // // the new constructor behaviour
        // var f : any = function (...args: any) {
        //     console.log("New: " + original.name);
        //     return construct(original, args);
        // }
        //
        // // copy prototype so intanceof operator still works
        // f.prototype = original.prototype;
        //
        // // return new constructor (will override original)
        // return f;
    };
}
