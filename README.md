# Helsinki Fullstack MOOC backend
Part 3 exercises

NodeJS backend for Phonebook

## API
HTTP commands using HTTPie

``` bash
# Get a full list of people in the phonebook
http get http://localhost:3001/api/persons

# Get a single person (using index)
# Indices are not persistent, they are updated after each change in the database
http get http://localhost:3001/api/persons/1

# Delete single person (using index)
http delete http://localhost:3001/api/persons/1

# Add a new person
http post http://localhost:3001/api/persons name="Foo" number=55-555-555555

# Change already existing person by index
http put http://localhost:3001/api/persons/1 name="Foo" number=55-555-555555

# Get server info
http get http://localhost:3001/info

```

Errors
``` bash
# Other endpoints return 404: unknown endpoint error

# PUT and POST without name and number will return 400: missing name or number

# GET with an index not in the database will return 404

# GET with a malformed index (NaN) will return 404: malformed index
```

## Heroku
Deployed version can be found at:

https://fathomless-shore-94502.herokuapp.com/api/persons
