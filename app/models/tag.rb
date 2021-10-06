class Tag < ApplicationRecord
  has_many :taggings
  has_many :pins, through: :taggings
  validates :name, presence: true, uniqueness: true
  validates :color, presence: true
end
