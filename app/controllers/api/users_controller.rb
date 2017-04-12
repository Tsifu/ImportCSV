class Api::UsersController < ApplicationController
  def index
    @users = User.all
  end

  def import
    User.import(params[:file])
    @users = User.all
    render 'api/users/index'
  end

  def destroy
    User.where.not(id: 1).delete_all
    @users = User.all
    render 'api/users/index'
  end
end
