class AccountActivationsController < ApplicationController
  def validate
    user = User.find_by(email: params[:email])
    if user && !user.activated? &&
         user.authenticated?(:activation, params[:validationToken])
      user.activate
      render json: { activated: true }, status: 200
    else
      render json: {
               error:
                 'This account is already activated or the link is invalid.',
             },
             status: 401
    end
  end
end
