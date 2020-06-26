/*
What does Redux Middleware allow you to do?
Hook into the moment after dispatching an action but before that action reaches the reducer.

Syntax for creating a Redux Middleware:
*/
const middleware = (store) => (next) => (action) => {

}
/*
Here are some popular packages in the Redux ecosystem that are implemented via middleware.

https://github.com/agraboso/redux-api-middleware
redux-api-middleware: Redux middleware for calling an API.

https://github.com/evgenyrodionov/redux-logger
redux-logger: Logger middleware for Redux.

https://github.com/pburtchaell/redux-promise-middleware
redux-promise-middleware: Redux middleware for resolving and rejecting promises with conditional optimistic updates.

https://github.com/gaearon/redux-thunk
redux-thunk: Thunk middleware for Redux.

https://github.com/jeffbski/redux-logic
redux-logic: Redux middleware for organizing business logic and action side effects.

https://github.com/redux-observable/redux-observable
redux-observable: RxJS middleware for action side effects in Redux using “Epics”.

https://github.com/conorhastings/redux-test-recorder
redux-test-recorder: Redux middleware to automatically generate tests for reducers through ui interaction.

https://github.com/ezekielchentnik/redux-reporter
redux-reporter: Report actions &amp; metadata to 3rd party providers, extremely useful for analytics and error handling (New Relic, Sentry, Adobe DTM, Keen, etc.)

https://github.com/elgerlambert/redux-localstorage
redux-localstorage: Store enhancer that syncs (a subset) of your Redux store state to localStorage.

https://github.com/low-ghost/redux-node-logger
redux-node-logger: A Redux Logger for Node Environments

https://github.com/sergiodxa/redux-catch
redux-catch: Error catcher middleware

https://github.com/grofers/redux-cookies-middleware/
redux-cookies-middleware: a Redux middleware which syncs a subset of your Redux store state with cookies.

https://github.com/conorhastings/redux-test-recorder
redux-test-recorder: Redux test recorder is a redux middleware + included component for automagically generating tests for your reducers based on the actions in your app

*/