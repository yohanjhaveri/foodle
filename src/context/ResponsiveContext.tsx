import { createContext, useEffect, useState } from "react";

type Context = {
  width: number;
  height: number;
};

type Props = {
  children: React.ReactNode;
};

export const ResponsiveContext = createContext({} as Context);

export const ResponsiveProvider = ({ children }: Props) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const onResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <ResponsiveContext.Provider value={{ width, height }}>
      {children}
    </ResponsiveContext.Provider>
  );
};
