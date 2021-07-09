Rails
  .application
  .routes
  .draw do
    resources :users, only: [:create]
    root 'static_pages#home'
    get '/*path' => 'static_pages#home', :via => :all
  end
