This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to start

There are multiple ways you can start this app:

## github.io

Go to https://lilsatya.github.io/ef-taskapp-frontend/<br>
And since the couchDB is not using SSL, you have to click the shield icon in URL bar for the connection to work.

Note that in github.io, the app is running on production environment.

## Docker

First install docker https://www.docker.com/<br>
Then you can pull the docker repo for this app by typing in console: docker pull lilsatya/ef-taskapp-frontend<br>
After successful, you can run the app by typing this: docker run -it -p 3000:3000 ef-taskapp-frontend:latest

Note that in docker, the app is running on development environment.

## Local

## IMPORTANT: copy .env file and rename it to .env.local

In the project directory, you can run:

### `yarn` or `npm install`

To install the package

### `yarn start` or `npm run start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test` or `npm run test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build` or `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

