import { render, screen } from "@testing-library/react";
import ComponentOverrideDemo from "./ComponentOverrideDemo";
import C1 from "./Components/C1";
import C2 from "./Components/C2";
import C3 from "./Components/C3";
import OverrideComponent from "./Components/OverrideComponent";
import { Provider } from "./store/context";

test("renders Component Override Demo text", () => {
  render(<ComponentOverrideDemo />);
  const titleElem = screen.getByText(/Component Override Demo/i);
  expect(titleElem).toBeInTheDocument();
});

test("renders Tree if no overrides are passed", () => {
  render(
    <Provider value={{}}>
      <C1>
        <C2 />
      </C1>
    </Provider>
  );
  const c1 = screen.getByText(/Default C1/i);
  expect(c1).toBeInTheDocument();
  const c2 = screen.getByText(/Default C2/i);
  expect(c2).toBeInTheDocument();
});

test("renders overriding component if specified", () => {
  render(
    <Provider
      value={{
        C2: ({ CurrentComponentTree, ...props }) => {
          return (
            <div>
              <OverrideComponent {...props} />
            </div>
          );
        },
      }}
    >
      <C1>
        <C2>
          <C3></C3>
        </C2>
      </C1>
    </Provider>
  );
  const c1 = screen.getByText(/Default C1/i);
  expect(c1).toBeInTheDocument();
  setTimeout(() => {
    const overrideElemText = screen.getByText(/Override Component/i);
    expect(overrideElemText).toBeInTheDocument();
  }, 0);
});

test("it should enhance default component with another", () => {
  render(
    <Provider
      value={{
        C2: ({ CurrentComponentTree, ...props }) => {
          return (
            <div>
              <CurrentComponentTree />
              <OverrideComponent {...props} />
            </div>
          );
        },
      }}
    >
      <C1>
        <C2>
          <C3></C3>
        </C2>
      </C1>
    </Provider>
  );
  const c1 = screen.getByText(/Default C1/i);
  expect(c1).toBeInTheDocument();
  setTimeout(() => {
    const c2 = screen.getByText(/Default C2/i);
    expect(c2).toBeInTheDocument();
    const overrideElemText = screen.getByText(/Override Component/i);
    expect(overrideElemText).toBeInTheDocument();
  }, 0);
});
