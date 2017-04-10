class Api::UsersController < ApplicationController
  def index
    @users = User.all
  end

  def import
    User.import(params[:file])

  end
end
