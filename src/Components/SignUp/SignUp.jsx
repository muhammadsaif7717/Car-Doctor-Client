import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import signSideImg from "../../assets/images/login/login.svg";
import { AuthContext } from "../../Contexts/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation()
  console.log('Locatoin In The Login Page', location)

  const [showPassword, setShowPassword] = useState(false);
  const [registerError, setRegisterError] = useState();
  const { createUser, updateUserProfile } = useContext(AuthContext)

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;
    console.log(name, email, photo, password);

    //validations
    if (password.length < 6) {
      setRegisterError("Password must be at least 6 characters long.");
      return;
    }

    if (!/[a-z]/.test(password)) {
      setRegisterError("Password must contain at least one lowercase letter.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setRegisterError("Password must contain at least one uppercase letter.");
      return;
    }


    //create user
    createUser(email, password)
      .then(result => {
        const newUser = result.user;
        console.log(newUser)

        Swal.fire({
          position: "center",
          icon: "success",
          title: "User Created Successfully",
          showConfirmButton: false,
          timer: 1500
        });

        //update profile
        updateUserProfile(name, photo)
          .then(() => {
            console.log('User Name and Photo Updated')
          })
          .catch(error => {
            console.log(error.message)
          })
        
        const user={name,email,photo,password}
        //post user to database
        axios.post('http://localhost:5000/users', user)
        .then(res => {
          console.log(res.data)
        })
        
        //navigate to previous page
        setTimeout(() => {
          navigate(location?.state ? location.state : '/');
        }, 1900);

      })
      .catch(error => {
        console.log(error.message)
      })
  };

  return (
    <>
      <Helmet>
        <title>Template | Sign Up</title>
      </Helmet>

      <div className="flex gap-5 flex-col lg:flex-row justify-around items-center min-h-screen">
        <div>
          <img src={signSideImg} className="w-[90%] md:w-full mx-auto" />
        </div>
        <div className="border rounded-xl shadow-2xl w-[320px] md:w-[400px] bg-base-100 animate__animated animate__pulse">
          <h1 className="text-3xl font-bold text-center mt-3">
            Please Sign Up
          </h1>
          <form onSubmit={handleFormSubmit} className="m-0 py-1 px-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="input input-bordered"
                required
              />
            </div>
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
                <span className="label-text font-bold">Photo URL</span>
              </label>
              <input
                type="text"
                placeholder="Photo URL here"
                name="photo"
                className="input input-bordered"
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
            </div>
            <div className="form-control mt-3">
              <button className="rounded-lg bg-[#F97316] border-none text-white py-2">
                Sign Up
              </button>
            </div>
          </form>
          <div className="text-center my-3">
            {registerError && (
              <p className="text-red-500 text-sm px-5 mb-2">
                {registerError}
              </p>
            )}
            <p className="text-[14px] md:text-[16px] px-3 ">
              Already have an account? Please &nbsp;
              <Link to="/sign-in" className="text-blue-500">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
