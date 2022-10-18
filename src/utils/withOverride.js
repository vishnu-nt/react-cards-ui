import useOverride from "./useOverride";

export const withOverride = (DefaultComponent, overrideKey) => {
  return (props) => {
    const OverrideComponent = useOverride(overrideKey);

    if (OverrideComponent !== null) {
      return (
        <OverrideComponent DefaultComponent={DefaultComponent} {...props} />
      );
    }

    return <DefaultComponent {...props} />;
  };
};
