import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from "../config/Context";
import * as yup from "yup";
import '../index.css';
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MdAlternateEmail } from 'react-icons/md';
import { BiSolidLockAlt } from 'react-icons/bi';
import { GoAlertFill, GoVerified } from 'react-icons/go';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineUser } from 'react-icons/ai';
import Transition from '../components/Transition';

const schema = yup.object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    phoneNumber: yup.string().required("Phone Number is required"),
    address: yup.string().required("Address is required"),
}).required();

const Signup = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });

    const [visible, setVisible] = useState(false);
    const { signUp, signInWithGoogle } = useAuth();
    const [showTransition, setShowTransition] = useState(true);
    const [signUpError, setSignUpError] = useState(null);
    const navigate = useNavigate();
    const [popup, setPopup] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const timeout = setTimeout(() => {
            setShowTransition(false);
        }, 3000);
        return () => clearTimeout(timeout);
    }, []);

    const onSubmit = async (data) => {
        setSignUpError(null);
        console.log("data from form", data); // Crucial for debugging
        try {
            const displayName = `${data.firstName} ${data.lastName}`;
            await signUp(data.email, data.password, false, displayName, data.phoneNumber, data.address);
            reset();
            setPopup(true);
            setTimeout(() => setPopup(false), 3000);
            navigate('/login');
        } catch (error) {
            console.error("Sign up error:", error);
            setSignUpError(error.message);
        }
    };

    const handleVisibility = () => {
        setVisible(prevStat => !prevStat);
    };

    return (
        <div className="Form-container">
            {showTransition && <Transition />}
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex-column">
                    <label>First Name</label>
                </div>
                <div className="inputForm">
                    <span><AiOutlineUser /></span>
                    <input {...register("firstName")} placeholder="Enter Your First Name" className="input" />
                </div>
                {errors.firstName && <p className="alert"><GoAlertFill /> {errors.firstName.message} <GoAlertFill /></p>}

                <div className="flex-column">
                    <label>Last Name</label>
                </div>
                <div className="inputForm">
                    <span><AiOutlineUser /></span>
                    <input {...register("lastName")} className="input" placeholder="Enter Your Last Name" />
                </div>
                {errors.lastName && <p className="alert"><GoAlertFill /> {errors.lastName.message} <GoAlertFill /></p>}

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

                <div className="flex-column">
                    <label>Phone Number</label>
                </div>
                <div className="inputForm">
                    <span>{/* Phone Icon */}</span>
                    <input type="tel" {...register("phoneNumber")} placeholder="Enter Your Phone Number" className="input" />
                </div>
                {errors.phoneNumber && <p className="alert"><GoAlertFill /> {errors.phoneNumber.message} <GoAlertFill /></p>}

                <div className="flex-column">
                    <label>Address</label>
                </div>
                <div className="inputForm">
                    <span>{/* Address Icon */}</span>
                    <textarea {...register("address")} placeholder="Enter Your Address" className="input" />
                </div>
                {errors.address && <p className="alert"><GoAlertFill /> {errors.address.message} <GoAlertFill /></p>}

                {signUpError && <p className="alert" style={{ color: 'red' }}><GoAlertFill /> {signUpError} <GoAlertFill /></p>}

                <button className="button-submit" type="submit">Sign Up</button>

                <p className="p">Already have an account?
                    <Link to='/login'><span className="span">Login</span></Link>
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
                    <GoVerified /><p> Welcome! You have successfully signed up</p>
                </div>
            )}
        </div>
    );
};

export default Signup;