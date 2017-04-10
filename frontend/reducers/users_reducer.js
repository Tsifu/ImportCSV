import {
  RECEIVE_USERS
} from '../actions/users_actions.js';

import merge from 'lodash/merge';

const _defaultState = null;

const UsersReducer = (oldState = _defaultState, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_USERS:
      return merge( {}, action.users );
    default:
      return oldState;
  }
};

export default UsersReducer;
