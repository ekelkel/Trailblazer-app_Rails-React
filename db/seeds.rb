# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Create a main user.
require 'random-location'

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

Faker::Config.locale = 'fr'
tags = %w[
  brunch
  bar
  japan
  beer
  breakfast
  bakery
  chinese
  italian
  fancy
  spicy
  cosy
  vegan
  outdoor
  cuban
  mexican
  pizza
  coffee
  pastry
]
# Generate pins for a subset of users
users = User.order(:created_at).take(6)
50.times do
  users.each do |user|
    name = Faker::Restaurant.name
    location = RandomLocation.near_by(48.856614, 2.3522219, 2000)
    latitude = location[0]
    longitude = location[1]
    address = Geocoder.search([latitude, longitude]).first.address
    comment = Faker::Restaurant.review.partition('.').first
    rating = Faker::Number.between(from: 1, to: 10)
    created_at = Faker::Time.between(from: 42.days.ago, to: Time.now)
    user.pins.create!(
      name: name,
      address: address,
      latitude: latitude,
      longitude: longitude,
      comment: comment,
      rating: rating,
      all_tags: tags.sample(4).join(','),
      created_at: created_at,
    )
  end
end

# Create following relationships.
# The first user follows users 3 through 51, users 4 through 41 follow that user back
users = User.all
user = users.first
following = users[2..50]
followers = users[3..40]
following.each { |followed| user.follow(followed) }
followers.each { |follower| follower.follow(user) }
