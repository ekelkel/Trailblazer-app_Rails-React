class Pin < ApplicationRecord
  belongs_to :user
  has_many_attached :images
  default_scope -> { order(created_at: :desc) }
  validates :user_id, presence: true
  validates :name, presence: true
  validates :address, presence: true
  validates :comment, length: { maximum: 255 }
end
