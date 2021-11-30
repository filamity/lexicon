import { useState } from "react";
import { useAuth } from "./AuthContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import handleUserData from "./handleUserData";

const Login = ({
  qOrder,
  currentIdx,
  list,
  setQOrder,
  setCurrentIdx,
  setList,
  initialVals,
}) => {
  const { login, signUp } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasAccount, setHasAccount] = useState(true);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      let { user } = await signUp(email, password);
      handleUserData("add", user.uid, {
        username,
        email,
        qOrder: initialVals.qOrder,
        currentIdx: initialVals.currentIdx,
        list: initialVals.list,
      });
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setUsername("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      let { user } = await login(email, password);
      handleUserData("get", user.uid).then((res) => {
        let data = res.data();
        setQOrder(data.qOrder);
        setCurrentIdx(data.currentIdx);
        setList(data.list);
      });
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setUsername("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <form onSubmit={hasAccount ? handleLogin : handleSignUp}>
        {!hasAccount && (
          <>
            <TextField
              label="Username"
              type="text"
              value={username}
              variant="standard"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <section className="buffer-20" />
          </>
        )}
        <TextField
          label="Email"
          type="email"
          value={email}
          variant="standard"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <section className="buffer-20" />
        <TextField
          label="Password"
          type="password"
          value={password}
          variant="standard"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <section className="buffer-20" />
        {!hasAccount && (
          <>
            <TextField
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              variant="standard"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <section className="buffer-20" />
          </>
        )}
        {error && <p className="error">{error}</p>}
        {hasAccount ? (
          <Button variant="outlined" color="primary" type="submit">
            {loading ? <CircularProgress color="primary" size={20} /> : "Login"}
          </Button>
        ) : (
          <Button variant="outlined" color="primary" type="submit">
            {loading ? (
              <CircularProgress color="primary" size={20} />
            ) : (
              "Sign Up"
            )}
          </Button>
        )}
        <p
          className="login-change"
          onClick={() => setHasAccount((prev) => !prev)}
        >
          {hasAccount ? "or Sign Up" : "or Log In"}
        </p>
      </form>
    </div>
  );
};

export default Login;
