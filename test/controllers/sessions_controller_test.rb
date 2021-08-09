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

    # Simulate a user clicking logout in a second window.
    delete logout_path
  end

  test 'login with remembering' do
    log_in_as(@user, remember_me: true)
    assert_equal cookies['remember_token'], assigns(:user).remember_token
  end

  test 'login without remembering' do
    # Log in to set the cookie
    log_in_as(@user, remember_me: true)

    # Log in again and verify that the cookie is deleted.
    log_in_as(@user, remember_me: false)
    assert cookies['remember_token'].blank?
  end
end
