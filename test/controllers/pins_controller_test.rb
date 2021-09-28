require 'test_helper'

class PinsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @pin = pins(:tomo)
  end

  test 'should not create when not logged in' do
    assert_no_difference 'Pin.count' do
      post pins_path,
           params: {
             pin: {
               name: 'Test',
               address: 'Test',
               rating: 10,
               comment: 'Lorem ipsum',
             },
           }
    end
  end

  test 'should not create when no name or address' do
    assert_no_difference 'Pin.count' do
      post pins_path, params: { pin: { name: '', address: '', comment: '' } }
    end
  end

  test 'valid pin creation' do
    log_in_as(users(:elora))
    assert_difference 'Pin.count', 1 do
      post pins_path,
           params: {
             pin: {
               name: 'Test',
               address: 'Test',
               comment: 'Lorem ipsum',
             },
           }
    end
  end

  test 'should not destroy when not logged in' do
    assert_no_difference 'Pin.count' do
      delete pin_path(@pin)
    end
  end

  test 'should not destroy wrong pin' do
    log_in_as(users(:elora))
    pin = pins(:hero)
    assert_no_difference 'Pin.count' do
      delete pin_path(pin)
    end
  end

  test 'should destroy valid pin' do
    log_in_as(users(:elora))
    assert_difference 'Pin.count', -1 do
      delete pin_path(@pin)
    end
  end
end
