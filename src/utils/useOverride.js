import { useContext } from "react";
import componentContext from "../store/context";

const useOverride = (
    overrideKey
) => {
    const ctx = useContext(componentContext);

    if (ctx === "IS_DEFAULT") {
        throw new Error("Cannot use component override outside ComponentOverrideContext provider.");
    }

    const OverrideComponent = ctx[overrideKey];

    return OverrideComponent === undefined ? null : OverrideComponent;
};

export default useOverride;
