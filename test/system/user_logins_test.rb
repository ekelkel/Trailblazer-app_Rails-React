require 'application_system_test_case'

class UserLoginsTest < ApplicationSystemTestCase
  def setup
    @user = users(:elora)
  end

  test 'login with valid email/invalid password' do
    visit '/login'
    fill_in 'Email', with: @user.email
    fill_in 'Password', with: 'invalid', match: :prefer_exact
    click_button 'Log In'
    assert page.has_content? 'Invalid email/password combination'
  end

  test 'login with valid information' do
    visit '/login'
    fill_in 'Email', with: @user.email
    fill_in 'Password', with: 'password', match: :prefer_exact
    click_button 'Log In'
    page.assert_current_path('/')
    find_by_id('menu-icon').click
    assert page.has_no_content? 'Log In'
    assert page.has_no_content? 'Sign up'
    assert page.has_content? 'Profile'
    assert page.has_content? 'My account'
    assert page.has_content? 'Log out'
    click_on 'Log out'
    page.assert_current_path('/login')
    find_by_id('menu-icon').click
    assert page.has_content? 'Log In'
    assert page.has_content? 'Sign up'
    assert page.has_no_content? 'Profile'
    assert page.has_no_content? 'My account'
    assert page.has_no_content? 'Log out'
  end

  test 'login with invalid information' do
    visit '/login'
    click_button 'Log In'
    assert page.has_content? 'Email is required'
    assert page.has_content? 'Password is required'
  end
end
