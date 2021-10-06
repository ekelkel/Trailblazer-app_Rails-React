require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup
    @user =
      User.new(
        name: 'Test User',
        email: 'user@test.com',
        password: 'motdepasse',
        password_confirmation: 'motdepasse',
      )
  end

  test 'should be valid' do
    assert @user.valid?
  end

  test 'name should be present' do
    @user.name = ' '
    assert_not @user.valid?
  end

  test 'email should be present' do
    @user.email = ' '
    assert_not @user.valid?
  end

  test 'name should not be too long' do
    @user.name = 'a' * 51
    assert_not @user.valid?
  end

  test 'email should not be too long' do
    @user.email = 'a' * 244 + '@example.com'
    assert_not @user.valid?
  end

  test 'email validation should accept valid addresses' do
    valid_addresses = %w[
      user@test.com
      USER@test.COM
      A_USER@test.one.org
      a.user@test.fr
      a+user@test.fr
    ]
    valid_addresses.each do |valid_address|
      @user.email = valid_address
      assert @user.valid?,
             "#{valid_address.inspect} should be
    valid"
    end
  end

  test 'email validation should reject invalid addresses' do
    invalid_addresses = %w[
      user@test,com
      user_test.org
      user.name@test.
      user@test_test.com
      user@test+test.com
    ]
    invalid_addresses.each do |invalid_address|
      @user.email = invalid_address
      assert_not @user.valid?,
                 "#{invalid_address.inspect}
    should be invalid"
    end
  end

  test 'email addresses should be unique' do
    duplicate_user = @user.dup
    @user.save
    assert_not duplicate_user.valid?
  end

  test 'email addresses should be saved as lowercase' do
    mixed_case_email = 'User@ExAMPle.CoM'
    @user.email = mixed_case_email
    @user.save
    assert_equal mixed_case_email.downcase, @user.reload.email
  end

  test 'password should be present (nonblank)' do
    @user.password = @user.password_confirmation = ' ' * 6
    assert_not @user.valid?
  end

  test 'password should have a minimum length' do
    @user.password = @user.password_confirmation = 'a' * 5
    assert_not @user.valid?
  end

  test 'authenticated? should return false for a user with nil digest' do
    assert_not @user.authenticated?(:remember, '')
  end

  test 'should follow and unfollow a user' do
    elora = users(:elora)
    tim = users(:tim)
    assert_not elora.following?(tim)
    elora.follow(tim)
    assert elora.following?(tim)
    assert tim.followers.include?(elora)
    elora.unfollow(tim)
    assert_not elora.following?(tim)
  end

  test 'feed should have the right pins' do
    elora = users(:elora)
    karen = users(:karen)
    paul = users(:paul)

    # Pins from followed users
    paul.pins.each { |pin| assert elora.feed.include?(pin) }

    # Pins from self
    elora.pins.each { |pin_self| assert elora.feed.include?(pin_self) }

    # Pins from unfollowed users
    karen.pins.each do |pin_unfollowed|
      assert_not elora.feed.include?(pin_unfollowed)
    end
  end
end
