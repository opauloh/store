
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

//App Code
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

// Action Creator
function addTodoAction(todo) {
    return {
        type: ADD_TODO,
        todo
    }
}

// Reducer function
function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return state.concat([action.todo])
        case REMOVE_TODO:
            return state.fiter(todo => todo.id !== action.id)
        case TOGGLE_TODO:
            return state.map(todo => todo.id !== action.id ? todo :
                { ...state, complete: !state.complete })
        default:
            return state;
    }
}

function goals(state = [], action) {
    switch (action.type) {
        case ADD_GOAL:
            return state.concat([action.goal])
        case REMOVE_GOAL:
            return state.fiter(goal => goal.id !== action.id)
        default:
            return state
    }
}

function app(state = {}, action) {
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action)
    }
}




// const store = createStore(todos);
const store = createStore(app);
store.subscribe(() => {
    console.log('The new state is: ', store.getState());
});

const unsubscribe = store.subscribe(() => {
    console.log('woooot 2');
});
unsubscribe()
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