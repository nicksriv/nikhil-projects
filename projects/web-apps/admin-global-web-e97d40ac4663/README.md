<h1>V5Global Admin</a></h1>

<h2 id="availablescripts">Getting started</h2>

<p>In the project directory, you can run:</p>

<h3 id="npmstart"><code>npm start</code></h3>

<p>Runs the app in the development mode.<br>
Open <a href="http://localhost:3000">http://localhost:3000</a> to view it in the browser.</p>

<p>The page will reload if you make edits.<br>
You will also see any lint errors in the console.</p>

<h3 id="npmrunbuild"><code>npm run build</code></h3>

<p>Builds the app for production to the <code>build</code> folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.</p>

<p>The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!</p>

# User Guide

You can find detailed instructions on using Create React App and many tips in [its documentation](https://facebook.github.io/create-react-app/).

## Naming Conventions

Filename: Use PascalCase for filenames. E.g., ReservationCard.jsx.
Reference Naming: Use PascalCase for React components and camelCase for their instances, functions and variables. eslint: react/jsx-pascal-case

```sh
import ReservationCard from './ReservationCard';
const reservationItem = <ReservationCard />;
```

Component Naming: 

Use the filename as the component name. For example, ReservationCard.js should have a reference name of ReservationCard. However, for root components of a directory, use index.js as the filename and use the directory name as the component name:

```sh
import Footer from './Footer';
```

Higher-order Component Naming: 
Use a composite of the higher-order component’s name and the passed-in component’s name as the displayName on the generated component. For example, the higher-order component withFoo(), when passed a component Bar should produce a component with a displayName of withFoo(Bar).

Why? A component’s displayName may be used by developer tools or in error messages, and having a value that clearly expresses this relationship helps people understand what is happening.

```sh
export default function withFoo(WrappedComponent) {
  function WithFoo(props) {
    return <WrappedComponent {...props} foo />;
  }

  const wrappedComponentName = WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';

  WithFoo.displayName = `withFoo(${wrappedComponentName})`;
  return WithFoo;
}
```

Props Naming: 
Avoid using DOM component prop names for different purposes. Always use camelCase for prop names.

```sh
<MyComponent variant="fancy" />
```