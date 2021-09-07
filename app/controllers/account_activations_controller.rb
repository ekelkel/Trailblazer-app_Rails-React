class AccountActivationsController < ApplicationController
  def validate
    user = User.find_by(email: params[:email])
    if user && !user.activated? &&
         user.authenticated?(:activation, params[:validationToken])
      user.activate
      render json: { activated: true }, status: 200
    else
      render json: { activated: false }, status: 400
    end
  end
end
