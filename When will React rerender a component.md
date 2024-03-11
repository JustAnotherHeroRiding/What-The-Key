React triggers a re-render of a component in several scenarios, primarily when there's a change in state or props. However, understanding when and why a component re-renders can sometimes be nuanced. Here are the key scenarios when React decides to re-render a component:

### 1. State Changes

Whenever a component's state changes using the `setState` function (from `useState` hook) or class component's `this.setState()`, React schedules a re-render. For example:

`const [count, setCount] = useState(0); // Calling setCount updates the state and triggers a re-render setCount(count + 1);`

### 2. Props Changes

When a parent component passes down new props to a child component, or when the prop values change, the child component will re-render. React checks if the new props are different from the previous props. If they are, it re-renders the child component.

### 3. Parent Component Rerenders

If a parent component re-renders, it can lead to child components re-rendering as well, unless optimizations are in place (like `React.memo` for functional components or `shouldComponentUpdate` for class components).

### 4. Context Changes

If a component consumes a React context and the value of that context changes, the component will re-render.

### 5. Force Update

Using the `forceUpdate` method in class components or changing a key on a component forces it to re-render.

### UseEffect and Re-renders

`useEffect` does not trigger a re-render by itself. It runs after the initial render and after every re-render/update of the component based on its dependency array. If you change a state within an `useEffect`, that state change can trigger a re-render. For example, if `useEffect` updates state based on a prop change, it's the state update that causes the re-render, not the prop change being detected within `useEffect`.

``useEffect(() => {   // This will cause a re-render because it updates the state   setTwelveBars(getTwelveBars(selectedKey, selectedVariant)); }, [selectedVariant, selectedKey]); // React runs this effect when `selectedVariant` or `selectedKey` changes``

### Why `useEffect` Is Necessary

In your case, changing `selectedKey` does change the prop, but for the component to act on this change (e.g., to fetch or calculate new data based on the new prop), you'd typically use `useEffect`. React indeed re-renders when props change, but to use the new props to set state or perform side effects, `useEffect` is the tool you'd use.

In summary, React will re-render a component when its state or props change, but how your component responds to such changes (especially to perform side effects or state updates based on new props) often requires `useEffect` or similar mechanisms.