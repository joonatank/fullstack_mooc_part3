# Helsinki Fullstack MOOC backend
Part 3 exercises

NodeJS backend for Phonebook

## Usage

### Heroku
Deployed version can be found at:

https://fathomless-shore-94502.herokuapp.com/api/persons

### Installation
Prerequisits:

- npm: 6.10
- node: 12.9.0
- MongoDB (for example Atlas)

- git pull
- npm install
- setup .env
  * USERNAME
  * PASSWORD
  * MONGODB_URL

## API
HTTP commands using HTTPie

``` bash
# Get a full list of people in the phonebook
http get http://localhost:3001/api/persons

# Get a single person (using doc id)
# Indices are not persistent, they are updated after each change in the database
http get http://localhost:3001/api/persons/5d6517f054ee28716a44b8d0

# Delete single person (using doc id)
http delete http://localhost:3001/api/persons/5d6517f054ee28716a44b8d0

# Add a new person
http post http://localhost:3001/api/persons name="Foo" number=55-555-555555

# Change already existing person
http put http://localhost:3001/api/persons/5d6517f054ee28716a44b8d0 name="Foo" number=55-555-555555

# Get server info
http get http://localhost:3001/info

```

Errors
``` bash
# Other endpoints return 404: unknown endpoint error

# PUT and POST without name and number will return 400: missing name or number

# POST with an existing name will return 400: ${name} already exists

# GET with an index not in the database will return 404

# GET with a malformed index (NaN) will return 404: malformed index
```

