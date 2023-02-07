import { wrap } from '../../utils';
import observedAttributesConversationList from './conversation-list.observed-attributes';

export const conversationListDefine = () => customElements.define('conversation-list', wrap(()=>import('./conversation-list.component'), 'ConversationList', observedAttributesConversationList));