require 'application_system_test_case'

class UsersProfilesTest < ApplicationSystemTestCase
  def setup
    @user = users(:elora)
  end

  test 'profile display' do
    visit '/login'
    fill_in 'Email', with: @user.email
    fill_in 'Password', with: 'password', match: :prefer_exact
    click_button 'Log In'
    find_by_id('menu-icon').click
    click_on 'My locations'
    page.assert_current_path("/user/#{@user.id}")
    assert page.has_content? "#{@user.name}"
    assert page.has_content? "#{@user.pins.count} pins"
    assert find_by_id('pins-list').all('li').size == 30
    first_pin = @user.pins.paginate(page: 1).first
    assert page.has_content? "#{first_pin.name}"
    assert page.has_content? "#{first_pin.address}"
    assert page.has_content? "#{first_pin.comment}"
  end
end
