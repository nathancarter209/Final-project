import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../config/Context"; 
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MdAlternateEmail } from "react-icons/md";
import { BiSolidLockAlt } from "react-icons/bi";
import { GoAlertFill, GoVerified } from "react-icons/go";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Transition from "../components/Transition";

const schema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
}).required();

const Login = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const { signIn, signInWithGoogle } = useAuth(); // Correct destructuring
    const [loginError, setLoginError] = useState(null);
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const [popup, setPopup] = useState(false);
    const [showTransition, setShowTransition] = useState(true);

    useEffect(() => {
        setLoginError(null); // Clear any previous errors
        window.scrollTo(0, 0);
        const timeout = setTimeout(() => {
            setShowTransition(false);
        }, 3000);
        return () => clearTimeout(timeout);
    }, []);

    const onSubmit = async (data) => {
        setLoginError(null); // Clear error before attempting login
        try {
            await signIn(data.email, data.password);
            reset();
            setPopup(true);
            setTimeout(() => setPopup(false), 3000);
            navigate("/"); // Navigate to home or desired route
        } catch (error) {
            console.error("Login error:", error);
            setLoginError(error.message); // Set the error message to state for display
        }
    };

    const handleVisibility = () => {
        setVisible((prevStat) => !prevStat);
    };

    return (
        <div className="Form-container">
          {showTransition && <Transition />}
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex-column">
                    <label>Email</label>
                </div>
                <div className="inputForm">
                    <span><MdAlternateEmail /></span>
                    <input type="email" {...register("email")} placeholder="Enter Your Email" className="input" />
                </div>
                {errors.email && <p className="alert"><GoAlertFill /> {errors.email.message} <GoAlertFill /></p>}

                <div className="flex-column">
                    <label>Password</label>
                </div>
                <div className="inputForm">
                    <span><BiSolidLockAlt /></span>
                    <input type={visible ? "text" : "password"} {...register("password")} placeholder="Enter Your Password" className="input" />
                    <span className="Eye" onClick={handleVisibility}>{visible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}</span>
                </div>
                {errors.password && <p className="alert"><GoAlertFill /> {errors.password.message} <GoAlertFill /></p>}

                {loginError && <p className="alert" style={{ color: "red" }}><GoAlertFill /> {loginError} <GoAlertFill /></p>} {/* Display login error */}

                <button className="button-submit" type="submit">Login</button>

                <p className="p">Don't have an account?
                    <Link to="/signup"><span className="span">Sign Up</span></Link>
                </p>

                <br />
                <div className="flex-row">
                    <button className="btn google" onClick={signInWithGoogle}>
                        <FcGoogle /> Sign In with Google
                    </button>
                </div>
            </form>
            {popup && (
                <div className="popup">
                    <GoVerified /><p> Welcome! You have successfully logged in</p>
                </div>
            )}
        </div>
    );
};

export default Login;