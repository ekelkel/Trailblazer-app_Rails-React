class SessionsController < ApplicationController
  def create
    @user = User.find_by(email: session_params[:email].downcase)
    if !@user
      render json: { error: { email: 'User does not exist' } }, status: 400
    elsif @user&.authenticate(session_params[:password])
      if @user.activated?
        # Log the user in
        log_in @user
        session_params[:remember_me] ? remember(@user) : forget(@user)
        render json: { logged_in: true, user: @user }, status: 200
      else
        render json: {
                 error: {
                   account: 'Account not activated.',
                 },
               },
               status: 401
      end
    else
      render json: {
               error: {
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
    params.require(:user).permit(:email, :password, :remember_me)
  end
end
