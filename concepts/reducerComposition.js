/*
Reducer composition sounds intimidating, but it’s simpler than you might think.
The idea is that you can create a reducer to manage not only each section of your
Redux store, but also any nested data as well.

Let’s say we were dealing with a state tree that had this shape.

{
    users: { },
    setting: { },
    tweets: {
        btyxlj: {
            id: 'btyxlj',
                text: 'What is a jQuery?',
                    author: {
                name: 'Tyler McGinnis',
                    id: 'tylermcginnis',
                        avatar: 'twt.com/tm.png'
            }
        }
    }
}

We have three main properties on our state tree, users, settings, and tweets. 
Naturally, we’d create an individual reducer for each of those then create a 
single root reducer using Redux’s combineReducers method.
*/
const reducer = combineReducers({
    users,
    settings,
    tweets
})
/*
combineReducers, under the hood, is our first look at reducer composition. 
combineReducers is responsible for invoking all the other reducers, passing them 
the portion of the state that they care about. We’re making one root reducer, 
by composing a bunch of other reducers together. With that in mind, let’s take a 
closer look at our tweets reducer and how we can leverage reducer composition 
again to make it more compartmentalized. Specifically, let’s look how a user 
might change their avatar with the way our store is currently structured.

Here’s the skeleton with what we’ll start out with -
*/

function tweets(state = {}, action) {
    switch (action.type) {
        case ADD_TWEET:
        //   ...
        case REMOVE_TWEET:
        //   ...
        case UPDATE_AVATAR:
        //   ???
    }
}
/*
What we’re interested in is that last one, UPDATE_AVATAR. This one is interesting
because we have some nested data - and remember, reducers have to be pure and 
can’t mutate any state.

Here’s one approach.
*/
function tweets(state = {}, action) {
    switch (action.type) {
        case ADD_TWEET:
        //   ...
        case REMOVE_TWEET:
        //   ...
        case UPDATE_AVATAR:
            return {
                ...state,
                [action.tweetId]: {
                    ...state[action.tweetId],
                    author: {
                        ...state[action.tweetId].author,
                        avatar: action.newAvatar
                    }
                }
            }
    }
}
/*
That’s a lot of spread operators.The reason for that is because, for every layer,
we’re wanting to spread all the properties of that layer on the new objects we’re
creating(because, immutability). What if, just like we separated our tweets, 
users, and settings reducers by passing them the slice of the state tree they 
care about, we do the same thing for our tweets reducer and its nested data ?

Doing that, the code above would be transformed to look like this.
*/

function author(state, action) {
    switch (action.type) {
        case 'UPDATE_AVATAR':
            return {
                ...state,
                avatar: action.newAvatar
            }
        default:
            return state
    }
}

function tweet(state, action) {
    switch (action.type) {
        case 'ADD_TWEET':
        //   ...
        case 'REMOVE_TWEET':
        //   ...
        case 'UPDATE_AVATAR':
            return {
                ...state,
                author: author(state.author, action)
            }
        default:
            return state
    }
}

function tweets(state = {}, action) {
    switch (action.type) {
        case 'ADD_TWEET':
        //   ...
        case 'REMOVE_TWEET':
        //   ...
        case 'UPDATE_AVATAR':
            return {
                ...state,
                [action.tweetId]: tweet(state[action.tweetId], action)
            }
        default:
            return state
    }
}
/*
All we’ve done is separated out each layer of our nested tweets data into their
own reducers. Then, just like we did with our root reducer, we’re passing those
reducers the slice of the state they care about.
*/
