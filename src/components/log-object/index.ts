import { wrap } from '../../utils';
import observedAttributesLogObject from './log-object.observed-attributes';

export const logObjectDefine = () => customElements.define('log-object', wrap(()=>import('./log-object.component'), 'LogObject', observedAttributesLogObject));