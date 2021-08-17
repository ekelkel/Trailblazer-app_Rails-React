require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:elora)
    @other_user = users(:paul)
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
    #assert is_logged_in?
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
