require 'application_system_test_case'

class FollowingsTest < ApplicationSystemTestCase
  def setup
    @user = users(:elora)
    @other_user = users(:karen)
    @new_user = users(:homer)
  end

  test 'should redirect following page when not logged in' do
    visit "/following/#{@user.id}"
    page.assert_current_path('/')
  end

  test 'should redirect followers page when not logged in' do
    visit "/followers/#{@user.id}"
    page.assert_current_path('/')
  end

  test 'following page' do
    visit '/login'
    fill_in 'Email', with: @user.email
    fill_in 'Password', with: 'password', match: :prefer_exact
    click_button 'Log In'
    find_by_id('menu-icon').click
    click_on 'My profile'
    assert page.has_content? "#{@user.following.count} following"
    click_on "#{@user.following.count} following"
    page.assert_current_path("/following/#{@user.id}")
    assert_not @user.following.empty? # make sure that assertion below is not vacuously true
    @user
      .following
      .paginate(page: 1)
      .each do |user|
        assert page.has_link?(href: "/user/#{user.id}")
        assert page.has_content? "#{user.name}"
      end
  end

  test 'followers page' do
    visit '/login'
    fill_in 'Email', with: @user.email
    fill_in 'Password', with: 'password', match: :prefer_exact
    click_button 'Log In'
    find_by_id('menu-icon').click
    click_on 'My profile'
    assert page.has_content? "#{@user.followers.count} followers"
    click_on "#{@user.followers.count} followers"
    page.assert_current_path("/followers/#{@user.id}")
    assert_not @user.followers.empty? # make sure that assertion below is not vacuously true
    @user
      .followers
      .paginate(page: 1)
      .each do |user|
        assert page.has_link?(href: "/user/#{user.id}")
        assert page.has_content? "#{user.name}"
      end
  end

  test 'should follow and unfollow a user' do
    visit '/login'
    fill_in 'Email', with: @user.email
    fill_in 'Password', with: 'password', match: :prefer_exact
    click_button 'Log In'
    visit "/user/#{@other_user.id}"
    assert_difference '@user.following.count', 1 do
      assert_difference '@other_user.followers.count', 1 do
        click_button 'Follow'
        sleep 2
      end
    end
    assert page.has_content? "#{@other_user.followers.count} follower"
    assert_difference '@user.following.count', -1 do
      assert_difference '@other_user.followers.count', -1 do
        click_button 'Unfollow'
        sleep 2
      end
    end
    assert page.has_content? "#{@other_user.followers.count} follower"
  end

  test 'feed on home page' do
    visit '/login'
    fill_in 'Email', with: @user.email
    fill_in 'Password', with: 'password', match: :prefer_exact
    click_button 'Log In'
    @user
      .feed
      .paginate(page: 1)
      .each do |pin|
        assert page.has_link?(href: "/user/#{pin.user_id}")
        assert page.has_content? "#{pin.name}"
        assert page.has_content? "#{pin.address}"
        assert page.has_content? "#{pin.comment}"
      end
    first_pin = @user.feed.paginate(page: 1).first
    click_on("#{User.find(first_pin.user_id).name}", match: :first)
    page.assert_current_path("/user/#{first_pin.user_id}")
  end

  test 'empty feed' do
    visit '/login'
    fill_in 'Email', with: @new_user.email
    fill_in 'Password', with: 'password', match: :prefer_exact
    click_button 'Log In'
    assert page.has_content? "It's a little quiet out here."
    assert page.has_content? 'Start following fellow trailblazers or add your own favorite places!'
    click_on 'Find fellow trailblazers'
    page.assert_current_path('/users')
  end
end
