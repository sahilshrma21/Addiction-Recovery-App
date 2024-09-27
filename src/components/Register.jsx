import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import { Input } from "antd";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [inpval, setInputVal] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    contact_no: "",
  });
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState("");

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const setVal = (e) => {
    const { name, value } = e.target;
    setInputVal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addUserData = async (e) => {
    e.preventDefault();
    const { first_name, last_name, email, password, contact_no } = inpval;

    if (first_name === "") {
      setError("Please Enter Your First Name");
      return;
    } else if (last_name === "") {
      setError("Please Enter Your Last Name");
      return;
    } else if (email === "") {
      setError("Please Enter Your Email");
      return;
    } else if (!email.includes("@")) {
      setError("Enter a Valid Email");
      return;
    } else if (password === "") {
      setError("Enter Your Password");
      return;
    } else if (password.length < 6) {
      setError("Password Must Be Greater Than 6 Characters");
      return;
    } else if (contact_no === "") {
      setError("Please Enter Your Contact Number");
      return;
    } else if (!/^[0-9]{10}$/.test(contact_no)) {
      setError("Please Enter a Valid 10-Digit Contact Number");
      return;
    } else {
      setLoading(true);
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/user/user-register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              first_name,
              last_name,
              email,
              password,
              contact_no,
            }),
          }
        );

        const result = await response.json();

        if (!response.ok) {
          setError(result.message || "Something went wrong");
          setLoading(false);
          return;
        }

        if (result.status === 201) {
          setOpenSnackbar(true);
          localStorage.setItem("jwt", result.token);
          setInputVal({
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            contact_no: "",
          });
          setTimeout(() => {
            setLoading(false);
            navigate("/dashboard");
          }, 2000);
        }
      } catch (error) {
        console.error("Error registering user:", error);
        setError("An error occurred during registration");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section className="h-full bg-neutral-200 dark:bg-neutral-700">
      <div className="container h-full p-10">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                {/* Left column container */}
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    <div className="text-center">
                      <img
                        className="mx-auto w-45 rounded-full"
                        src="../src/styles/SoberMindLogo.png"
                        alt="logo"
                      />
                      <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                        We are One Family
                      </h4>
                    </div>

                    <form>
                      <p className="mb-4">Please Register an account</p>
                      <Input
                        onChange={setVal}
                        value={inpval.first_name}
                        size="large"
                        placeholder="First Name"
                        prefix={<UserOutlined />}
                        name="first_name"
                        style={{ marginBottom: "16px" }}
                      />
                      <Input
                        onChange={setVal}
                        value={inpval.last_name}
                        size="large"
                        placeholder="Last Name"
                        prefix={<UserOutlined />}
                        name="last_name"
                        style={{ marginBottom: "16px" }}
                      />
                      <Input
                        onChange={setVal}
                        value={inpval.email}
                        size="large"
                        placeholder="Email"
                        prefix={<MailOutlined />}
                        name="email"
                        style={{ marginBottom: "16px" }}
                      />
                      <Input
                        onChange={setVal}
                        value={inpval.contact_no}
                        size="large"
                        placeholder="Contact Number"
                        prefix={<UserOutlined />} // You can use a different icon if needed
                        name="contact_no"
                        style={{ marginBottom: "16px" }}
                      />

                      <Input.Password
                        onChange={setVal}
                        value={inpval.password}
                        size="large"
                        placeholder="Enter Your Password"
                        prefix={<LockOutlined />}
                        name="password"
                        iconRender={(visible) =>
                          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                        style={{ marginTop: "12px" }}
                      />

                      <div className="mb-12 pb-1 pt-1 text-center">
                        <button
                          className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                          type="button"
                          onClick={addUserData}
                          style={{
                            background:
                              "linear-gradient(to right,#36a2eb, #5a8def, #486dcf)",
                            marginTop: "20px",
                          }}
                        >
                          SIGN UP
                        </button>
                      </div>

                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Already have an account?</p>
                        <NavLink
                          to="/"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2.5 mr-2 focus:outline-none"
                        >
                          Login
                        </NavLink>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Right column container with background and description */}
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
              zIndex: 9999,
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Snackbar
            open={!!error}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              {error}
            </Alert>
          </Snackbar>
        )}
      </div>
    </section>
  );
}

export default Register;
// import {
//   EyeInvisibleOutlined,
//   EyeTwoTone,
//   LockOutlined,
//   MailOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
// import Alert from "@mui/material/Alert";
// import CircularProgress from "@mui/material/CircularProgress";
// import Snackbar from "@mui/material/Snackbar";
// import { Input } from "antd";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// // Import the combined styles

// function Register() {
  //   const navigate = useNavigate();
  //   const [inpval, setInputVal] = useState({
    //     first_name: "",
    //     last_name: "",
    //     email: "",
    //     password: "",
    //     contact_no: "",
    //   });
    //   const [loading, setLoading] = useState(false);
    //   const [openSnackbar, setOpenSnackbar] = useState(false);
    //   const [error, setError] = useState("");
    
    //   const handleSnackbarClose = (event, reason) => {
      //     if (reason === "clickaway") {
        //       return;
        //     }
        //     setOpenSnackbar(false);
        //   };
        
//   const setVal = (e) => {
//     const { name, value } = e.target;
//     setInputVal((prev) => ({
  //       ...prev,
  //       [name]: value,
  //     }));
  //   };
  
  //   const addUserData = async (e) => {
    //     e.preventDefault();
    //     const { first_name, last_name, email, password, contact_no } = inpval;
    
    //     if (first_name === "") {
      //       setError("Please Enter Your First Name");
//       return;
//     } else if (last_name === "") {
  //       setError("Please Enter Your Last Name");
  //       return;
  //     } else if (email === "") {
    //       setError("Please Enter Your Email");
    //       return;
    //     } else if (!email.includes("@")) {
      //       setError("Enter a Valid Email");
      //       return;
      //     } else if (password === "") {
        //       setError("Enter Your Password");
        //       return;
        //     } else if (password.length < 6) {
          //       setError("Password Must Be Greater Than 6 Characters");
          //       return;
          //     } else if (contact_no === "") {
            //       setError("Please Enter Your Contact Number");
//       return;
//     } else if (!/^[0-9]{10}$/.test(contact_no)) {
  //       setError("Please Enter a Valid 10-Digit Contact Number");
  //       return;
  //     } else {
    //       setLoading(true);
    //       try {
      //         const response = await fetch(
        //           "http://127.0.0.1:8000/api#/User%20Collection/user_register_user_user_register_post",
        //           {
          //             method: "POST",
          //             headers: {
            //               "Content-Type": "application/json",
            //             },
            //             body: JSON.stringify({
              //               first_name,
              //               last_name,
              //               email,
              //               password,
              //               contact_no,
              //             }),
              //           }
              //         );
              
              //         const result = await response.json();
              
              //         if (!response.ok) {
                //           setError(result.message || "Something went wrong");
                //           setLoading(false);
                //           return;
                //         }
                
                //         if (result.status === 201) {
                  //           setOpenSnackbar(true);
                  //           localStorage.setItem("jwt", result.token);
                  //           setInputVal({
                    //             first_name: "",
                    //             last_name: "",
                    //             email: "",
//             password: "",
//             contact_no: "",
//           });
//           setTimeout(() => {
  //             setLoading(false);
  //             navigate("/dashboard");
  //           }, 2000);
  //         }
  //       } catch (error) {
    //         console.error("Error registering user:", error);
    //         setError("An error occurred during registration");
    //       } finally {
      //         setLoading(false);
      //       }
//     }
//   };

//   return (
  //     <section className="h-full bg-neutral-200 dark:bg-neutral-700">
  //       <div className="container h-full p-10">
  //         <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
  //           <div className="w-full">
  //             <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
  //               <div className="g-0 lg:flex lg:flex-wrap">
  //                 {/* Left column container */}
  //                 <div className="px-4 md:px-0 lg:w-6/12">
  //                   <div className="md:mx-6 md:p-12">
  //                     <div className="text-center">
  //                       <img
  //                         className="mx-auto w-48"
  //                         src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
  //                         alt="logo"
  //                       />
  //                       <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
  //                         We are One Family
  //                       </h4>
  //                     </div>
  
  //                     <form>
  //                       <p className="mb-4">Please Register an account</p>
  //                       <Input
  //                         onChange={setVal}
  //                         value={inpval.first_name}
  //                         size="large"
  //                         placeholder="First Name"
  //                         prefix={<UserOutlined />}
  //                         name="first_name"
  //                         style={{ marginBottom: "16px" }}
  //                       />
  //                       <Input
  //                         onChange={setVal}
  //                         value={inpval.last_name}
  //                         size="large"
  //                         placeholder="Last Name"
  //                         prefix={<UserOutlined />}
//                         name="last_name"
//                         style={{ marginBottom: "16px" }}
//                       />
//                       <Input
//                         onChange={setVal}
//                         value={inpval.email}
//                         size="large"
//                         placeholder="Email"
//                         prefix={<MailOutlined />}
//                         name="email"
//                         style={{ marginBottom: "16px" }}
//                       />
//                       <Input.Password
//                         onChange={setVal}
//                         value={inpval.password}
//                         size="large"
//                         placeholder="Password"
//                         prefix={<LockOutlined />}
//                         name="password"
//                         iconRender={(visible) =>
  //                           visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
  //                         }
  //                         style={{ marginBottom: "16px" }}
  //                       />
  //                       <Input
  //                         onChange={setVal}
  //                         value={inpval.contact_no}
  //                         size="large"
  //                         placeholder="Contact No"
  //                         prefix={<UserOutlined />}
  //                         name="contact_no"
  //                         style={{ marginBottom: "16px" }}
  //                       />
  //                       <div className="text-center pt-1 mb-12 pb-1">
  //                         <button
  //                           className="inline-block rounded bg-blue-700 px-4 py-2.5 text-white uppercase shadow-lg hover:bg-blue-800 focus:ring-4"
  //                           type="button"
  //                           onClick={addUserData}
  //                         >
  //                           Register
  //                         </button>
  //                       </div>
  //                     </form>
  //                   </div>
  //                 </div>
  //                 {/* Right column container with gradient background */}
  //                 <div className="right-column-background lg:w-6/12 flex items-center justify-center">
  //                   <div className="text-white px-4 py-6 md:p-12 md:mx-6">
  //                     <h4 className="mb-6 text-xl font-semibold">Welcome to Our Platform</h4>
  //                     <p className="text-sm">
  //                       We provide the best solutions for addiction recovery and support for those who need it.
  //                     </p>
  //                   </div>
  //                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {loading && (
  //         <div className="circular-progress-overlay">
  //           <CircularProgress />
  //         </div>
  //       )}
  //       <Snackbar
  //         open={openSnackbar}
  //         autoHideDuration={6000}
  //         onClose={handleSnackbarClose}
  //       >
  //         <Alert onClose={handleSnackbarClose} severity="success">
  //           Registration successful!
  //         </Alert>
  //       </Snackbar>
  //       {error && (
    //         <Snackbar
    //           open={Boolean(error)}
    //           autoHideDuration={6000}
    //           onClose={handleSnackbarClose}
    //         >
    //           <Alert onClose={handleSnackbarClose} severity="error">
    //             {error}
    //           </Alert>
    //         </Snackbar>
    //       )}
    //     </section>
    //   );
    // }
    
    // export default Register;
//   import {
//   EyeInvisibleOutlined,
//   EyeTwoTone,
//   LockOutlined,
//   MailOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
// import Alert from "@mui/material/Alert";
// import Box from "@mui/material/Box";
// import CircularProgress from "@mui/material/CircularProgress";
// import Snackbar from "@mui/material/Snackbar";
// import { Input } from "antd";
// import React, { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// // import "./Register.css"; // Link to the custom CSS file
// import '../styles/Register.css';

// function Register() {
//   const navigate = useNavigate();
//   const [inpval, setInputVal] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     password: "",
//     contact_no: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [error, setError] = useState("");

//   const handleSnackbarClose = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setOpenSnackbar(false);
//   };

//   const setVal = (e) => {
//     const { name, value } = e.target;
//     setInputVal((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const addUserData = async (e) => {
//     e.preventDefault();
//     const { first_name, last_name, email, password, contact_no } = inpval;

//     if (first_name === "") {
//       setError("Please Enter Your First Name");
//       return;
//     } else if (last_name === "") {
//       setError("Please Enter Your Last Name");
//       return;
//     } else if (email === "") {
//       setError("Please Enter Your Email");
//       return;
//     } else if (!email.includes("@")) {
//       setError("Enter a Valid Email");
//       return;
//     } else if (password === "") {
//       setError("Enter Your Password");
//       return;
//     } else if (password.length < 6) {
//       setError("Password Must Be Greater Than 6 Characters");
//       return;
//     } else if (contact_no === "") {
//       setError("Please Enter Your Contact Number");
//       return;
//     } else if (!/^[0-9]{10}$/.test(contact_no)) {
//       setError("Please Enter a Valid 10-Digit Contact Number");
//       return;
//     } else {
//       setLoading(true);
//       try {
//         const response = await fetch(
//           "http://127.0.0.1:8000/api#/User%20Collection/user_register_user_user_register_post",
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               first_name,
//               last_name,
//               email,
//               password,
//               contact_no,
//             }),
//           }
//         );

//         const result = await response.json();

//         if (!response.ok) {
//           setError(result.message || "Something went wrong");
//           setLoading(false);
//           return;
//         }

//         if (result.status === 201) {
//           setOpenSnackbar(true);
//           localStorage.setItem("jwt", result.token);
//           setInputVal({
//             first_name: "",
//             last_name: "",
//             email: "",
//             password: "",
//             contact_no: "",
//           });
//           setTimeout(() => {
//             setLoading(false);
//             navigate("/dashboard");
//           }, 2000);
//         }
//       } catch (error) {
//         console.error("Error registering user:", error);
//         setError("An error occurred during registration");
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   return (
//     <section className="register-container">
//       <div className="register-box">
//         <div className="form-content">
//           <div className="form-container">
//             <div className="logo-section">
//               <img
//                 className="logo"
//                 src="../src/styles/SoberMindLogo.png"
//                 alt="logo"
//               />
//               <h4 className="heading">We are One Family</h4>
//             </div>
//             <form>
//               <p className="form-title">Please Register an account</p>
//               <Input
//                 onChange={setVal}
//                 value={inpval.first_name}
//                 size="large"
//                 placeholder="First Name"
//                 prefix={<UserOutlined />}
//                 name="first_name"
//                 className="input-field"
//               />
//               <Input
//                 onChange={setVal}
//                 value={inpval.last_name}
//                 size="large"
//                 placeholder="Last Name"
//                 prefix={<UserOutlined />}
//                 name="last_name"
//                 className="input-field"
//               />
//               <Input
//                 onChange={setVal}
//                 value={inpval.email}
//                 size="large"
//                 placeholder="Email"
//                 prefix={<MailOutlined />}
//                 name="email"
//                 className="input-field"
//               />
//               <Input
//                 onChange={setVal}
//                 value={inpval.contact_no}
//                 size="large"
//                 placeholder="Contact Number"
//                 prefix={<UserOutlined />}
//                 name="contact_no"
//                 className="input-field"
//               />
//               <Input.Password
//                 onChange={setVal}
//                 value={inpval.password}
//                 size="large"
//                 placeholder="Enter Your Password"
//                 prefix={<LockOutlined />}
//                 name="password"
//                 iconRender={(visible) =>
//                   visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
//                 }
//                 className="input-field"
//               />
//               <div className="submit-section">
//                 <button
//                   className="submit-button"
//                   type="button"
//                   onClick={addUserData}
//                 >
//                   SIGN UP
//                 </button>
//               </div>
//               <div className="redirect-section">
//                 <p>Already have an account?</p>
//                 <NavLink to="/" className="login-link">
//                   Login
//                 </NavLink>
//               </div>
//             </form>
//           </div>
//           <div className="info-section">
//             <h4 className="info-title">We are more than just a company</h4>
//             <p className="info-text">
//               Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
//               eiusmod tempor incididunt ut labore et dolore magna aliqua.
//             </p>
//           </div>
//         </div>
//       </div>
//       {loading && (
//         <Box className="loading-container">
//           <CircularProgress />
//         </Box>
//       )}
//       {error && (
//         <Snackbar
//           open={!!error}
//           autoHideDuration={6000}
//           onClose={handleSnackbarClose}
//         >
//           <Alert
//             onClose={handleSnackbarClose}
//             severity="error"
//             className="alert"
//           >
//             {error}
//           </Alert>
//         </Snackbar>
//       )}
//     </section>
//   );
// }

// export default Register;
