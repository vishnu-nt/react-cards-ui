import React from "react";
import Provider from "./Components/Provider";
import OverrideComponent from "./Components/OverrideComponent";
import C1 from "./Components/C1";
import C2 from "./Components/C2";
import C3 from "./Components/C3";

const ComponentOverrideDemo = () => {
  return (
    <div>
      <div style={{ marginBottom: 20 }}>Component Override Demo</div>
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
    </div>
  );
};

export default ComponentOverrideDemo;
