import React from 'react';

class Main extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    let usersTable;
    let userInfo;

    if (this.props.users) {
      userInfo = this.props.users.map(user => {
        return (
          <tr>
            <td>{user.user}</td>
            <td>{user.steps}</td>
            <td>{user.distance}</td>
            <td>{user.exercise}</td>
            <td>{user.sleep}</td>
            <td>{user.calories}</td>
          </tr>
        );
      });

      usersTable = (<table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Steps</th>
            <th>Distance</th>
            <th>Minutes Exercised</th>
            <th>Hours of Sleep</th>
            <th>Calories Burned</th>
          </tr>
        </thead>

        <tbody>
          {userInfo}
        </tbody>
      </table>);
    }

    return (
      <div>
        <div className="users">
          {usersTable}
        </div>

        <div className='import-sec'>
          <h4>Import that data!</h4>
          <form>
            <input
              className="cvs-upload"
              type="file"
              />
          </form>
        </div>
      </div>
    );
  }
}

export default Main;
