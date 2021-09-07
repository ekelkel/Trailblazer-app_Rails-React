require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:elora)
    @other_user = users(:paul)
    ActionMailer::Base.deliveries.clear
  end

  test 'invalid signup information' do
    assert_no_difference 'User.count' do
      post users_path,
           params: {
             user: {
               name: '',
               email: 'user@invalid',
               password: 'foo',
               password_confirmation: 'bar',
             },
           }
    end
  end

  test 'valid signup information' do
    assert_difference 'User.count', 1 do
      post users_path,
           params: {
             user: {
               name: 'Example User',
               email: 'user@example.com',
               password: 'password',
               password_confirmation: 'password',
             },
           }
    end
    assert_equal 1, ActionMailer::Base.deliveries.size
    user = assigns(:user)
    assert_not user.activated?

    # Try to log in before activation
    log_in_as(user)
    assert_not is_logged_in?

    # Invalid activation token
    get validate_account_path(
          validationToken: 'invalid token',
          email: user.email,
        )
    assert_not is_logged_in?

    # Valid token, wrong email
    get validate_account_path(
          validationToken: user.activation_token,
          email: 'wrong',
        )
    assert_not is_logged_in?

    # Valid activation token
    get validate_account_path(
          validationToken: user.activation_token,
          email: user.email,
        )
    assert user.reload.activated?
  end

  test 'successful user update' do
    log_in_as(@user)
    name = 'Foo Bar'
    email = 'foo@bar.com'
    patch user_path(@user),
          params: {
            user: {
              name: name,
              email: email,
              password: '',
              password_confirmation: '',
            },
          }
    @user.reload
    assert_equal name, @user.name
    assert_equal email, @user.email
  end

  test 'unsuccessful update when user is not logged in' do
    name = 'Foo Bar'
    assert_no_changes 'users(:elora).name' do
      patch user_path(@user),
            params: {
              user: {
                name: name,
                email: @user.email,
              },
            }
    end
  end

  test 'unsuccessful update when logged in as wrong user' do
    log_in_as(@other_user)
    name = 'Foo Bar'
    assert_no_changes 'users(:elora).name' do
      patch user_path(@user),
            params: {
              user: {
                name: name,
                email: @user.email,
              },
            }
    end
  end
end
