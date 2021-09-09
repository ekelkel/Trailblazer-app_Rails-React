require 'test_helper'

class PasswordResetsControllerTest < ActionDispatch::IntegrationTest
  def setup
    ActionMailer::Base.deliveries.clear
    @user = users(:elora)
  end

  test 'valid email' do
    post password_resets_path,
         params: {
           password_reset: {
             email: @user.email,
           },
         }
    assert_not_equal @user.reset_digest, @user.reload.reset_digest
    assert_equal 1, ActionMailer::Base.deliveries.size
  end
end
