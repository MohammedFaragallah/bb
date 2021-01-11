import * as authentication from '@feathersjs/authentication';
import addDescription from '../../hooks/add-description';
import populateFeedback from '../../hooks/populate-feedback';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [authenticate('jwt'), addDescription()],
    update: [authenticate('jwt'), addDescription()],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')],
  },

  after: {
    all: [],
    find: [populateFeedback('event', ['likes', 'comments'])],
    get: [populateFeedback('event', ['likes', 'comments'])],
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
