class TagSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :color, :value, :label
  def value
    object.name
  end
  def label
    object.name
  end
end
