import Button from "./Button";

const Header = () => {
  return (
    <div className="container" style={{}}>
      <Button label="Sign in" onClick={() => {}} />
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          height: 30px;
          width: 100vw;
          padding: 20px 50px 20px;
        }
      `}</style>
    </div>
  );
};

export default Header;
