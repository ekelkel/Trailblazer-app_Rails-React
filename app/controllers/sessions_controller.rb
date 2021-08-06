class SessionsController < ApplicationController
  def create
    user = User.find_by(email: session_params[:email].downcase)
    if !user
      render json: { errors: { email: 'User does not exist' } }, status: 400
    elsif user&.authenticate(session_params[:password])
      # Log the user in
      log_in user
      remember user
      render json: { logged_in: true, user: user }, status: 200
    else
      render json: {
               errors: {
                 password: 'Invalid email/password combination',
               },
             },
             status: 400
    end
  end

  def logged_in
    if !current_user.nil?
      render json: { logged_in: true, user: current_user }, status: 200
    else
      render json: { logged_in: false }, status: 200
    end
  end

  def destroy
    log_out if !current_user.nil? # fix bug when user logs out in a second window
    render json: { logged_out: true }, status: 200
  end

  private

  def session_params
    params.require(:user).permit(:email, :password)
  end
end
