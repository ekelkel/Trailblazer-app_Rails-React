require 'test_helper'

class PinTest < ActiveSupport::TestCase
  def setup
    @user = users(:elora)

    @pin =
      @user.pins.build(
        name: 'TOMO',
        address: '11 Rue Chabanais, 75002 Paris',
        latitude: 48.867610,
        longitude: 2.336900,
        rating: 9,
        comment:
          'Café chic de style japonais proposant thé vert, plats de nouilles et dorayakis',
      )
  end

  test 'should be valid' do
    assert @pin.valid?
  end

  test 'user id should be present' do
    @pin.user_id = nil
    assert_not @pin.valid?
  end

  test 'name should be present' do
    @pin.name = ' '
    assert_not @pin.valid?
  end

  test 'address should be present' do
    @pin.address = ' '
    assert_not @pin.valid?
  end

  test 'comment should be at most 255 characters' do
    @pin.comment = 'a' * 256
    assert_not @pin.valid?
  end

  test 'order should be most recent first' do
    assert_equal pins(:most_recent), Pin.first
  end
end
