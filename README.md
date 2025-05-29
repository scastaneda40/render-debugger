# Render Debugger

`RenderDebugger` is a development-only React component designed to assist developers in debugging component re-renders. It provides insights into prop changes and tracks previous values, making it easier to identify performance issues and unnecessary re-renders.

## Features

- **Re-render Logging**: Automatically logs component re-renders to the console, including the component name and changed props.
- **Previous Value Tracking**: Utilizes a custom hook to track the previous value of props or state, allowing for easy comparison.
- **Prop Diffing**: Implements shallow and deep comparison hooks to determine if props have changed, helping to optimize component rendering.
- **Development Mode Check**: The component only executes its logic in development mode, ensuring no performance overhead in production.

## Installation

To use `RenderDebugger`, clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd render-debugger
npm install
```

## Usage

Wrap any component with `RenderDebugger` to enable debugging features:

```tsx
import React from 'react';
import RenderDebugger from './components/RenderDebugger';

const MyComponent = (props) => {
  return <div>{props.text}</div>;
};

const App = () => {
  return (
    <RenderDebugger>
      <MyComponent text="Hello, World!" />
    </RenderDebugger>
  );
};

export default App;
```

## Development

To start the development server, run:

```bash
npm start
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.