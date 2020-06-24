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
// Here we are Leveraging constants
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

function removeTodoAction(id) {
    return {
        type: REMOVE_TODO,
        id
    }
}

function toggleTodoAction(id) {
    return {
        type: TOGGLE_TODO,
        id
    }
}

function addGoalAction(goal) {
    return {
        type: ADD_GOAL,
        goal
    }
}

function removeGoalAction(id) {
    return {
        type: REMOVE_GOAL,
        id
    }
}



// Reducer function
function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return state.concat([action.todo])
        case REMOVE_TODO:
            return state.filter(todo => todo.id !== action.id)
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
            return state.filter(goal => goal.id !== action.id)
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



/*
// const store = createStore(todos);
const store = createStore(app);
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
