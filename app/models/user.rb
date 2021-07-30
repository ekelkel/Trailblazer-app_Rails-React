class User < ApplicationRecord
  before_save :downcase_email
  validates :name, presence: true, length: { maximum: 50 }
  validates :email, presence: true, length: { maximum: 255 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email,
            presence: true,
            length: {
              maximum: 255,
            },
            format: {
              with: VALID_EMAIL_REGEX,
            },
            uniqueness: true
  has_secure_password
  validates :password, presence: true, length: { minimum: 8 }

  # Returns the hash digest of the given string.
  def User.digest(string)
    cost =
      if ActiveModel::SecurePassword.min_cost
        BCrypt::Engine::MIN_COST
      else
        BCrypt::Engine.cost
      end
    BCrypt::Password.create(string, cost: cost)
  end

  private

  # Converts email to all lower-case.
  def downcase_email
    email.downcase!
  end
end
