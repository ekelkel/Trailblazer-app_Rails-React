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
    assert page.has_content? 'Hello hello hello Elora!'
  end

  test 'login with invalid information' do
    visit '/login'
    click_button 'Log In'
    assert page.has_content? 'Email is required'
    assert page.has_content? 'Password is required'
  end
end
