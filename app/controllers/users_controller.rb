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
      render json: { user: @user, count: @user.pins.count }, status: 200
    else
      render json: { error: 'User does not exist.' }, status: 400
    end
  end

  def get_user_pins
    if @user = User.find(params[:id])
      if params[:tags]
        tags = Tag.where(name: params[:tags].split(','))
        all_pins = tags[0].pins.where(user_id: @user.id)
        tags.each do |tag|
          all_pins = all_pins & tag.pins.where(user_id: @user.id)
        end
        @pins = all_pins.paginate(page: params[:page])
      else
        @pins = @user.pins.paginate(page: params[:page])
      end
      render json: {
               user: @user,
               count: @user.pins.count,
               pins:
                 ActiveModelSerializers::SerializableResource.new(
                   @pins,
                   each_serializer: PinSerializer,
                 ),
               page: @pins.current_page,
               pages: @pins.total_pages,
             },
             status: 200
    else
      render json: { error: 'User does not exist.' }, status: 400
    end
  end

  def get_map_pins
    if @user = User.find(params[:id])
      if params[:tags]
        tags = Tag.where(name: params[:tags].split(','))
        all_pins = tags[0].pins.where(user_id: @user.id)
        tags.each do |tag|
          all_pins = all_pins & tag.pins.where(user_id: @user.id)
        end
        @pins = all_pins
      else
        @pins = @user.pins
      end
      render json: {
               user: @user,
               pins:
                 ActiveModelSerializers::SerializableResource.new(
                   @pins,
                   each_serializer: PinSerializer,
                 ),
             },
             status: 200
    else
      render json: { error: 'User does not exist.' }, status: 400
    end
  end

  def get_tags
    user_tags = []
    all_pins = Pin.where(user_id: params[:id])
    all_tags = []
    all_pins.each { |pin| pin.tags.each { |tag| all_tags |= [tag] } }
    all_tags.each do |tag|
      user_tag = Hash.new
      user_tag['value'] = tag.name
      user_tag['label'] = tag.name
      user_tag['id'] = tag.id
      user_tag['color'] = tag.color
      user_tags.push(user_tag)
    end
    render json: { tags: user_tags }, status: 200
  end

  def create
    @user = User.new(user_params)
    if @user.save
      #log_in @user
      @user.send_activation_email
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

  def correct_user
    @user = User.find(params[:id])
    unless current_user?(@user)
      render json: { error: 'You cannot perform this action.' }, status: 401
    end
  end
end
