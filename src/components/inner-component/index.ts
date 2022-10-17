import { wrap } from '../../utils';
import observedAttributesInnerComponent from './inner-component.observed-attributes';

export const innerComponentDefine = () => customElements.define('inner-component', wrap(()=>import('./inner-component.component'), 'InnerComponent', observedAttributesInnerComponent));