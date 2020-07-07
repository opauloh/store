/*
Other Folder Structure Patterns

Like dealing with async data in Redux gets opinionated quickly, so does folder structure.
I’ve decided to show you the “rails” pattern. It’s the simplest, but may not be 
the best for your application. 

Here are a few other options I also like that you can check out.

https://github.com/erikras/ducks-modular-redux
Ducks - Redux Reducer Bundles: The idea here is that you have a “module” (file)
which represents a single reducer along with any action creators or constants
that are associated with it. I actually quite enjoy this pattern and I used it
in the first version of this course. It breaks down a little when you start to
have action types that aren’t associated with a single reducer.

https://marmelab.com/blog/2015/12/17/react-directory-structure.html
Domain based Folders: The idea here is you group your actions, reducers, etc by
the domain they care about, rather than separating them out into generic
“actions”, “reducers”, folders.
*/
