require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:elora)
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
    assert is_logged_in?
  end

  test 'successful user update' do
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
end
