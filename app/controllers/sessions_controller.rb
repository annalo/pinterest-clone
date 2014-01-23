class SessionsController < ApplicationController
  before_filter :require_no_current_user!, :only => [:create, :new]
  before_filter :require_current_user!, :only => [:destroy]
  
  def create
    user = User.find_by_credentials(params[:user])
    if user
      self.current_user = user
      redirect_to root_url
    else
      flash[:errors] = "Invalid login. Please try again."
      redirect_to new_session_url
    end
  end
  
  def destroy
    logout_current_user!
    redirect_to root_url
  end
  
  def new
  end
end
