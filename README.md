# store

The best way to learn about redux, is to create my own store library, based on redux concepts

This library is for educatinal purposes, to learn about and understand reducers

### Benefits of putting your state into a single state tree:
- Shared cache
- Predictable state changes
- Improved developer tooling
- Pure functions
- Server rendering


### What makes up the "Store":
- The state tree
- A way to get state from the state tree
- A way to listen to updates on the state tree
- A way to update the state tree

### What is an action?
An object which describes what sort of transformation you want to make to your state

### What does Redux Middleware allow you to do?
Hook into the moment after dispatching an action but before that action reaches the reducer.

### What means "connect":
To Render any component, passing that component any data it needs from the store, and assuming it will re-render when it changes