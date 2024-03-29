import React, { useRef, useState } from "react";
import loginImg from "../../../Assets/Images/login.jpg";
import "./login.css";
import googleIcons from "../../../Assets/Icons/icons8-google-48.png";
import facebookIcons from "../../../Assets/Icons/icons8-facebook-48.png";
import twitterIcons from "../../../Assets/Icons/icons8-twitter-48.png";
import githubIcons from "../../../Assets/Icons/icons8-github-48.png";
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import auth from "../../../Firebase/init";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
  useSignInWithFacebook,
  useSignInWithGithub,
} from "react-firebase-hooks/auth";
import Spinners from "../../Spinner/Spinners";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Login = () => {
  /*---------all use state----------*/
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();
  let location = useLocation();

  /*---------Email and password sign in ----------*/
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  /*---------Google sign in ----------*/
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  /*---------GutHub sign in ----------*/
  const [signInWithGithub, githubUser, githubLoading, githubError] =
    useSignInWithGithub(auth);

  /*---------Facebook sign in ----------*/
  const [signInWithFacebook, facebookUser, facebookLoading, facebookError] =
    useSignInWithFacebook(auth);

  /*---------- Forget Password handle---------*/
  const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

  /*---------Loading and error handle Start here ----------*/
  let emailMessage;
  let googleErrorMessage;
  if (googleError || error || githubError || facebookError) {
    emailMessage = error?.message;
    googleErrorMessage = googleError?.message
      ? googleError?.message
      : githubError?.message
      ? githubError?.message
      : facebookError?.message;
  }

  if (loading || googleLoading || githubLoading || sending || facebookLoading) {
    return <Spinners />;
  }

  /*---------Submit handler Start here ----------*/
  const submitHandler = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    await signInWithEmailAndPassword(email, password);
    const { data } = await axios.post(
      "https://quiet-shelf-65814.herokuapp.com/login",
      { email }
    );
    localStorage.setItem("accessToken", data.accessToken);
  };

  /*---------Private routes handle ----------*/
  let from = location?.state?.from?.pathname || "/profile";
  if (user || googleUser || githubUser || facebookUser) {
    navigate(from, { replace: true });
  }

  /*---------New Account Create  handler Start here ----------*/

  const createNewAccount = () => {
    navigate("/signup");
  };

  return (
    <div className="login-container">
      <div className="container bg-white">
        <div className="row row-cols-md-2 justify-content-center align-items-center">
          <div>
            <img src={loginImg} className="img-fluid" alt="" />
          </div>
          <div>
            <div className=" login">
              <h6 className="text-danger text-center">{googleErrorMessage}</h6>
              <h2>Login</h2>
              <p>See your growth and gets consultation support!</p>
              <div className="text-center mb-3">
                <button
                  onClick={() => signInWithGoogle()}
                  className="SocialLogin"
                >
                  <img src={googleIcons} alt="" /> Sign in With Google
                </button>
                <button
                  onClick={() => signInWithFacebook()}
                  className="SocialLogin"
                >
                  <img src={facebookIcons} alt="" /> Sign in With Facebook
                </button>
                <button className="SocialLogin">
                  <img src={twitterIcons} alt="" /> Sign in With Twitter
                </button>
                <button
                  onClick={() => signInWithGithub()}
                  className="SocialLogin"
                >
                  <img src={githubIcons} alt="" /> Sign in With GitHub
                </button>
              </div>
              <div className="orSignByEmail">
                <div></div>
                <span>Or sign in by email</span>
                <div></div>
              </div>
              <h6 className="text-danger text-center">{emailMessage}</h6>

              <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="fw-bold">
                    Email
                    <span className="start">*</span>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    required
                    ref={emailRef}
                    className="emailInput"
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="fw-bold">
                    Password<span className="start">*</span>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                    ref={passwordRef}
                    className="passwordInput"
                  />
                </Form.Group>
                <h6
                  className="forgetPassword"
                  onClick={async () => {
                    if (emailRef.current.value) {
                      await sendPasswordResetEmail(emailRef.current.value);
                      toast("Please Check your Email");
                    } else {
                      toast("Please enter Email");
                    }
                  }}
                >
                  Forget Password?
                </h6>
                <Button className="submitBtn" variant="primary" type="submit">
                  Login
                </Button>
              </Form>
              <div className="createNewAccount">
                <span> Not registered yet?</span>
                <button onClick={createNewAccount}>Create an Account</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
