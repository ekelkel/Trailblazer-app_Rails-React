require 'test_helper'

class RelationshipsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:elora)
    @other = users(:karen)
  end

  test 'create should require logged-in user' do
    assert_no_difference 'Relationship.count' do
      post relationships_path
    end
  end

  test 'destroy should require logged-in user' do
    assert_no_difference 'Relationship.count' do
      delete relationship_path(relationships(:one))
    end
  end

  test 'should follow a user' do
    log_in_as(@user)
    assert_difference '@user.following.count', 1 do
      post relationships_path, params: { followed_id: @other.id }
    end
  end

  test 'should unfollow a user' do
    log_in_as(@user)
    @user.follow(@other)
    relationship = @user.active_relationships.find_by(followed_id: @other.id)
    assert_difference '@user.following.count', -1 do
      delete relationship_path(relationship)
    end
  end
end
