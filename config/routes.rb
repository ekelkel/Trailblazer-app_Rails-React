Rails
  .application
  .routes
  .draw do
    root 'static_pages#home'
    post '/login', to: 'sessions#create'
    get '/logged_in', to: 'sessions#logged_in'
    delete '/logout', to: 'sessions#destroy'
    get '/get_users', to: 'users#get_users'
    get '/get_user', to: 'users#get_user'
    get '/validate_account', to: 'account_activations#validate'
    get '/*path' => 'static_pages#home', :via => :all
    resources :users
  end
