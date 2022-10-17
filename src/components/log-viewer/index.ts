import { wrap } from '../../utils';
import observedAttributesLogViewer from './log-viewer.observed-attributes';

export const logViewerDefine = () => customElements.define('log-viewer', wrap(()=>import('./log-viewer.component'), 'LogViewer', observedAttributesLogViewer));