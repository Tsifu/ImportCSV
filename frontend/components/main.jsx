import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      attachedFile: null,
      showCheckboxes: false,
      height: '300px',
      submit: "Choose file",
      userId: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.attachFile = this.attachFile.bind(this);
    this.deleteUsers = this.deleteUsers.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  attachFile(e) {
    const file = e.currentTarget.files[0];
    const fileType = file.name.split(".")[1];

    if (fileType != "csv") {
      alert("Please upload only CSV");
    } else {
      this.setState({ attachedFile: file });
      this.setState({ submit: file.name});
    }
  }

  deleteUsers() {
    this.props.deleteUsers();
  }

  handleSubmit(e) {
    e.preventDefault();

    const uploadFile = new FormData();
    uploadFile.append('file', this.state.attachedFile);
    this.props.uploadUsers(uploadFile);
    this.setState({submit: "Choose file"});
  }

  render() {
    let usersTable;
    let userInfo;

    if (this.props.users) {
      userInfo = this.props.users.map(user => {
        return (
          <TableRow key={user.id}>
            <TableRowColumn>{user.user}</TableRowColumn>
            <TableRowColumn>{user.steps.toLocaleString()}</TableRowColumn>
            <TableRowColumn>{user.distance}</TableRowColumn>
            <TableRowColumn>{user.exercise}</TableRowColumn>
            <TableRowColumn>{user.sleep}</TableRowColumn>
            <TableRowColumn>{user.calories.toLocaleString()}</TableRowColumn>
          </TableRow>
        );
      });

      usersTable = (<Table height={this.state.height}>
        <TableHeader
          displaySelectAll={this.state.showCheckboxes}
          adjustForCheckbox={this.state.showCheckboxes}
          style={{backgroundColor:'#6C96C7', color:'white'}}
          >
          <TableRow>
            <TableHeaderColumn style={{color:'white'}}>Name</TableHeaderColumn>
            <TableHeaderColumn style={{color:'white'}}>Steps</TableHeaderColumn>
            <TableHeaderColumn style={{color:'white'}}>Distance</TableHeaderColumn>
            <TableHeaderColumn style={{color:'white'}}>Minutes Exercised</TableHeaderColumn>
            <TableHeaderColumn style={{color:'white'}}>Hours of Sleep</TableHeaderColumn>
            <TableHeaderColumn style={{color:'white'}}>Calories Burned</TableHeaderColumn>
          </TableRow>
        </TableHeader>

        <TableBody
          displayRowCheckbox={this.state.showCheckboxes}
        >
          {userInfo}
        </TableBody>
      </Table>);
    }

    return (
      <div className="body">
        <header>
          Import CSV and Export in CSV or XLS
        </header>

        <div className="users">
          {usersTable}
        </div>

        <main>
          <div className='import-sec'>
            <h4>Import CSV</h4>
            <a className="sample-csv" href="https://s3.amazonaws.com/splitzees-pro/test/test.csv">Sample file to upload</a>
            <form onSubmit={this.handleSubmit}>
              <input
                className="cvs-upload"
                type="file"
                onChange={this.attachFile}
                id="cvs-upload"
              />
            <label htmlFor="cvs-upload" className="lbl-upload"><img src={window.images.upload}/>  {this.state.submit}</label>
            <br/>
            <input className="submit" type="submit" value="Upload User"/>
            </form>
          </div>

          <div>
            <h4>Download Current data</h4>
            <ul className="links">
              <li className="download-link"><a href="/users.csv">Download(csv)</a></li>
              <li className="download-link"><a href="/users.xls">Download(xls)</a></li>
            </ul>
          </div>

          <div>
            <h4>Reset Table</h4>
            <button className="reset" onClick={this.deleteUsers}>Clear</button>
          </div>
        </main>

        <hr/>

        <div>
          <h3>Purpose</h3>
          <p>As businesses move toward automating their processes, there might come an opportunity where you need to offer an interface for your client to migrate their legacy data into your application.  Since many organizations utilize spreadsheet to track and manipulate their in-house data, this is a live demonstration on importing csv files into a Ruby on Rails + React application.  Furthermore, the demo will showcase exporting the data into csv and xls format. Please check out my repository for implementation detail.</p>

          <div>
            <h3>Procedure</h3>
            <ul>
              <li>
                <span>Step 1:</span> Click <i>"Sample file to upload"</i> to download "test.csv".  The file includes the proper attributes that correspond to the database.  Please note, there is a blank row in the file but will be skipped when Rails is creating the entries.
              </li>

              <li>
                <span>Step 2:</span> Press <i>"Choose file"</i> to load the "test.csv" downloaded in Step 1.  Please note, the application will only read csv extension.
              </li>

              <li>
                <span>Step 3:</span> Press <i>"Upload User"</i> to import the data into the database.  Data will persist and rendered on the table above.
              </li>

              <li>
                <span>Step 4:</span> Click <i>"Download"</i> link to export the table into a csv or xls file.
              </li>

              <li>
                <span>Step 5:</span> Press <i>"Reset Table"</i> to delete entries created by the "test.csv" file.
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
