Rails.application.config.middleware.insert_before 0, Rack::Cors do
  # if a frontend application is trying to communication with our system 
  # But is not allowed to do so, we don't want to give it access to the system
  allow do
    origins "http:localhost:3000"
    resource "*", headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head],
    credentials: true
  end

  allow do
    origins "https://blooming-dusk-67341.herokuapp.com/"
    resource "*", headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head],
    credentials: true
  end
end