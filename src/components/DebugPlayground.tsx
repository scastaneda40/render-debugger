/* eslint-disable no-console */
import React, { useState } from "react";
import RenderDebugger from "./RenderDebugger/RenderDebugger";

// Mock UserCard component
const UserCard = ({ name, age }: { name: string; age: number }) => {
  console.log("Rendering UserCard with props:", { name, age });
  return <div>{`Name: ${name}, Age: ${age}`}</div>;
};

const DebugPlayground: React.FC = () => {
  const [user, setUser] = useState({ name: "Stephen", age: 34 });

  const incrementAge = () => {
    console.log("Incrementing age");
    setUser((prevUser) => ({ ...prevUser, age: prevUser.age + 1 }));
  };

  console.log("Rendering DebugPlayground with user:", user);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Debug Playground</h1>

      <RenderDebugger label="UserCard" debugMode={true} showOverlay={true}>
        <UserCard {...user} />
      </RenderDebugger>

      <button onClick={incrementAge} style={{ marginTop: "20px" }}>
        Increment Age
      </button>
    </div>
  );
};

export default DebugPlayground;
