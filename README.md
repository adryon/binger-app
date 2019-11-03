This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment


# `Binger Components Guide`

## Button

### Props

`icon`: Icon of the button (Required: false, Default: none);

`text`: Text of the button (Required: false, Default: none);

`type`: Type of the button (Required: false, Default: `button`, Options: `submit`, `button`);

`shape`: Shape of the button (Required: false, Default: `normal`, Options: `normal`, `circle`);

### Methods

`onButtonClick`: Handler for the click event


## Input

### Props

`label`: Label above the input (Required: false, Default: none);

`icon`: Icon of the input (Required: false, Default: none);

`placeholder`: Placeholder of the input (Required: false, Default: none);

`name`: Unique identifier (Required: if input is part of a form, Default: none);

`value`: The value of the input (Required: if input is not part of a form, to be able to retrieve the value of the input, Default: none);

`isValid`: Flag that changes the display of the input border if not valid (Required: false, Default: false);

`type`: Input type (Required: true, Default: `text`);

### Methods

`onInputChange`: Handler for the input change event;


## Notification

### Props

`options`: Options for each notification. (Required: true, Default: none);

options object can have the following properties:

`icon`: Icon of the notification (Required: false, Default: none);

`type`: Type of the notification that affects the border color (Required: None, Default: `info`, Opions: `info`, `error`, `success`, 'warning');

`duration`: Timer for notification display (Required: false, Default: 3000);

`title`: Text to be displayed in the upper part of the notification (Required: none, Default: none);

`title`: Smaller text to be displayed in the lower part of the notification (Required: none, Default: none);

### Methods

`notification`: Method to invoke a notification display (arguments: `options` object);

## Form

### Methods

`onSubmit`: Method to handle the submitting process of the form;
