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

  test 'should not destroy when not logged in' do
    assert_no_difference 'Pin.count' do
      delete pin_path(@pin)
    end
  end
end
