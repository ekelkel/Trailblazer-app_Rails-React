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
    get '/get_user_pins', to: 'users#get_user_pins'
    get '/get_map_pins', to: 'users#get_map_pins'
    get '/get_tags', to: 'users#get_tags'
    get '/following', to: 'users#following'
    get '/followers', to: 'users#followers'
    get '/is_following', to: 'relationships#is_following'
    delete '/unfollow', to: 'relationships#unfollow'
    get '/validate_account', to: 'account_activations#validate'
    get '/check_reset_password_link', to: 'password_resets#check_link'
    get '/feed', to: 'pins#feed'
    get '/*path' => 'static_pages#home',
        :via => :all,
        :constraints =>
          lambda { |req| req.path.exclude? 'rails/active_storage' }
    resources :users, only: %i[create update]
    resources :password_resets, only: %i[create update]
    resources :pins, only: %i[create destroy]
    resources :relationships, only: %i[create destroy]
  end
