/*
There are usually three stages of an asynchronous request. 
First is the start of the request, second is if the request succeeds, 
and third is if the request fails. 
The best UIs account for and inform the user about each stage.

It’s important that your state accounts for each of these stages.
If we were to design the initial state of a specific reducer based on the
paragraph above, that would probably look something like this
*/

const initialState = {
  data: [],
  isFetching: false,
  error: ''
}
/*
Now the reducer that corresponds with that initial state might look 
like this
*/
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCHING_DATA':
      return {
        ...state,
        isFetching: true
      }
    case 'FETCHING_DATA_ERROR':
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case 'FETCHING_DATA_SUCCESS':
      return {
        ...state,
        isFetching: false,
        error: null,
        data: action.data
      }
  }
}

/*
Notice that we’re handling every possible situation.
Begin request, request succeeded, request failed. Now that we have our
reducer and initial state, our actions creators should be obvious.
*/

function fetchingData() {
  return {
    type: 'FETCHING_DATA'
  }
}

function fetchingDataError(error) {
  return {
    type: 'FETCHING_DATA_ERROR',
    error: error.msg
  }
}

function fetchingDataSuccess(data) {
  return {
    type: 'FETCHING_DATA_SUCCESS',
    data,
  }
}

/*
Now a common situation for when we want to make an asynchronous request is
when a component will mount. Pretend we have a function called getData that is
asynchronous and returns us a promise. Let’s see how getData will interact
with our action creators above.
*/
class App {
  componentDidMount() {
    this.props.dispatch(fetchingData())

    getData()
      .then((data) =>
        this.props.dispatch(fetchingDataSuccess(data))
      )
      .catch((error) =>
        this.props.dispatch(fetchingDataError(error))
      )
  }
}

/*
Now this doesn’t look too bad, but it’s kind of a pain to have to import all
of those action creators into our component and then mix that data fetching
logic with our UI logic. The reason we’re having to make an async request
is because the action creators need that data which doesn’t exist locally.
Well, if it’s the action creators which need certain data, why don’t we give
the responsibility of getting that data to the action creators themselves
rather than relying on the component to do that?

Assuming we had an action creator that was able to do this called
fetchAndHandleData, our componentDidMount would then look like this,
*/

class App {
  componentDidMount() {
    this.props.dispatch(fetchAndHandleData())
  }
}

/*
Much nicer, right? And now we’ve kept all of those other action creators
locally scoped to their file as well as not polluting our component code with
the data fetching code.

But now in order to do this, we’re going to need to have access to dispatch in
our action creator somehow. To do this, we created a custom middleware which is
responsible for checking if the action was an object or a function.
If it’s an object, it behaves as it normally does. If it’s a function, it
invokes it passing it dispatch.
*/
const thunk = (store) => (next) => (action) => {
  if (typeof action === 'function') {
    return action(store.dispatch)
  }
  return next(action)
}
/*
Now, assuming we’ve told our store about our thunk middleware, we can now
move the data fetching logic from our components to our action creators.
*/
export function fetchAndHandleData() {
  return (dispatch) => {
    dispatch(fetchingData())
    getData()
      .then((data) => dispatch(fetchingDataSuccess(data)))
      .catch((error) => dispatch(fetchingDataError(error)))
  }
}
