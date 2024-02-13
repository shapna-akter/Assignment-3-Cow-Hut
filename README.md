### Application Routes

##### User

POST api/v1/auth/signup

GET api/v1/users

GET api/v1/users/6177a5b87d32123f08d2f5d4 (Single GET) Include an id that is saved in your database

PATCH api/v1/users/6177a5b87d32123f08d2f5d4 (Include an id that is saved in your database)

DELETE api/v1/users/6177a5b87d32123f08d2f5d4 (Include an id that is saved in your database)

##### Cows

POST api/v1/cows

GET api/v1/cows

GET api/v1/cows/6177a5b87d32123f08d2f5d4 (Single GET) Include an id that is saved in your database

PATCH api/v1/cows/6177a5b87d32123f08d2f5d4 (Include an id that is saved in your database)

DELETE api/v1/cows/6177a5b87d32123f08d2f5d4 (Include an id that is saved in your database)

##### Pagination and Filtering routes of Cows

GET api/v1/cows?pag=1&limit=10

GET api/v1/cows?sortBy=price&sortOrder=asc

GET api/v1/cows?location=Chattogram

GET api/v1/cows?searchTerm=Cha

##### Orders

POST api/v1/orders

GET api/v1/orders

Please note that the routes above represent the endpoints available in the application.
