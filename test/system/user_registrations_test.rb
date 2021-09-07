require 'application_system_test_case'

class UserRegistrationsTest < ApplicationSystemTestCase
  def setup
    @user = users(:elora)
    @other_user = users(:tim)
    ActionMailer::Base.deliveries.clear
  end

  test 'visiting home' do
    visit root_path
    assert page.has_content? 'Share your favorite'
  end

  test 'invalid signup information' do
    visit '/signup'
    fill_in 'Name', with: ''
    fill_in 'Email', with: 'userinvalid.com'
    fill_in 'Password', with: 'foo', match: :prefer_exact
    fill_in 'Password confirmation', with: 'bar', match: :prefer_exact
    click_button 'Register'
    assert page.has_content? 'Name required'
    assert page.has_content? 'Email address is invalid'
    assert page.has_content? 'Password needs to be 8 characters or more'
    assert page.has_content? 'Passwords do not match'
  end

  test 'signup with already used email' do
    visit '/signup'
    fill_in 'Name', with: 'Paul'
    fill_in 'Email', with: @user.email
    fill_in 'Password', with: 'password', match: :prefer_exact
    fill_in 'Password confirmation', with: 'password', match: :prefer_exact
    click_button 'Register'
    assert page.has_content? 'Email has already been taken.'
  end

  test 'valid signup information' do
    # Visit the registration page
    visit '/signup'

    # Submit the form
    fill_in 'Name', with: 'elora'
    fill_in 'Email', with: 'elora@gmail.com'
    fill_in 'Password', with: 'secretpassword', match: :prefer_exact
    fill_in 'Password confirmation',
            with: 'secretpassword',
            match: :prefer_exact
    click_button 'Register'
    assert page.has_content? 'Please check your email to activate your account.'

    # Try to log in before activation.
    visit '/login'
    fill_in 'Email', with: 'elora@gmail.com'
    fill_in 'Password', with: 'secretpassword', match: :prefer_exact
    click_button 'Log In'
    assert page.has_content? 'Account not activated. Check your email for the activation link.'

    # Invalid activation token
    visit '/activate_account?validationToken=invalid&email=elora@gmail.com'
    assert page.has_content? 'Invalid activation link'

    email = ActionMailer::Base.deliveries.last
    html = Nokogiri.HTML(email.html_part.body.to_s)
    target_link = html.at("a:contains('Activate')")
    path =
      CGI.unescapeHTML(target_link['href']).sub!('http://localhost:3000', '')

    # Valid token, wrong email
    invalid_path = path.dup.sub!('elora@gmail.com', 'invalid@gmail.com')
    visit invalid_path
    assert page.has_content? 'Invalid activation link'

    # Valid activation token
    visit path
    assert page.has_content? 'Account activated! You can now log in.'
  end
end
