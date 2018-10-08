# Yabe Browser

Technologies used in this project include React.js, HTML, SASS, JavaScript, JSX, and the DOM.

This client will connect to my heroku database where a user can create, read, update and destroy auction items, pending authentication, and provided ownership using Mongodb.

# Heroku API Repo:

https://TBD

## Live Sites:

https://TBD \
https://TBD

## Planning

My plan for coding this project was to segment elements into re-usable components to be used to develop and implement features dynamically. Firstly, deploy my backend mongodb for login functionality including sign in, sign up, change password and sign out. Secondly, add a new schema to the database for users to add auction items. Finally, to implement form handlers for user submissions and CRUD requests.

### Unsolved Issues:

Will update upon project completion

# User stories:

Version 1: \
As a user, I want to be able to log in to my account \
As a user, I want to be able to see a list of auctions. \
As a user, I want to be able to see a single auction item. \
As a user, I want to be able to bid on an item. \
As a user, I want to be able to edit my auction items. \
As a user, I need to be able to remove my items.

Version 2: \
As a user, I want to have many lists, composed of many different items \
As a user, I want to see on a map where all my activities are

### Wireframe:

![Image of View](./public/view.jpg)
![Image of Unauthorized](./public/unauthorized.jpg)
![Image of Authorized](./public/authorized.jpg)

## Structure

Currently, the top-level `Auth` component stores the currently authenticated
user in state, as well as data related to the flash messages. `Auth` renders the
`Header` component, and a list of routes, each of which render a component from
`src/auth/components`. The `auth` directory has two non-component files, `api`
and `messages`, which contain all the needed `fetch` calls, and messages to
display when API calls succeed or fail, respectively.

## Features

### `<AuthenticatedRoute />`

Component for creating routes that require a
user to be authenticated before visiting. This component lives in
`src/auth/components/AuthenticatedRoute.js` and is already required in `Auth`.
It's a thin wrapper around React Router's `<Route />` component. The only
difference is that it expects a prop called `user`, and if that prop is falsy,
it will render a `<Redirect />` that takes the user to `/`. **If you want to use
it, you must pass it the currently authenticated as a prop!**

It supports both the `component=` and `render=` attributes, but like `<Route />`
it will not forward props to the component if you use `component=`.

### Flash Messages

The `Auth` component has a rudimentary version of flash messages. To use it,
pass `this.flash` into a subcomponent of `Auth` as a prop and call it from there.
It expects two arguments: a message to display, and a message type, which is one
of `'flash-success'`, `'flash-warning'`, and `'flash-error'` which make the
message green, yellow, and red, respectively. You must pass one of these types.
You can add more types by adding more CSS rules in `Auth.scss`.

In the auth components, flash messages are used in conjunction with the
 `auth/messages` file to select from a list of predefined success/failure
 messages. To undertand how to do this, look at the definition of `flash` in
 `Auth.js`, the `signUp` method in `auth/components/SignUp.js`, and the
 `auth/messages.js` file.

 To change the duration of the message, replace `2000` with a value of your
 choice (in milliseconds) in the `flash` method definition in `Auth.js`.
