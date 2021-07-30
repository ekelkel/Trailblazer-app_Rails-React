class ApplicationController < ActionController::Base
  include SessionsHelper
  # skip_before_action :verify_authenticity_token
  # the above line skips the CSRF protection
  # https://pragmaticstudio.com/tutorials/rails-session-cookies-for-api-authentication
  #before_action :set_csrf_cookie
  #private
  #def set_csrf_cookie
  #  cookies['CSRF-TOKEN'] = form_authenticity_token
  #end
end
