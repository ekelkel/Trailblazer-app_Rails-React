class UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      log_in @user
      render json: { user: @user }, status: 200
    else
      render json: { errors: @user.errors }, status: 400
      # render :json => { errors: @user.errors.full_messages }
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render json: { user: @user }, status: 200
    else
      render json: { errors: 'Update failed' }, status: 400
    end
  end

  private

  def user_params
    params
      .require(:user)
      .permit(:name, :email, :password, :password_confirmation)
  end
end
