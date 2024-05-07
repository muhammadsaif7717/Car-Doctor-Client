import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaEyeSlash, FaGithub, FaGoogle, FaRegEye } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import signSideImg from "../../assets/images/login/login.svg";
import { AuthContext } from "../../Contexts/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation()
  console.log('Locatoin In The Login Page', location)

  const [showPassword, setShowPassword] = useState(false);
  const { signInUser } = useContext(AuthContext)

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    //sign in user
    signInUser(email, password)
      .then(result => {
        const loggedInUser = result.user;
        console.log(loggedInUser)
        const user = { email }

        Swal.fire({
          position: "center",
          icon: "success",
          title: "User Signed in Successfully",
          showConfirmButton: false,
          timer: 1500
        });

        //get access token
        axios.post('http://localhost:5000/jwt', user,{withCredentials:true})
          .then(res => {
            console.log(res.data)
            if (res.data.success) {
              navigate(location?.state ? location.state?.from : '/');
            }
          })

        //navigate to previous page
        // setTimeout(() => {
        //   navigate(location?.state ? location.state?.from : '/');
        // }, 1900);

      })
      .catch(error => {
        console.log(error.message)
      })
  };

  return (
    <>
      <Helmet>
        <title>Template | Sign In</title>
      </Helmet>

      <div className="flex gap-5 flex-col lg:flex-row justify-around items-center min-h-screen">
        <div>
          <img src={signSideImg} className="w-[90%] md:w-full mx-auto" />
        </div>
        <div className=" border rounded-xl w-[320px] md:w-[400px]  shadow-2xl bg-base-100 animate__animated animate__pulse">
          <h1 className="text-3xl font-bold text-center mt-3">
            Please Sign In
          </h1>
          <form onSubmit={handleFormSubmit} className=" py-1 px-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Password</span>
              </label>
              <div className="relative flex items-center justify-end">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="input input-bordered w-full"
                  required
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute mr-5"
                >
                  {showPassword ? <FaRegEye /> : <FaEyeSlash />}
                </div>
              </div>
              <label className="label mt-1">
                <a href="#" className="label-text-alt link link-hover text-blue-600">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control">
              <button className="rounded-lg bg-[#F97316] border-none text-white py-2">
                Sign In
              </button>
            </div>
          </form>

          <div className=" pt-0 ">
            <div className="flex justify-center items-center ">
              <hr className="border-gray-300 w-1/4" />
              <span className="mx-3 text-gray-500">Or</span>
              <hr className="border-gray-300 w-1/4" />
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-5 items-center px-5">
              <div className="border border-blue-500 p-1 rounded-lg hover:bg-blue-100 flex justify-center items-center gap-1 w-full">
                <FaGoogle className="text-3xl text-blue-500" />
                <h1 className="font-bold text-sm text-blue-500">Google Sign In</h1>
              </div>
              <div className="border border-gray-500 p-1 rounded-lg  hover:bg-gray-200 flex justify-center items-center gap-1 w-full">
                <FaGithub className="text-3xl" />
                <h1 className="font-bold text-sm text-gray-800">GitHub Sign In</h1>
              </div>
            </div>
          </div>

          <div className="text-center my-3">
            <p>
              New to Template? Please &nbsp;
              <Link to="/sign-up" className="text-blue-500">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
