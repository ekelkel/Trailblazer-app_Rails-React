if Rails.env == 'production'
  Rails.application.config.session_store :cookie_store,
                                         key: '_trailblazer',
                                         domain: 'trailblaazer.herokuapp.com'
else
  Rails.application.config.session_store :cookie_store, key: '_trailblazer'
end
