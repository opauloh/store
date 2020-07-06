/*
Characteristics of pure functions
    They always return the same result if the same arguments are passed in
    They depend only on the arguments passed into them
    Never produce any side effects
*/

function createStore(reducer) {
    // The store should have four parts
    // 1 the state
    // 2 get the state
    // 3 listen to changes on the state
    // 4 update the state

    let state;
    let listeners = [];

    // get the state
    const getState = () => state;

    // listen to changes on the state
    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener)
        }
    }


    const dispatch = (action) => {
        // call todos
        state = reducer(state, action)
        // loop over listeners and ivoke them
        listeners.forEach(listener => listener());

    }

    return {
        getState,
        subscribe,
        dispatch
    }
}

/*
// const store = createStore(todos);
const unsubscribe = store.subscribe(() => {
    console.log('The new state is: ', store.getState());
});

const unsubscribeAgain = store.subscribe(() => {
    console.log('woooot 2');
});
// unsubscribeAgain();

// store.dispatch({
//     type: 'ADD_TODO',
//     todo: {
//         id: 0,
//         name: 'Learn Redux',
//         complete: false
//     }
// });
store.dispatch(addTodoAction({
    id: 0,
    name: 'Learn Redux',
    complete: false
}))
store.dispatch(addTodoAction({
    id: 1,
    name: 'Learn React',
    complete: false
}))

store.dispatch(removeTodoAction(1));

store.dispatch(toggleTodoAction(0));

store.dispatch(addGoalAction({
    id: 0,
    name: 'Master React Eco-System'
}))

store.dispatch(addGoalAction({
    id: 1,
    name: 'Lose 5 pounds'
}))

store.dispatch(removeGoalAction(1));
*/
