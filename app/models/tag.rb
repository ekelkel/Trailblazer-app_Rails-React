class Tag < ApplicationRecord
  has_many :taggings
  has_many :pins, through: :taggings
  validates :name, presence: true
end
