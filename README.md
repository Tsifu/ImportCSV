# Import CSV and Export to CSV and XLS

A live demonstration on importing CSV file to create entries in a Ruby on Rails + React application.  In addition, the demo exhibits exporting current data in .csv or .xls format.  

## Implementation

Ruby library has a native 'csv' class.  To give the application access to the csv class, just add 'require csv' in the config/application.rb.

### Model

app/models/user.rb

```Ruby

def self.import(file)
  CSV.foreach(file.path, skip_blanks: true, skip_lines: /^(?:,\s*)+$/, headers: true) do |row|
    User.create row.to_hash
  end
end
```

Method to import the data from the csv file that was posted by the client.  Use skip_lines: to skip any blank rows in the csv file to prevent any errors during creation.

### Controller

app/controllers/api/users_controller.rb

```Ruby

def import
  User.import(params[:file])
  @users = User.all
  render 'api/users/index'
end
```

Set up an import action in User controller, which executes the import method in the User model.

### Routes

config/routes.rb

```Ruby
namespace :api do
  resources :users do
    collection { post :import }
  end
end
```

In order for the cvs file to be passed to the controller, we will need to add the ability to post to the database using the import method by adding an additional route to the collection.

### Front-end Component

frontend/components/main.jsx

```Javascript
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

handleSubmit(e) {
  e.preventDefault();

  const uploadFile = new FormData();
  uploadFile.append('file', this.state.attachedFile);
  this.props.uploadUsers(uploadFile);
  this.setState({submit: "Choose file"});
}
```

Once the client uploads the csv file, we will store the file in the component's local state.  When the form is submitted, we will user FormData object to set the uploaded csv file as the value.

### Ajax Request

```Javascript
export const uploadCSV = (file) => {
  return $.ajax({
    url: 'api/users/import',
    method: "POST",
    contentType: false,
    processData: false,
    data: file,
  });
};
```

In the ajax request to post the uploaded csv file to server, make sure to flag false for both contentType and processData to prevent ajax from passing the data as JSON.

### Exporting in xls or csv

app/controllers/users_controller.rb

```Ruby
def index
  @users = User.all

  respond_to do |format|
    format.csv { send_data @users.to_csv }
    format.xls
  end
end
```

To export csv and xls, we will create a separate User controller to respond to csv and xls format.
A static layout is created to render the User data to be rendered inxls format.   
