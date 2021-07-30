Rails
  .application
  .routes
  .draw do
    root 'static_pages#home'
    post '/login', to: 'sessions#create'
    get '/logged_in', to: 'sessions#logged_in'
    delete '/logout', to: 'sessions#destroy'
    get '/*path' => 'static_pages#home', :via => :all
    resources :users, only: [:create]
  end
