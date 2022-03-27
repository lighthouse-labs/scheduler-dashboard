// Compass Notes - 2022/03/27
// Class Components in the Wild

// INTRO TO REACT CLASS API
// ES6 brought Class syntax
// React has two options for handling state and side effects - class API and Hooks API

// CLASSES AND CONSTRUCTORS
// RULES FOR REACT CLASS COMPONENTS
// Component must extend React.Component class
// import React, { Component } from "react";

// class Application extends Component {
//   constructor(props) {
//     // If you override React.Component's constructor, then you must:
//     //(a) call super(), and (b) pass it the props object
//     super(props);

//     // It is common to assign an object to the state class property.
//     this.state = {
//       count: 0,
//     };

//     this.increment = this.increment.bind(this);
//   }

//   increment(event) {
//     this.setState((previousState) => ({
//       count: previousState.count + 1,
//     }));
//   }

//   // Component must override the render method of React.Component
//   render() {
//     // like React functions, a class' render method returns JSX
//     return <button onClick={this.increment}>{this.state.count}</button>;
//   }
// }

// CLASS PROPERTIES
// Recently added to ECMAScript (compare to above)
// Class properties syntax is simpler than above example
// class Application extends Component {
//   // assign an object to state class property
//   state = {
//     count: 0,
//   };

//   // The increment class property is assigned a function
//   increment = (event) => {
//     this.setState((previousState) => ({
//       count: previousState.count + 1,
//     }));
//   };

//   render() {
//     return <button onClick={this.increment}>{this.state.count}</button>;
//   }
// }

// COMPONENT INSTANCES
// The Component class hands down methods and properties that we use to access props and manage state
// access methods and properties using 'this'
// `this.props`, `this.state` and `this.setState`

// class Counter extends Component {
//   render() {
//     // Counter accepts two props using 'this.props`
//     return <button onClick={this.props.onClick}>{this.props.count}</button>;
//   }
// }

// class Application extends Component {
//   // Sets initial state using a class property
//   state = {
//     count: 0,
//   };

//   increment = (event) => {
//     // Change our state using the setState method
//     this.setState((previousState) => ({
//       count: previousState.count + 1,
//     }));
//   };

//   render() {
//     // When rendering we access state using 'this'
//     return <Counter onClick={this.increment} count={this.state.count} />;
//   }
// }

// SETTING STATE
// Rules for setting state using this.setState method
// 1. Never set state directly - always use this.setState
// 2. State updates are merged - see example below
// 3. State updates are async
// class App extends React.Component {
//   state = {
//     unchanged: true,
//     visible: false,
//   };

//   show = (event) => {
//     // 2. State updates are merged, not replaced (whereas useState hook replaces state)
//     // Only the value of the `visible` property is updated
//     // Yet 'unchanged' property is still available
//     // Different from useState hook - we need to replace state completely: e.g., setState({...state, visible: true })
//     this.setState({
//       visible: true,
//     });
//     // 3. state updates are async
//     // This will still show 'false' despite setState to true above
//     console.log(this.state.visible);
//   };

//   render() {
//     return (
//       <button onClick={this.show}>
//         {this.state.unchanged ? "Unchanged" : "Changed"}{" "}
//         {this.state.visible ? "Visible" : "Hidden"}
//       </button>
//     );
//   }
// }

// 3. State updates are async - continued
// If new state depends on old state, use this format:
// Instead of passing object to setState, we pass a function
// When React is ready to update state, it calls this function
// The passed in function must return a new object that represents desired changes to this.state
// increment = (event) => {
//   this.setState((previousState) => ({
//     count: previousState.count + 1,
//   }));
// };

// LIFECYCLE
// They are predefined by React
// They are called by React at specific points in the life of a React component.
// Lifecycle methods are the API we use to perform side effects
// When component mounts - we can perform side effects - data fetching or connecting to WebSocket
// When component updates
// When component is removed from DOM
