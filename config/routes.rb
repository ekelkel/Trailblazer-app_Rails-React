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
    get '/check_reset_password_link', to: 'password_resets#check_link'
    get '/feed', to: 'pins#feed'
    get '/*path' => 'static_pages#home', :via => :all
    resources :users
    resources :password_resets, only: %i[create update]
    resources :pins, only: %i[create destroy]
  end
