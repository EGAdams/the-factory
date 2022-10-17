interface IWebComponent {
    connectedCallback()       :void;
    disconnectedCallback()    :void;
    adoptedCallback()         :void;
    attributeChangedCallback( name: string, oldValue: any, newValue: any ): void;
}

 // this was a suggestion and it looks like it should work.
 //  im just wondering why it doesn't.  not getting this .d.ts thing yet...
 interface String {
    replaceAll(input: string, output : string): any;
}
