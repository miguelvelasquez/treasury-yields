import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { UserResponseType, postUser } from "./utils/postUser";
import { postSignup } from "./utils/postSignup";

export const useAuth = () => {
  return useContext(AuthContext);
};

type AuthContextType = {
  authUserId: string;
  isLoggedIn: boolean;
  signIn: (username: string) => Promise<UserResponseType | null>;
  signUp: (username: string) => Promise<string>;
  logOut: () => void;
};

const AuthContext = createContext<AuthContextType>({
  authUserId: "",
  isLoggedIn: false,
  signIn: async (username: string) => null,
  signUp: async () => "",
  logOut: () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authUserId, setAuthUserId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const signIn = async (username: string): Promise<UserResponseType | null> => {
    const user = await postUser(username);
    
    
    if (user != null) {
      setIsLoggedIn(true);
      setAuthUserId(user._id);
      return user;
    }
    return null;
  };

  const signUp = async (username: string): Promise<string> => {
    const userId = (await postSignup(username)).insertedId;
    setIsLoggedIn(true);
    setAuthUserId(userId);
    return userId;
  };

  const logOut = () => {
    setIsLoggedIn(false);
    setAuthUserId("");
  };

  const value = {
    authUserId,
    isLoggedIn,

    signIn,
    signUp,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
