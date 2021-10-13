# Trailblazer App - Bookmark your favorite places around the world and share them 🗺

### Built with Ruby on Rails & React

## The project

Trailblazer is a [Mapstr](https://mapstr.com/) clone that lets its users bookmark their favorite places on a world map, sort them by tags and share them with their friends.

## What it looks like

![Trailblazer Login](https://raw.githubusercontent.com/ekelkel/Trailblazer-app_Rails-React/main/app/javascript/src/assets/login.png)
![Trailblazer Map](https://raw.githubusercontent.com/ekelkel/Trailblazer-app_Rails-React/main/app/javascript/src/assets/map.png)
![Trailblazer Profile](https://raw.githubusercontent.com/ekelkel/Trailblazer-app_Rails-React/main/app/javascript/src/assets/profile.png)
![Trailblazer AddPlace](https://raw.githubusercontent.com/ekelkel/Trailblazer-app_Rails-React/main/app/javascript/src/assets/addplace.png)

## Roadmap

- 🔔 real-time notifications

## How to quickly try it?

👀 The project is hosted on Heroku: https://trailblaazer.herokuapp.com/

💡 If you don't want to go through the sign-up process, here are login credentials you can use:

```
* trailblazer@test.com // testtrailblazer
```
## Running it locally

You'll need a [Mapbox access token](https://docs.mapbox.com/help/glossary/access-token/) and to set the following environment variable in `.env`:
```
REACT_APP_MAPBOX_TOKEN: xxxxxxxxxxxxxx
```
- clone the repository and install the gems `bundle install`
- create a role in Postgres that your Rails application will use later to create your database with username 'trailblazer' and password 'trailblazer'
- run `rails db:create`
- run `rails db:migrate`
- run `yarn install`
- run `rails s`
- navigate to `http://localhost:3000`

To run all unit tests: run `rails test`
To run all integration tests: run `rails test:system`

## The stack

### Back

- [Ruby on Rails](https://rubyonrails.org/)
- [Postgres](https://www.postgresql.org/)
- [AWS](https://aws.amazon.com/fr/s3/) : images hosting

### Front

- [React](https://reactjs.org/)
- [MUI](https://mui.com/) : React UI framework

### API

- [Mapbox](https://www.mapbox.com/)
- [Sendgrid](https://docs.sendgrid.com/for-developers/sending-email/rubyonrails)
