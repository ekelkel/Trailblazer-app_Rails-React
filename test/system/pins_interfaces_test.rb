require 'application_system_test_case'

class PinsInterfacesTest < ApplicationSystemTestCase
  def setup
    @user = users(:elora)
    @other_user = users(:paul)
  end

  test 'pin interface' do
    visit '/login'
    fill_in 'Email', with: @user.email
    fill_in 'Password', with: 'password', match: :prefer_exact
    click_button 'Log In'
    page.assert_current_path('/')
    assert page.has_content? "Welcome #{@user.name}!"
    assert find_by_id('feed-items-list').all('li').size == 30
    click_on 'ADD PLACE'
    page.assert_current_path('/add_pin')

    # Invalid submission
    click_on 'Pin this location'
    assert page.has_content? 'Name required'
    assert page.has_content? 'Address is required'

    # Valid submission
    fill_in 'Name', with: 'Le Comptoir Général'
    fill_in 'Add a comment about this place...',
            with:
              'The atmosphere is fun and distinctly Parisian. If you’re exploring Canal St. Martin this is a worthy point to stop.'
    fill_in('Address', with: '84 Quai De Jemmapes')
      .send_keys(:space)
      .send_keys(:down)
      .send_keys(:return)

    sleep 2
    click_on 'Pin this location'

    #click_on 'Pin this location'
    page.assert_current_path('/')
    assert page.has_content? 'Pin successfully created!'

    # first_pin = @user.pins.paginate(page: 1).first
    assert page.has_content? 'Le Comptoir Général'
    assert page.has_content? 'The atmosphere is fun and distinctly Parisian. If you’re exploring Canal St. Martin this is a worthy point to stop.'
    assert page.has_content? '84 Quai De Jemmapes, 75010 Paris, France'

    # Delete pin
    first_pin = @user.pins.paginate(page: 1).first
    find_by_id("delete-pin-#{first_pin.id}").click
    sleep 2
    assert page.has_content? 'Pin successfully deleted!'
    assert page.has_no_content? 'Le Comptoir Général'
    assert page.has_no_content? 'The atmosphere is fun and distinctly Parisian. If you’re exploring Canal St. Martin this is a worthy point to stop.'
    assert page.has_no_content? '84 Quai De Jemmapes, 75010 Paris, France'

    # Visit different user (no delete button)
    visit "/user/#{@other_user.id}"
    first_pin = @other_user.pins.paginate(page: 1).first
    assert_raises(Capybara::ElementNotFound) do
      find_by_id("delete-pin-#{first_pin.id}")
    end
  end
end
