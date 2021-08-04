require 'test_helper'

class SessionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:elora)
  end

  test 'login with valid email/invalid password' do
    post login_path,
         params: {
           user: {
             email: @user.email,
             password: 'invalid',
           },
         }
    assert_not is_logged_in?
  end

  test 'login with valid information followed by logout' do
    post login_path,
         params: {
           user: {
             email: @user.email,
             password: 'password',
           },
         }
    assert is_logged_in?
    delete logout_path
    assert_not is_logged_in?
  end
end
