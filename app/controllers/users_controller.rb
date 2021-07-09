class UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      render json: { status: :created, user: @user }, status: 200
    else
      render json: { status: :error }, status: 500
    end
  end

  private

  def user_params
    params
      .require(:user)
      .permit(:name, :email, :password, :password_confirmation)
  end
end
