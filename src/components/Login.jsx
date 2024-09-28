import {
    EyeInvisibleOutlined,
    EyeTwoTone,
    LockOutlined,
    MailOutlined,
} from "@ant-design/icons";
import { Alert, Box, CircularProgress, Snackbar } from "@mui/material";
import { Input } from "antd";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// import { LoginContext } from "../ContextProvider/Context";

function Login() {
  const [inpval, setInputVal] = useState({ userId: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
//   const { setLoginData } = useContext(LoginContext);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  const setVal = (e) => {
    const { name, value } = e.target;
    setInputVal((prevState) => ({ ...prevState, [name]: value }));
  };

//   const loginUser = async (e) => {
//     e.preventDefault();

//     const { userId, password } = inpval;

//     if (userId === "") {
//       setError("Please Enter Your Id");
//       return;
//     } else if (password === "") {
//       setError("Enter Your Password");
//       return;
//     } else if (password.length <= 6) {
//       setError("Password must be greater than 6 digits");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch("/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId, password }),
//       });

//       if (!response.ok)
//         throw new Error(`HTTP error! status: ${response.status}`);

//       const res = await response.json();

//       if (res.status === 201) {
//         const { usersdatatoken } = res.result;

//         if (usersdatatoken) {
//           window.localStorage.setItem("isLoggedIn", true);
//           window.localStorage.setItem("usersdatatoken", usersdatatoken);
//           //window.localStorage.setItem("refreshToken", refreshToken);

//           setLoginData(usersdatatoken);
//           setOpenSnackbar(true);
//           setInputVal({ userId: "", password: "" });
//           navigate("/dashboard");
//         } else {
//           throw new Error("Token not provided in response");
//         }
//       } else {
//         throw new Error(res.message || "Login failed");
//       }
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };
const loginUser = async (e) => {
    e.preventDefault();
  
    const { userId, password } = inpval;
  
    if (userId === "") {
      setError("Please Enter Your Id");
      return;
    } else if (password === "") {
      setError("Enter Your Password");
      return;
    } else if (password.length <= 6) {
      setError("Password must be greater than 6 digits");
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, password }),
      });
  
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
  
      const res = await response.json();
  
      if (res.status === 201) {
        const { usersdatatoken } = res.result;
  
        if (usersdatatoken) {
          window.localStorage.setItem("isLoggedIn", true);
          window.localStorage.setItem("usersdatatoken", usersdatatoken);
  
          setLoginData(usersdatatoken);
          setOpenSnackbar(true);
          setInputVal({ userId: "", password: "" });
          
          // Redirect to dashboard after successful login
          navigate("/dashboard");
        } else {
          throw new Error("Token not provided in response");
        }
      } else {
        throw new Error(res.message || "Login failed");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <section className="h-full bg-neutral-200 dark:bg-neutral-700">
      <div className="container h-full p-10">
        <div className="flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="lg:flex lg:flex-wrap">
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    <div className="text-center">
                      <img
                        className="mx-auto w-48"
                        src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        alt="logo"
                      />
                      <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                        We are One Family
                      </h4>
                    </div>
                    <form>
                      <p className="mb-4">Please login to your account</p>
                      <Input
                        name="userId"
                        value={inpval.email}
                        onChange={setVal}
                        size="large"
                        placeholder="Enter your ID"
                        prefix={<MailOutlined />}
                        style={{ marginBottom: "16px" }}
                      />
                      <Input.Password
                        name="password"
                        value={inpval.password}
                        onChange={setVal}
                        size="large"
                        placeholder="Enter Your Password"
                        prefix={<LockOutlined />}
                        iconRender={(visible) =>
                          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                        style={{ marginTop: "16px" }}
                      />
                      <div className="mb-12 pb-1 pt-1 text-center">
                        <button
                          onClick={loginUser}
                          className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                          type="submit"
                          style={{
                            background:
                              "linear-gradient(to right,#36a2eb, #5a8def, #486dcf)",
                            marginTop: "20px",
                          }}
                        >
                          Log in
                        </button>
                        <a href="#!" className="hover:underline">
                          Forgot password?
                        </a>
                      </div>
                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Don't have an account?</p>
                        <NavLink
                          to="/signup"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2.5 mr-2 focus:outline-none"
                        >
                          Register
                        </NavLink>
                      </div>
                    </form>
                  </div>
                </div>
                <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                  style={{
                    background:
                      "linear-gradient(to right, #36a2eb, #5a8def, #486dcf)",
                  }}
                >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold">
                      We are more than just a company
                    </h4>
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            zIndex: 1000,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Login Successful!
        </Alert>
      </Snackbar>
      <Snackbar
        open={error !== ""}
        autoHideDuration={6000}
        onClose={() => setError("")}
      >
        <Alert
          onClose={() => setError("")}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </section>
  );
}

export default Login;
