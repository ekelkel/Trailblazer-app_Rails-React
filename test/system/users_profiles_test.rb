require 'application_system_test_case'

class UsersProfilesTest < ApplicationSystemTestCase
  def setup
    @user = users(:elora)
    @pin = pins(:tomo)
    @same_tag_pin = pins(:boneshaker)
    @other_pin = pins(:most_recent)
    @new_user = users(:homer)
  end

  test 'should redirect user page when not logged in' do
    visit "/user/#{@user.id}"
    page.assert_current_path('/')
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
    last_pin = @user.pins.paginate(page: 1).last
    assert page.has_content? "#{last_pin.name}"
    assert page.has_content? "#{last_pin.address}"
    assert page.has_content? "#{last_pin.comment}"
    click_on '2'
    first_pin_second_page = @user.pins.paginate(page: 2).first
    assert page.has_content? "#{first_pin_second_page.name}"
    assert page.has_content? "#{first_pin_second_page.address}"
    assert page.has_content? "#{first_pin_second_page.comment}"
  end

  test 'filter pins by tags' do
    visit '/login'
    fill_in 'Email', with: @user.email
    fill_in 'Password', with: 'password', match: :prefer_exact
    click_button 'Log In'
    find_by_id('menu-icon').click
    click_on 'My profile'

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
    assert page.has_no_content? "#{@other_pin.name}"
    find_by_id("tag-#{tag.id}").click
    find_by_id("tag-#{other_tag.id}").click
    assert page.has_content? "#{@other_pin.name}"
    assert page.has_content? "#{@pin.name}"
    assert page.has_content? "#{@same_tag_pin.name}"

    # Display map
    find_by_id('map', visible: :all).click
    find_by_id("pin-#{@other_pin.id}").click
    assert page.has_content? "#{@other_pin.name}"
    find_by_id("tag-#{tag.id}").click
    assert_raises(Capybara::ElementNotFound) do
      find_by_id("pin-#{@other_pin.id}")
    end
    find_by_id('map', visible: :all).click
    assert page.has_content? "#{@pin.name}"
    assert page.has_content? "#{@same_tag_pin.name}"
    assert page.has_no_content? "#{@other_pin.name}"
  end

  test 'delete pin on profile' do
    visit '/login'
    fill_in 'Email', with: @user.email
    fill_in 'Password', with: 'password', match: :prefer_exact
    click_button 'Log In'
    find_by_id('menu-icon').click
    click_on 'My profile'
    first_pin = @user.pins.paginate(page: 1).first
    assert_difference '@user.pins.count', -1 do
      find_by_id("delete-pin-#{first_pin.id}").click
      sleep 2
    end
    assert page.has_content? "#{@user.pins.count} pins"
    assert page.has_content? 'Pin successfully deleted!'
  end

  test 'empty profile' do
    visit '/login'
    fill_in 'Email', with: @new_user.email
    fill_in 'Password', with: 'password', match: :prefer_exact
    click_button 'Log In'
    find_by_id('menu-icon').click
    click_on 'My profile'
    assert page.has_content? "It's a little quiet out here."
    assert page.has_content? 'Add any place in the world to create your own map with all your favorite places.'
    click_on 'Add my first place'
    page.assert_current_path('/add_pin')
  end
end
