# glitch-node-intern

This is a challenge for a fulltime NodeJs Backend Intern at [Glitch](https://glitch.com).

You can have [the live preview here](http://redjanvier-node-intern.glitch.me)

## Problem Statement

Create an API which recieves CSV URL, Validates it and filters by selected fields and provides a JSON response.

For more details about the problem visit [this link](https://hirng-x2021.glitch.me/backend?s=09)

## Routes
Endpoint:
```
POST /
```
Sample Payload:
```
{
  "csv":{
    "url": "https://linktocsv",
    "select_fields": ["First Name", "Last Name", "Age"],
  }
}
```
Sample Response:
```
[
  {
    "First Name":"Ade",
    "Last Name":"Stark",
    "Age": 21 
  },
  {
    "First Name":"Ade",
    "Last Name":"Stark",
    "Age": 21 
  }
]
```

## Credits

- CSV URL [LIST HERE](https://people.sc.fsu.edu/~jburkardt/data/csv/csv.html) which you can use to test the API
- GET_CSV [NPM HERE](https://www.npmjs.com/package/get-csv)

Made with :heart: [RedJanvier](https://github.com/redjanvier)
