# Render Debugger

`RenderDebugger` is a development-only React component designed to assist developers in debugging component re-renders. It provides insights into prop changes and tracks previous values, making it easier to identify performance issues and unnecessary re-renders.

---

## Features

✅ **Re-render Logging** – Automatically logs component re-renders to the console, including the component name and changed props.

✅ **Previous Value Tracking** – Utilizes a custom hook to track the previous value of props or state, allowing for easy comparison.

✅ **Prop Diffing** – Implements shallow and deep comparison hooks to determine if props have changed, helping to optimize component rendering.

✅ **Profiler Integration** – Logs component render durations using React Profiler API.

✅ **Development Mode Check** – The component only executes its logic in development mode, ensuring no performance overhead in production.

✅ **Optional Overlay** – Displays a floating debug overlay on the page with render counts.

---

## Installation

To use `RenderDebugger`, clone the repository and install dependencies:

```bash
git clone https://github.com/scastaneda40/render-debugger.git
cd render-debugger
npm install
```

---

## Usage

Wrap any component with `RenderDebugger` to enable debugging features:

```tsx
import React from "react";
import RenderDebugger from "./components/RenderDebugger";

const MyComponent = (props) => {
  return <div>{props.text}</div>;
};

const App = () => {
  return (
    <RenderDebugger label="MyComponent" showOverlay debugMode>
      <MyComponent text="Hello, World!" />
    </RenderDebugger>
  );
};

export default App;
```

---

## Optional Props

| Prop          | Type      | Default            | Description                                    |
| ------------- | --------- | ------------------ | ---------------------------------------------- |
| `label`       | `string`  | `"RenderDebugger"` | Label shown in logs and overlay                |
| `debugMode`   | `boolean` | `true`             | Enable/disable debugger logic                  |
| `showOverlay` | `boolean` | `false`            | Show a floating overlay with render count info |
| `logger`      | `func`    | `console.log`      | Custom logging function                        |

---

## Development

To run the development environment:

```bash
npm start
```

To build the package:

```bash
npm run build
```

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.
