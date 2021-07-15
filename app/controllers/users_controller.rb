class UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      render json: { user: @user }, status: 200
    else
      render json: { errors: @user.errors }, status: 400
      # render :json => { errors: @user.errors.full_messages }
    end
  end

  private

  def user_params
    params
      .require(:user)
      .permit(:name, :email, :password, :password_confirmation)
  end
end
