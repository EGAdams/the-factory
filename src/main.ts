import { wrap } from './utils';
import observedAttributesMonitorLed from './components/monitor-led/monitor-led.observed-attributes';
import observedAttributesHelloWorld from './components/hello-world/hello-world.observed-attributes';
import observedAttributesLogViewer from './components/log-viewer/log-viewer.observed-attributes';
import observedAttributesLogObject from './components/log-object/log-object.observed-attributes';
import observedAttributesInnerComponent from './components/inner-component/inner-component.observed-attributes';
import observedAttributesAccordionSection from './components/accordion-section/accordion-section.observed-attributes';

customElements.define( 'monitor-led' , wrap(()=>import( './components/monitor-led/monitor-led.component' ), 'MonitorLed', observedAttributesMonitorLed ));
customElements.define( 'hello-world' , wrap(()=>import( './components/hello-world/hello-world.component' ), 'HelloWorld', observedAttributesHelloWorld ));
customElements.define( 'log-viewer'  , wrap(()=>import( './components/log-viewer/log-viewer.component'   ), 'LogViewer' , observedAttributesLogViewer  ));
customElements.define( 'log-object'  , wrap(()=>import( './components/log-object/log-object.component'   ), 'LogObject' , observedAttributesLogObject  ));
customElements.define('inner-component', wrap(()=>import('./components/inner-component/inner-component.component'), 'InnerComponent', observedAttributesInnerComponent));
customElements.define('accordion-section', wrap(()=>import('./components/accordion-section/accordion-section.component'), 'AccordionSection', observedAttributesAccordionSection));
