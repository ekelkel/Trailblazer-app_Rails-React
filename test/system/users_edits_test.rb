require 'application_system_test_case'

class UsersEditsTest < ApplicationSystemTestCase
  def setup
    @user = users(:elora)
  end

  test 'update personal info with invalid information' do
    visit '/login'
    fill_in 'Email', with: @user.email
    fill_in 'Password', with: 'password', match: :prefer_exact
    click_button 'Log In'
    find_by_id('menu-icon').click
    click_on 'Profile'
    fill_in('Name', with: '', fill_options: { clear: :backspace })
    fill_in('Email', with: 'invalid', fill_options: { clear: :backspace })
    fill_in 'New password', with: 'foo', match: :prefer_exact
    fill_in 'New password confirmation', with: 'bar', match: :prefer_exact
    click_button 'Update my profile'
    assert page.has_content? 'Name required'
    assert page.has_content? 'Email address is invalid'
    assert page.has_content? 'Password needs to be 8 characters or more'
    assert page.has_content? 'Passwords do not match'
  end

  test 'update personal info with valid information' do
    visit '/login'
    fill_in 'Email', with: @user.email
    fill_in 'Password', with: 'password', match: :prefer_exact
    click_button 'Log In'
    find_by_id('menu-icon').click
    click_on 'Profile'
    fill_in('Name', with: 'Micha', fill_options: { clear: :backspace })
    fill_in(
      'Email',
      with: 'micha@gmail.com',
      fill_options: {
        clear: :backspace,
      },
    )
    click_button 'Update my profile'
    assert page.has_content? 'Profile successfully updated!'
  end
end
