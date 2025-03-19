/* eslint-disable import/newline-after-import */
/* eslint-disable import/first */
import fs from 'fs';
import path from 'path';
import { schemaComposer } from 'graphql-compose';

import Query from './Query';
import Mutation from './Mutation';

schemaComposer.Query.addFields({
  ...Query,
});

schemaComposer.Mutation.addFields({
  ...Mutation,
});

const schema = schemaComposer.buildSchema();

fs.writeFileSync(
  path.join('./schema.graphql'),
  schemaComposer.toSDL({ commentDescriptions: true })
);

export default schema;
