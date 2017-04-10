import React from 'react';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      attachedFile: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.attachFile = this.attachFile.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  attachFile(e) {
    const file = e.currentTarget.files[0];
    this.setState({ attachedFile: file });
  }

  handleSubmit(e) {
    e.preventDefault();

    const uploadFile = new FormData();
    uploadFile.append('file', this.state.attachedFile);
    this.props.uploadUsers(uploadFile);
  }



  render() {
    let usersTable;
    let userInfo;

    if (this.props.users) {
      userInfo = this.props.users.map((user,idx) => {
        return (
          <tr key={idx}>
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
          <form onSubmit={this.handleSubmit}>
            <input
              className="cvs-upload"
              type="file"
              onChange={this.attachFile}
            />

          <input className="submit" type="submit" value="Upload Users"/>
          </form>
        </div>
      </div>
    );
  }
}

export default Main;
