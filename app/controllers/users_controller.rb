class UsersController < ApplicationController
  def index
    @users = User.all

    respond_to do |format|
      format.csv { send_data @users.to_csv }
      format.xls
    end
  end
end
