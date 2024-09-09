import React, { createContext, useState, useContext, ReactNode } from "react";
import { TaxpayerInfo } from "../types";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

export interface User {
  id: string;
  complete_name: string;
  email: string;
  phone: string;
  country_code: string;
  taxpayer_info: TaxpayerInfo | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
