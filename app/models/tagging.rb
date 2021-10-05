class Tagging < ApplicationRecord
  belongs_to :tag
  belongs_to :pin
  validates :tag, presence: true
  validates :pin, presence: true
end
