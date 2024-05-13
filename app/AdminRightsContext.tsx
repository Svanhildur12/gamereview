import { createContext } from "react";

export type AdminRightsContextType = {
  value: boolean;
  toggleAdmin: () => void;
};

export const AdminRightsContext = createContext({
  value: false,
  toggleAdmin: () => {},
});
