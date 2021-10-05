class RelationshipsController < ApplicationController
  before_action :logged_in_user

  def is_following
    user = User.find(params[:user_id])
    if current_user.following.include?(user)
      render json: { followed: true }, status: 200
    else
      render json: { followed: false }, status: 200
    end
  end

  def create
    user = User.find(params[:followed_id])
    current_user.follow(user)
    render json: { followed: true }, status: 200
  end

  def unfollow
    user = User.find(params[:followed_id])
    current_user.unfollow(user)
    render json: { unfollowed: true }, status: 200
  end

  def destroy
    @user = Relationship.find(params[:id]).followed
    current_user.unfollow(@user)
  end
end
