import { wrap } from '../../utils';
import observedAttributesMonitorLed from './monitor-led.observed-attributes';

export const monitorLedDefine = () => customElements.define('monitor-led', wrap(()=>import('./monitor-led.component'), 'MonitorLed', observedAttributesMonitorLed));