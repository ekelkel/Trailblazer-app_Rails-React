require 'application_system_test_case'

class UserRegistrationsTest < ApplicationSystemTestCase
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

    # Verify that the User was created
    assert page.has_content? 'We have received your request!'
  end
end
