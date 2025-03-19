import { notificationMutations } from '../components/notification/notification.controller';
import { messageTemplateMutations } from '../components/messageTemplate/messageTemplate.controller';
import { languageMutations } from '../components/language/language.controller';
import { messageMutations } from '../components/message/message.controller';

const Mutation = {
  ...notificationMutations,
  ...messageTemplateMutations,
  ...languageMutations,
  ...messageMutations,
};

export default Mutation;
