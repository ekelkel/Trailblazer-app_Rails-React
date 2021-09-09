class PasswordResetsController < ApplicationController
  before_action :get_user, only: %i[check_link update]
  before_action :valid_user, only: %i[check_link update]
  before_action :check_expiration, only: %i[check_link update]

  def check_link
    render json: { valid_reset_link: true }, status: 200
  end

  def create
    @user = User.find_by(email: params[:password_reset][:email].downcase)
    if @user
      @user.create_reset_digest
      @user.send_password_reset_email
      render json: { request_sent: true }, status: 200
    else
      render json: { error: { email: 'Email does not exist.' } }, status: 400
    end
  end

  def update
    if params[:user][:password].empty?
      @user.errors.add(:password, "can't be empty")
      render json: { errors: @user.errors }, status: 400
    elsif @user.update(user_params)
      @user.update_attribute(:reset_digest, nil)
      render json: { successful_reset: true }, status: 200
    else
      render json: { errors: @user.errors }, status: 400
    end
  end

  private

  def user_params
    params.require(:user).permit(:password, :password_confirmation)
  end

  # Before filters

  def get_user
    @user = User.find_by(email: params[:email])
  end

  # Confirms a valid user
  def valid_user
    unless @user && @user.activated? &&
             @user.authenticated?(:reset, params[:resetToken])
      render json: { errors: { link: 'Invalid user.' } }, status: 400
    end
  end

  # Checks expiration of reset token
  def check_expiration
    if @user.password_reset_expired?
      render json: {
               errors: {
                 link: 'Password reset has expired.',
               },
             },
             status: 400
    end
  end
end
