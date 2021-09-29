class PinSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id,
             :user_id,
             :name,
             :comment,
             :rating,
             :address,
             :longitude,
             :latitude,
             :created_at,
             :image
  def image
    if object.images.attached?
      #{ url: object.images.map { |image| rails_blob_url(image) } }
      { url: rails_blob_url(object.images[0], only_path: true) }
    end
  end
end
