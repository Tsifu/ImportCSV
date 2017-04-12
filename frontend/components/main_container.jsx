import { connect } from 'react-redux';
import Main from './main';
import { fetchUsers, uploadUsers, deleteUsers } from '../actions/users_actions';

const mapStateToProps = state => {
  let loadedUsers = null;

  if (state.users) {
    loadedUsers = Object.keys(state.users).map(id => state.users[id]);
  }

  return ({
    users: loadedUsers
  });
};

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
  uploadUsers: (users) => dispatch(uploadUsers(users)),
  deleteUsers: () => dispatch(deleteUsers()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
