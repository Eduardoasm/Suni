import { notificationQueries } from '../components/notification/notification.controller';
import { messageTemplateQueries } from '../components/messageTemplate/messageTemplate.controller';
import { languageQueries } from '../components/language/language.controller';
import { messageQueries } from '../components/message/message.controller';

const Query = {
  ...notificationQueries,
  ...messageTemplateQueries,
  ...languageQueries,
  ...messageQueries,
};

export default Query;
