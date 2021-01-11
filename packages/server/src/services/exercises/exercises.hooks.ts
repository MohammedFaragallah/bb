import * as authentication from '@feathersjs/authentication';
import populateFeedback from '../../hooks/populate-feedback';
import addAuthor from '../../hooks/add-author';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [authenticate('jwt'), addAuthor()],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')],
  },

  after: {
    all: [],
    find: [populateFeedback('exercise', ['likes'])],
    get: [populateFeedback('exercise', ['likes'])],
    create: [],
    update: [],
    patch: [],
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
