PinterestClone::Application.routes.draw do
  resources :users, :only => [:index, :create, :new, :show, :update]
  resource :session, :only => [:create, :destroy, :new]
  
  namespace :api, :defaults => { :format => :json } do
    resources :boards
    resources :pins
    resources :boards_pins, :only => [:create, :destroy]
  end
  
  root :to => "root#root"
end
