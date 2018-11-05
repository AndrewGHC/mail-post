/* eslint-disable camelcase */
import { gql, UserInputError } from 'apollo-server-express';
import { head } from 'ramda';

import {
  getLists,
  deleteLists,
} from './controllers';
import { csvImport } from './handlers';

const typeDefs = gql`
  type Query {
    lists: [List]
  }

  type Mutation {
    importCsv (csvPath: String!, name: String!): List
    deleteLists (ids: [ID]!): [List]
  }

  type List {
    id: ID!
    name: String
    total_subscribers: Int
    createdAt: String
  }
`;

const getListsFormatted = listName => getLists(listName).then(lists => lists.map(({
  total_subscribers,
  name,
  id,
  createdAt,
}) => ({
  total_subscribers,
  name,
  id,
  createdAt,
})));

const resolvers = {
  Query: {
    lists: () => getListsFormatted(),
  },
  Mutation: {
    importCsv: async (_, { csvPath, name }) => {
      try {
        await csvImport(csvPath, name);
        const list = await getListsFormatted(name);
        return head(list);
      } catch (e) {
        throw new UserInputError(e);
      }
    },
    deleteLists: async (_, { ids }) => {
      try {
        const deleted = await deleteLists(ids);
        return deleted.map(id => ({ id }));
      } catch (e) {
        throw new UserInputError(e);
      }
    },
  },
};

const schema = {
  typeDefs,
  resolvers,
};

export default schema;
