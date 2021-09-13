# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Create a main user.
User.create!(
  name: 'Example User',
  email: 'example@trailblazer.com',
  password: 'password',
  password_confirmation: 'password',
  activated: true,
  activated_at: Time.zone.now,
)

# Generate a bunch of additional users.
99.times do |n|
  name = Faker::Name.name
  email = "example-#{n + 1}@trailblazer.com"
  password = 'password'
  User.create!(
    name: name,
    email: email,
    password: password,
    password_confirmation: password,
    activated: true,
    activated_at: Time.zone.now,
  )
end

# Generate pins for a subset of users
users = User.order(:created_at).take(6)
50.times do
  name = Faker::Restaurant.name
  address = Faker::Address.full_address
  comment = Faker::Restaurant.review.partition('.').first
  rating = Faker::Number.between(from: 1, to: 10)
  users.each do |user|
    user.pins.create!(
      name: name,
      address: address,
      comment: comment,
      rating: rating,
    )
  end
end
