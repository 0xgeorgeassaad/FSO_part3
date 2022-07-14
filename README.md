# The Phonebook app

Here is a link to our app delpoyed on Heroku [https://thephonebook-app.herokuapp.com/](https://thephonebook-app.herokuapp.com/)

## Frontend Build directory
This is the repo used to deploy the app to Heroku so the original react code is not attached but the app uses one App Component that wraps all other components 
it also uses react hooks and useState and useEffect to update and keep track of changing search field and the adding form.
- The build directory is bundled using `npm run build`
- you can use the `.rest` files is the requests folder to test the API endpoints using [REST Client in VSCode](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) or use a program like [Postman](https://www.postman.com/)
- for deploying to Heroku, you need to define a `.env` file which includes the connection string for MongoDB Atlas
