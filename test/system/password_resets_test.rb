require 'application_system_test_case'

class PasswordResetsTest < ApplicationSystemTestCase
  def setup
    ActionMailer::Base.deliveries.clear
    @user = users(:elora)
  end

  test 'password resets' do
    visit '/login'
    click_on 'Forgot your password?'
    page.assert_current_path('/reset_password_request')

    # Invalid email
    click_button 'Reset password'
    assert page.has_content? 'Email is required'

    # Valid email
    fill_in 'Email', with: @user.email
    click_button 'Reset password'
    page.assert_current_path('/login')
    assert page.has_content? 'Email sent with password reset instructions'

    # Password reset form
    # Right email, wrong token
    visit '/reset_password_form?resetToken=invalid&email=elora@example.com'
    page.assert_current_path('/login')
    assert page.has_content? 'Invalid reset password link or unactivated account.'

    email = ActionMailer::Base.deliveries.last
    html = Nokogiri.HTML(email.html_part.body.to_s)
    target_link = html.at("a:contains('Reset password')")
    path =
      CGI.unescapeHTML(target_link['href']).sub!('http://localhost:3000', '')

    # Wrong email
    invalid_path = path.dup.sub!('elora@example.com', 'invalid@gmail.com')
    visit invalid_path
    page.assert_current_path('/login')
    assert page.has_content? 'Invalid reset password link or unactivated account.'

    # Inactive user
    @user.toggle!(:activated)
    visit path
    page.assert_current_path('/login')
    assert page.has_content? 'Invalid reset password link or unactivated account.'
    @user.toggle!(:activated)

    # Right email, right roken
    visit path

    # Empty password
    click_button 'Reset password'
    assert page.has_content? 'Password is required'

    # Invalid password & confirmation
    fill_in 'New password', with: 'foo', match: :prefer_exact
    fill_in 'New password confirmation', with: 'bar', match: :prefer_exact
    click_button 'Reset password'
    assert page.has_content? 'Passwords do not match'

    # Valid password & confirmation
    fill_in 'New password', with: 'newpassword', match: :prefer_exact
    fill_in 'New password confirmation',
            with: 'newpassword',
            match: :prefer_exact
    click_button 'Reset password'
    page.assert_current_path('/login')
    assert page.has_content? 'Password has been successfully reset. You can now log in.'
    fill_in 'Email', with: @user.email
    fill_in 'Password', with: 'newpassword', match: :prefer_exact
    click_button 'Log In'
    page.assert_current_path('/')
  end

  test 'expired token' do
    visit '/login'
    click_on 'Forgot your password?'
    fill_in 'Email', with: @user.email
    click_button 'Reset password'
    page.assert_current_path('/login')
    @user.update_attribute(:reset_sent_at, 3.hours.ago)
    email = ActionMailer::Base.deliveries.last
    html = Nokogiri.HTML(email.html_part.body.to_s)
    target_link = html.at("a:contains('Reset password')")
    path =
      CGI.unescapeHTML(target_link['href']).sub!('http://localhost:3000', '')
    visit path
    page.assert_current_path('/login')
    assert page.has_content? 'Password reset has expired.'
  end
end
