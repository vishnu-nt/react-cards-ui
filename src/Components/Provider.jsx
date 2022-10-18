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

  const renderChild = (child, childProps) => {
    debugger;
    if (child) {
      const type = getName(child);
      if (value[type]) {
        const overrideComponent = value[type]({
          CurrentComponentTree: () => child,
          ...childProps
        });
        return overrideComponent;
      }
      return child;
    }
    return null;
  }

  /**
   * Invoked with Children. Each child is compared with passed-in value.
   * If Override function is passed, the callback will be called with default component and props.
   * @param {Children} children `React.Children`
   * @returns {Children}
   */
  const processChildren = (children) => {
    return Children.map(children, (child) => {
      debugger;
      if (!child) return null;
      const childProps = child.props;
      if (!childProps) return child;
      if (childProps.children) {
        // const type = getName(props.child);
        // if (value[type]) {
        //   const overrideComponent = value[type]({
        //     CurrentComponentTree: () => props.child,
        //     ...props.child.props
        //   });
        //   return overrideComponent;
        // }
        return cloneElement(renderChild(child, childProps), childProps, [processChildren(childProps.children)]);
      }
      return renderChild(child);
    });
  };

  return (
    <componentContext.Provider value={value}>
      {processChildren(children)}
      {/* {cloneElement(children, props, [processChildren(props.children)])} */}
    </componentContext.Provider>
  );
}

export default Provider;
