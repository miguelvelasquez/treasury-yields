import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

export const useAuth = () => {
  return useContext(AuthContext);
};

type AuthContextType = {
  authUserId: string;
  setAuthUserId: Dispatch<SetStateAction<string>>;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextType>({
  authUserId: "",
  setAuthUserId: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authUserId, setAuthUserId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const value = {
    authUserId,
    setAuthUserId,
    isLoggedIn,
    setIsLoggedIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
