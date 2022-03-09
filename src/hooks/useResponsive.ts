import { useContext } from "react";
import { ResponsiveContext } from "../context/ResponsiveContext";

export const useResponsive = () => useContext(ResponsiveContext);
