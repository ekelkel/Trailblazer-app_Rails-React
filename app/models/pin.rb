class Pin < ApplicationRecord
  belongs_to :user
  has_many :taggings, dependent: :destroy
  has_many :tags, through: :taggings
  has_many_attached :images
  default_scope -> { order(created_at: :desc) }
  validates :user_id, presence: true
  validates :name, presence: true
  validates :address, presence: true
  validates :comment, length: { maximum: 255 }
  validates :images,
            blob: {
              content_type: %w[image/jpg image/jpeg image/png],
              max_size: 5.megabytes,
            }

  def all_tags=(names)
    self.tags =
      names
        .split(',')
        .map do |name|
          generator = ColorGenerator.new saturation: 0.3, value: 1.0
          color = generator.create_hex
          Tag.where(name: name.strip).first_or_create!(color: color)
        end
  end

  def all_tags
    formatted_tags = []
    self.tags.map do |tag|
      new_tag = Hash.new
      new_tag['name'] = tag.name
      new_tag['color'] = tag.color
      new_tag['id'] = tag.id
      formatted_tags.push(new_tag)
    end
    return formatted_tags
  end
end
