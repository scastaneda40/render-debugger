import React from "react";
import { render, screen } from "@testing-library/react";
import RenderDebugger from "../RenderDebugger";
import "@testing-library/jest-dom";

jest.spyOn(console, "log").mockImplementation(() => {});

const UserCard = ({ name, age }: { name: string; age: number }) => (
  <div>{`Name: ${name}, Age: ${age}`}</div>
);

describe("RenderDebugger", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("tracks render count and displays overlay", () => {
    process.env.NODE_ENV = "development"; // Ensure development mode

    const user = { name: "Stephen", age: 34 };

    const { rerender } = render(
      <RenderDebugger label="UserCard" debugMode={true} showOverlay={true}>
        <div>{`Name: ${user.name}, Age: ${user.age}`}</div>
      </RenderDebugger>
    );

    expect(screen.getByText("Render Count: 1")).toBeInTheDocument();

    rerender(
      <RenderDebugger label="UserCard" debugMode={true} showOverlay={true}>
        <div>{`Name: ${user.name}, Age: ${user.age + 1}`}</div>
      </RenderDebugger>
    );

    expect(screen.getByText("Render Count: 2")).toBeInTheDocument();
  });

  test("logs re-renders and shallow prop changes", () => {
    process.env.NODE_ENV = "development"; // Ensure development mode

    const initialProps = { name: "Stephen", age: 34 };
    const updatedProps = { name: "Stephen", age: 35 };

    const { rerender } = render(
      <RenderDebugger label="UserCard" debugMode={true}>
        <UserCard {...initialProps} />
      </RenderDebugger>
    );

    expect(console.log).toHaveBeenCalledWith("UserCard rendered with props:", {
      name: "Stephen",
      age: 34,
    });

    rerender(
      <RenderDebugger label="UserCard" debugMode={true}>
        <UserCard {...updatedProps} />
      </RenderDebugger>
    );

    expect(console.log).toHaveBeenCalledWith("UserCard shallow prop changes:", {
      age: { previous: 34, current: 35 },
    });
  });

  test("does not log in production mode", () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "production"; // Set to production mode

    const user = { name: "Stephen", age: 34 };
    render(
      <RenderDebugger label="UserCard" debugMode={true}>
        <div>{`Name: ${user.name}, Age: ${user.age}`}</div>
      </RenderDebugger>
    );

    expect(console.log).not.toHaveBeenCalled();

    process.env.NODE_ENV = originalEnv; // Restore environment
  });

  test("logs render duration using Profiler", () => {
    process.env.NODE_ENV = "development"; // Ensure development mode

    const user = { name: "Stephen", age: 34 };

    render(
      <RenderDebugger label="UserCard" debugMode={true}>
        <div>{`Name: ${user.name}, Age: ${user.age}`}</div>
      </RenderDebugger>
    );

    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining("UserCard mount took")
    );
  });

  test("logs hydration check complete", () => {
    process.env.NODE_ENV = "development"; // Ensure development mode

    const user = { name: "Stephen", age: 34 };

    render(
      <RenderDebugger label="UserCard" debugMode={true}>
        <div>{`Name: ${user.name}, Age: ${user.age}`}</div>
      </RenderDebugger>
    );

    expect(console.log).toHaveBeenCalledWith(
      "UserCard: Hydration check complete"
    );
  });

  test("uses custom logger function", () => {
    process.env.NODE_ENV = "development"; // Ensure development mode

    const customLogger = jest.fn();
    const user = { name: "Stephen", age: 34 };

    render(
      <RenderDebugger label="UserCard" debugMode={true} logger={customLogger}>
        <div>{`Name: ${user.name}, Age: ${user.age}`}</div>
      </RenderDebugger>
    );

    expect(customLogger).toHaveBeenCalledWith("UserCard rendered with props:", {
      children: "Name: Stephen, Age: 34",
    });
  });
});
