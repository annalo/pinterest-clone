class ApplicationController < ActionController::Base
  protect_from_forgery
  
  include SessionsHelper
  include PinsHelper
  include BoardsHelper
  include UsersHelper
  include BoardsPinsHelper
end
