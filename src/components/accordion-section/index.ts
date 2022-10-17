import { wrap } from '../../utils';
import observedAttributesAccordionSection from './accordion-section.observed-attributes';

export const accordionSectionDefine = () => customElements.define('accordion-section', wrap(()=>import('./accordion-section.component'), 'AccordionSection', observedAttributesAccordionSection));