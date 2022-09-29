import React, { Children, cloneElement } from "react";
import componentContext from "../store/context";

const Provider = (props) => {
  const { value, children } = props;

  /**
   * Returns name of the Element/Component node arg
   * @param {React.Node} node 
   * @returns {String}
   */
  const getName = (node) => {
    const { type } = node;
    if (!type) {
      return null;
    }
    if (typeof type === "string") { // Element
      return type;
    }
    return type.name; // Component
  };

  /**
   * Invoked with Children. Each child is compared with passed-in value.
   * If Override function is passed, the callback will be called with default component and props.
   * @param {Children} children `React.Children`
   * @returns {Children}
   */
  const processChildren = (children) => {
    return Children.map(children, () => {
      if (!children) return null;
      const { props } = children;
      if (!props) return children;
      if (props.children) {
        const type = getName(props.children);
        if (value[type]) {
          const overrideComponent = value[type]({
            CurrentComponentTree: () => props.children,
            ...props.children.props
          });
          return overrideComponent;
        }
        return processChildren(props.children);
      }
    });
  };

  return (
    <componentContext.Provider value={value}>
      {cloneElement(children, props, [processChildren(children)])}
    </componentContext.Provider>
  );
}

export default Provider;
