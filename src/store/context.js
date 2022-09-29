import { createContext } from "react";

const componentContext = createContext({});

export const { Provider, Consumer } = componentContext;
export default componentContext;
