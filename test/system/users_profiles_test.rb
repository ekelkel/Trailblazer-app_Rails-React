require 'application_system_test_case'

class UsersProfilesTest < ApplicationSystemTestCase
  def setup
    @user = users(:elora)
    @pin = pins(:tomo)
    @same_tag_pin = pins(:boneshaker)
    @other_pin = pins(:most_recent)
  end

  test 'profile display' do
    visit '/login'
    fill_in 'Email', with: @user.email
    fill_in 'Password', with: 'password', match: :prefer_exact
    click_button 'Log In'
    find_by_id('menu-icon').click
    click_on 'My profile'
    page.assert_current_path("/user/#{@user.id}")
    assert page.has_content? "#{@user.name}"
    assert page.has_content? "#{@user.pins.count} pins"
    assert find_by_id('pins-list').all('li').size == 30
    first_pin = @user.pins.paginate(page: 1).first
    assert page.has_content? "#{first_pin.name}"
    assert page.has_content? "#{first_pin.address}"
    assert page.has_content? "#{first_pin.comment}"

    # Filter by tags
    tag = Tag.find_by_name('pastry')
    other_tag = Tag.find_by_name('japan')
    find_by_id("tag-#{tag.id}").click
    assert page.has_content? "#{@pin.name}"
    assert page.has_content? "#{@same_tag_pin.name}"
    assert page.has_no_content? "#{@other_pin.name}"
    find_by_id("tag-#{other_tag.id}").click
    assert page.has_content? "#{@pin.name}"
    assert page.has_no_content? "#{@same_tag_pin.name}"
    find_by_id("tag-#{tag.id}").click
    find_by_id("tag-#{other_tag.id}").click
    assert page.has_content? "#{@other_pin.name}"
    assert page.has_content? "#{@pin.name}"
    assert page.has_content? "#{@same_tag_pin.name}"

    # Display map
    find_by_id('map', visible: :all).click
    find_by_id("tag-#{tag.id}").click
    find_by_id("pin-#{@pin.id}").click
    assert page.has_content? "#{@pin.name}"
  end
end
