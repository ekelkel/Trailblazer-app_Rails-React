class PinsController < ApplicationController
  before_action :logged_in_user, only: %i[create destroy]

  def create
    @pin = current_user.pins.build(pin_params)
    if @pin.save
      render json: { pin: @pin }, status: 200
    else
      render json: { errors: @pin.errors }, status: 400
    end
  end

  def destroy; end

  private

  def pin_params
    params
      .require(:pin)
      .permit(:name, :address, :latitude, :longitude, :rating, :comment)
  end
end
