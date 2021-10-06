require 'test_helper'

class TagTest < ActiveSupport::TestCase
  def setup
    @tag = Tag.new(name: 'fun', color: 'FFBC1F')
    @invalid_tag = Tag.new(name: 'japan', color: 'FFBC1F')
  end

  test 'should be valid' do
    assert @tag.valid?
  end

  test 'name should be unique' do
    assert_not @invalid_tag.valid?
  end

  test 'should require a name' do
    @tag.name = nil
    assert_not @tag.valid?
  end

  test 'should require a color' do
    @tag.color = nil
    assert_not @tag.valid?
  end
end
