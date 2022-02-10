# Just Some Note

1. Effects:
    working with (side) effects.
2. Reducers:
    Managing more complex state with reducers.
3. Context:
    Managing App-wide or component-wide state with "contex".


# React's Main Job vs Effects (Side Effects)

## React's Job:
React has one main job: to Render the UI and react to user input and re-render the UI when needed.
Essentially:
    1. Evaluate and render JSX
    3. Manage state and props
    4. React to Events and Input
    5. Re-evaluate component upon state and prop changes
These tools and features that allow this to happen include: the useState() hook, and props, ...etc.

## Effect (Side Effect):
Anything else React's not doing.
Example:
    1. Store data in browser storage.
    2. Send Http requests to backend servers.
    3. Set and manage timers/intervals ...etc.
All these tasks **must happen outside of the normal component evaluation** and render cycle -- especially since they might block/delay rendering (e.g. Http requests).
Some of these function need to be outside the component evaluation to prevent falling into infinit loops or sending too many Http request ...etc. Hence, we handle the side effects with the useEffect() hook.

# Handling Side Effects with the useEffect() Hook:
useEffect(**first argument**, **second argument**);

**First argument**: () => {...}, is a function that should be executed **after** every component evaluation **if** the specified dependencies change.
Side effect code goes into this fuction.

**Second argument**: [ dependencies ], is an array of dependencies of this effect - the function only runs if the dependencies changed.
Here we specify our depenencies of the function.

This way the side effect code will only execute when the depenencies change and not when the component re-renders.

