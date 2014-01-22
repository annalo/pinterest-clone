class UsersController < ApplicationController
  before_filter :require_no_current_user!, :only => [:create, :new]
  
  def index
    @users = User.all
  end
  
  def create
    @user = User.new(params[:user])
    
    if @user.save
      self.current_user = @user
      redirect_to root_url
    else
      render :json => @user.errors.full_messages
    end
  end
  
  def new
    @user = User.new
  end
  
  def show
    if params.include?(:id)
      @user = User.find(params[:id])
      respond_to do |format|
        format.json { render "show" }
      end
    else
      redirect_to root_url
    end
  end

  def update
    @user = User.find(params[:id])

    if @user.update_attributes(params[:board])
      render :json => @user
    else
      render :json => @user.errors.full_messages
    end
  end
end
