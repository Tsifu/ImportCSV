import * as UsersUtil from '../util/api_util';

export const RECEIVE_USERS = "RECEIVE_USERS";

export const receiveUsers = (users) => {
  return ({
    type: RECEIVE_USERS,
    users: users,
  });
};

export const fetchUsers = () => dispatch => {
  return UsersUtil.fetchUsers().then((users) => dispatch(receiveUsers(users)));
};

export const uploadUsers = (users) => dispatch => {
  return UsersUtil.uploadCSV(users).then((users) => dispatch(receiveUsers(users)));
};

export const deleteUsers = () => dispatch => {
  return UsersUtil.deleteUsers().then((users) => dispatch(receiveUsers(users)));
};
