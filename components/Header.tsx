import { useState } from "react";
import { useAuth } from "../AuthContext";
import Button from "./Button";

const Header = () => {
  const { isLoggedIn, signUp, signIn, logOut } = useAuth();
  const [username, setUserName] = useState("");

  const handleSignIn = async () => {
    const user = signIn(username);
    if (user != null) {
      setUserName("");
    }
  };

  const onClickPrimary = () => {
    if (isLoggedIn) {
      logOut();
    } else {
      handleSignIn();
    }
  };

  const handleSignUp = async () => {
    const userId = signUp(username);
    setUserName("");
  };

  const onClickSecondary = () => {
    handleSignUp();
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
