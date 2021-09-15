class ApplicationController < ActionController::Base
  include SessionsHelper # make helper available in controllers

  # skip_before_action :verify_authenticity_token
  # the above line skips the CSRF protection
  # https://pragmaticstudio.com/tutorials/rails-session-cookies-for-api-authentication
  #before_action :set_csrf_cookie
  #private
  #def set_csrf_cookie
  #  cookies['CSRF-TOKEN'] = form_authenticity_token
  #end

  private

  # Confirms a logged-in user
  def logged_in_user
    unless logged_in?
      render json: {
               error: 'You must be logged in to perform this action.',
             },
             status: 401
    end
  end
end
