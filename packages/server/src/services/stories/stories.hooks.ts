import * as authentication from '@feathersjs/authentication';
import addAuthor from '../../hooks/add-author';
import addDescription from '../../hooks/add-description';
import populateFeedback from '../../hooks/populate-feedback';
import algolia from '../../hooks/algolia';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [authenticate('jwt'), addDescription(), addAuthor()],
    update: [authenticate('jwt'), addDescription()],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')],
  },

  after: {
    all: [],
    find: [populateFeedback('story', ['likes', 'comments', 'views'])],
    get: [populateFeedback('story', ['likes', 'comments', 'views'])],
    create: [algolia()],
    update: [algolia()],
    patch: [algolia()],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
