import { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginAPI } from "../../utils/ApiRequest";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const [values, setValues] = useState({ email: "", password: "" });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    theme: "dark",
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(loginAPI, values);
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
        toast.success(data.message, toastOptions);
      } else {
        toast.error(data.message, toastOptions);
      }
    } catch (error) {
      toast.error("Something went wrong!", toastOptions);
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <Particles className="particles" options={{ /* Particle effect config */ }} />
      <Container className="login-content">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="login-card p-4">
              <div className="text-center">
                <AccountBalanceWalletIcon className="wallet-icon" />
                <h2 className="text-dark mt-2">Finance Manager Login </h2>
              </div>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mt-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" name="email" placeholder="Enter email" value={values.email} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" placeholder="Enter password" value={values.password} onChange={handleChange} required />
                </Form.Group>
                <div className="text-center mt-4">
                  <Link to="/forgotPassword" className="forgot-password">Forgot Password?</Link>
                </div>
                <Button type="submit" className="btn-block mt-3 login-btn" disabled={loading}>
                  {loading ? "Signing in..." : "Login"}
                </Button>
                <p className="text-center mt-3">
                  Don't have an account? <Link to="/register" className="register-link">Register</Link>
                </p>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default Login;
