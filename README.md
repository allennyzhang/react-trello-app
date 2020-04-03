This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Download Source Code

Open `cmd` and locate to your source code folder,then copy `git clone from https://github.com/allennyzhang/react-trello-app.git` into opened command and run.<br />

## Available Scripts

In the project directory, you can run:

### `yarn install`

After downloaded source code, on the opened command, cd to `react-trello-app` folder and install all the dependencies by command of `yarn`

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### `implemented features`
- Create a single page that lists all columns with their respective cards.<br />
    Each column is defined by a title and the cards it contains.<br />
    Each card is defined by a mandatory title, an optional description and the column that it belongs to.
- The user should be able to:<br />
    display all columns with all cards,<br />
    create a new card,<br />
    modify a card,<br />
    delete a card,<br />
    add a column,<br />
    modify a column,<br />
    delete a column,<br />
- Cards and columns should be unique (i.e we should not see 2 cards or 2 columns with the same title).