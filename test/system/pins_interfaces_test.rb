require 'application_system_test_case'

class PinsInterfacesTest < ApplicationSystemTestCase
  def setup
    @user = users(:elora)
    @other_user = users(:paul)
  end

  test 'should redirect add_pin page when not logged in' do
    visit '/add_pin'
    page.assert_current_path('/')
  end

  test 'pin interface' do
    visit '/login'
    fill_in 'Email', with: @user.email
    fill_in 'Password', with: 'password', match: :prefer_exact
    click_button 'Log In'
    page.assert_current_path('/')
    assert find_by_id('feed-items-list').all('li').size == 30
    click_on 'ADD PLACE'
    page.assert_current_path('/add_pin')

    # Invalid submission
    click_on 'Pin this location'
    assert page.has_content? 'Name required'
    assert page.has_content? 'Address is required'

    # Ivalid image size
    page.attach_file(
      'upload_image',
      Rails.root + 'test/fixtures/files/pexels-helena-lopes-693267.jpg',
      make_visible: true,
    )
    assert page.has_content? 'File is too big. Should be less than 5MB.'

    # Valid submission
    fill_in 'Name', with: 'Le Comptoir Général'
    fill_in 'Add a comment about this place...',
            with:
              'The atmosphere is fun and distinctly Parisian. If you’re exploring Canal St. Martin this is a worthy point to stop.'
    fill_in('react-select-2-input', with: 'brunch').send_keys(:return)
    fill_in('Type an address', with: '84 Quai De Jemmapes, 75010 Paris')
    sleep 6
    find('.AutocompletePlace-items', match: :first).click
    page.attach_file(
      'upload_image',
      Rails.root + 'test/fixtures/files/pexels-helena-lopes-693269.jpg',
      make_visible: true,
    )
    click_on 'Pin this location'

    #click_on 'Pin this location'
    page.assert_current_path('/')
    assert page.has_content? 'Pin successfully created!'

    # first_pin = @user.pins.paginate(page: 1).first
    assert page.has_content? 'Le Comptoir Général'
    assert page.has_content? 'The atmosphere is fun and distinctly Parisian. If you’re exploring Canal St. Martin this is a worthy point to stop.'
    assert page.has_content? 'brunch'
    assert page.has_content? '84 Quai De Jemmapes, 75010 Paris, France'

    first_pin = @user.pins.paginate(page: 1).first
    url = rails_blob_url(first_pin.images[0])
    url = url.slice(url.index('/rails/active_storage')..-1)
    assert page.has_css?("img[src*=\"#{url}\"]")

    # Delete pin
    assert_difference '@user.pins.count', -1 do
      find_by_id("delete-pin-#{first_pin.id}").click
      sleep 2
    end
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
