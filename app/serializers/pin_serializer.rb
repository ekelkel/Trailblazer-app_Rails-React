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
             :owner,
             :tags,
             :image

  def owner
    User.find(object.user_id).name
  end

  def tags
    object.all_tags
  end

  def image
    if object.images.attached?
      #{ url: object.images.map { |image| rails_blob_url(image) } }
      host = Rails.env.development? ? 'http://localhost:3000' : ''
      { url: host + rails_blob_url(object.images[0], only_path: true) }
    end
  end
end
