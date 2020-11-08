import React, { createContext, ReactNode } from "react";

interface Users {
  name: string;
  email: string;
}
interface IProps {
  children: ReactNode;
  // any other props that come into the component
}

const context = createContext<any>("");

function AuthPtovider({ children }: IProps) {
  return (
    <context.Provider value={{ authenticated: false }}>
      {children}
    </context.Provider>
  );
}

export { context, AuthPtovider };
