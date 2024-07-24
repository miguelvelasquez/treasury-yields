import { useState } from "react";
import { useAuth } from "../AuthContext";
import Button from "./Button";
import { postSignup } from "../utils/postSignup";
import { postUser } from "../utils/postUser";

const Header = () => {
  const { isLoggedIn, setIsLoggedIn, setAuthUserId } = useAuth();
  const [username, setUserName] = useState("");

  const signIn = async () => {
    const user = await postUser(username);
    if (user != null) {
      setIsLoggedIn(true);
      setAuthUserId(username);
      setUserName("");
    }
  };

  const logOut = () => {
    setIsLoggedIn(false);
    setAuthUserId("");
  };

  const onClickPrimary = () => {
    if (isLoggedIn) {
      logOut();
    } else {
      signIn();
    }
  };

  const signup = async () => {
    const userId = (await postSignup(username)).insertedId;
    console.log(userId);
    setIsLoggedIn(true);
    setAuthUserId(userId);
    setUserName("");
  };

  const onClickSecondary = () => {
    signup();
  };

  const primaryButtonLabel = isLoggedIn ? "Log out" : "Sign in";

  return (
    <div className="container">
      {!isLoggedIn && (
        <input
          onChange={(event) => setUserName(event.target.value)}
          value={username}
        ></input>
      )}
      <Button label={primaryButtonLabel} onClick={onClickPrimary} />
      {!isLoggedIn && <Button label="Sign up" onClick={onClickSecondary} />}
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          height: 30px;
          width: 100vw;
          padding: 20px 50px 20px;
        }
        input {
          margin-right: 10px;
        }
      `}</style>
    </div>
  );
};

export default Header;
