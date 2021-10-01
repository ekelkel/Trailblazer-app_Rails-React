class PinsController < ApplicationController
  before_action :logged_in_user, only: %i[create destroy]
  before_action :correct_user, only: :destroy

  def create
    @pin = current_user.pins.build(pin_params)

    if @pin.save
      render json: { pin: @pin }, status: 200
    else
      render json: { errors: @pin.errors }, status: 400
    end
  end

  def destroy
    if @pin.destroy
      render json: { pin: @pin, destroyed: true }, status: 200
    else
      render json: { destroyed: false }, status: 400
    end
  end

  def feed
    if logged_in?
      @feed_items = current_user.feed.paginate(page: params[:page])
      render json: {
               feed:
                 ActiveModelSerializers::SerializableResource.new(
                   @feed_items,
                   each_serializer: PinSerializer,
                 ),
               page: @feed_items.current_page, # an integer corresponding to the current page
               pages: @feed_items.total_pages, # an integer corresponding to the total page count
             },
             status: 200
    else
      render json: { error: 'An error occurred.' }, status: 400
    end
  end

  private

  def pin_params
    params.permit(
      :name,
      :address,
      :latitude,
      :longitude,
      :rating,
      :comment,
      :all_tags,
      images: [],
    )
  end

  def correct_user
    @pin = current_user.pins.find_by(id: params[:id])
    if @pin.nil?
      render json: {
               error: 'You are not allowed to perform this action.',
             },
             status: 400
    end
  end
end
