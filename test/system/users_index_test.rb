require 'application_system_test_case'

class UsersIndexTest < ApplicationSystemTestCase
  def setup
    @user = users(:elora)
  end

  test 'should redirect users index when not logged in' do
    visit '/users'
    page.assert_current_path('/')
  end

  test 'users index including pagination' do
    visit '/login'
    fill_in 'Email', with: @user.email
    fill_in 'Password', with: 'password', match: :prefer_exact
    click_button 'Log In'
    find_by_id('menu-icon').click
    click_on 'Users'
    page.assert_current_path('/users')
    assert find_by_id('users-list').all('a').size == 30
    User
      .paginate(page: 1)
      .each do |user|
        assert page.has_link?(href: "/user/#{user.id}")
        assert page.has_content? "#{user.name}"
      end
    find_by_id('users-list').first('a').click
    page.assert_current_path("/user/#{@user.id}")
  end
end
