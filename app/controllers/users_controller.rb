class UsersController < ApplicationController
  before_action :logged_in_user, only: %i[all_users update]
  before_action :correct_user, only: [:update]

  def get_users
    #@users = User.all
    if @users = User.paginate(page: params[:page])
      render json: {
               users: @users,
               page: @users.current_page, # an integer corresponding to the current page
               pages: @users.total_pages, # an integer corresponding to the total page count
             },
             status: 200
    else
      render json: { error: 'An error occurred.' }, status: 400
    end
  end

  def get_user
    if @user = User.find(params[:id])
      render json: { user: @user }, status: 200
    else
      render json: { error: 'An error occured.' }, status: 400
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      #log_in @user
      render json: { user: @user }, status: 200
    else
      render json: { errors: @user.errors }, status: 400
      # render :json => { errors: @user.errors.full_messages }
    end
  end

  def update
    if @user.update(user_params)
      render json: { user: @user }, status: 200
    else
      render json: { errors: @user.errors }, status: 400
    end
  end

  private

  def user_params
    params
      .require(:user)
      .permit(:name, :email, :password, :password_confirmation)
  end

  # Before filters

  # Confirms a logged-in user
  def logged_in_user
    unless logged_in?
      render json: {
               error: 'You must be logged in to perform this action.',
             },
             status: 400
    end
  end

  def correct_user
    @user = User.find(params[:id])
    unless current_user?(@user)
      render json: { error: 'You cannot perform this action.' }, status: 400
    end
  end
end
