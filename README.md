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

### Notes on dependencies when using useEffect() hook:
You should add "everything" you use in the effect function as a dependency - i.e. all state variables and functions you use in there.

That is correct, but there are a few exceptions you should be aware of:

1. You DON'T need to add state updating functions (as we did in the last lecture with setFormIsValid): React guarantees that those functions never change, hence you don't need to add them as dependencies (you could though)

2. You also DON'T need to add "built-in" APIs or functions like fetch(), localStorage etc (functions and features built-into the browser and hence available globally): These browser APIs / global functions are not related to the React component render cycle and they also never change

3. You also DON'T need to add variables or functions you might've defined OUTSIDE of your components (e.g. if you create a new helper function in a separate file): Such functions or variables also are not created inside of a component function and hence changing them won't affect your components (components won't be re-evaluated if such variables or functions change and vice-versa)

### Do use:
1. Component state.
2. Props.