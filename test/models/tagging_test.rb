require 'test_helper'

class TaggingTest < ActiveSupport::TestCase
  def setup
    @tagging = Tagging.new(pin: pins(:tomo), tag: tags(:japan))
  end

  test 'should be valid' do
    assert @tagging.valid?
  end

  test 'should require a tag' do
    @tagging.tag = nil
    assert_not @tagging.valid?
  end

  test 'should require a pin' do
    @tagging.pin = nil
    assert_not @tagging.valid?
  end
end
