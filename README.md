# Getting Started with <%= projectName %>

This react v18 project was bootstrapped with [generator-react-typescript-template](https://github.com/wasichris/generator-react-typescript-template).

<br>

## Developing Environment

It is recommended to use [Visual Studio Code](https://code.visualstudio.com/) for development. Some useful extensions you might need as below:
* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
* [SCSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-scss)

<br>

## Related Packages

The project is using several packages to take care of each requirement as below:
* [React Router](https://reactrouter.com/en/main) : route control
* [React i18n](https://react.i18next.com/) : internationalization framework
* [Redux Toolkit](https://redux-toolkit.js.org/) : global state control and api client (RTK Query)
* [Redux Persist](https://github.com/rt2zz/redux-persist) : persist global state
* [Formik](https://formik.org/) : form validation control
* [Yup](https://github.com/jquense/yup) : validation rules
* [clsx](https://github.com/lukeed/clsx) : conditional classname control
* [msw](https://mswjs.io/) : mock service worker
* [sass](https://github.com/sass/dart-sass) : sass


<br>

## Available Scripts

In the project directory, you can run:


### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

<br>

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.


<br> 


### `npm run build:[env]`

According to your target environment to choose following commands:
```
$ npm run build:dev
$ npm run build:sit
$ npm run build:uat
$ npm run build:prod
```

Each environment variable will be setup as below:

| Build Script  | Environment Variable  |
|--------------------------|--------------------------------------------------------------------|
| `npm run build:dev`  | NODE_ENV=<kbd>production</kbd> <br> REACT_APP_MODE=<kbd>DEV</kbd>  |
| `npm run build:sit`  | NODE_ENV=<kbd>production</kbd> <br> REACT_APP_MODE=<kbd>SIT</kbd>  |
| `npm run build:uat`  | NODE_ENV=<kbd>production</kbd> <br> REACT_APP_MODE=<kbd>UAT</kbd>  |
| `npm run build:prod` | NODE_ENV=<kbd>production</kbd> <br> REACT_APP_MODE=<kbd>PROD</kbd> |


Builds the app for production in each mode to the `build` folder.

Your app is ready to be deployed!

> If your website is not located in the root directory, you should modify the PUBLIC_URL information in the build script in your package.json file. If you do not set PUBLIC_URL to match the location of your sub-directory, the path for your static resources may not be correct.