import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSessionContext from "../../context/useContext.js"; // FIX: Added .jsx extension to resolve import path
import { useMutation } from "@tanstack/react-query";
import AdminAuth, { type Login, type SignUp } from "../../api/services/adminAuth.js";

const AdminAuthComponent: React.FC = () => {

    const navigate = useNavigate();
    const { login } = useSessionContext();
    const [isLogin, setInLogin] = useState(true);

    const [inpSignUpChange, setInpSignUpChange] = useState<SignUp>({
        signUpName: "",
        signUpAge: "",
        signUpUsername: "",
        signUpEmail: "",
        signUptypePassword: ""
    });

    const [inpSignInChange, setInpSignInChange] = useState<Login>({
        loginIdentifier: "",
        loginPassword: ""
    });

    const fetchUrl = isLogin ? '/admin/admin_login' : '/admin/admin_signup';
    const sending_data = isLogin ? inpSignInChange : inpSignUpChange;

    const AuthMutation = useMutation({
        mutationKey: ["AuthAdmin"],
        mutationFn: () => AdminAuth({ fetchUrl, sending_data }),
        onSuccess: (data) => {
            console.log("Server returned:", data);

            if (isLogin) {
                login(data);
                navigate('/home');
            } else {
                navigate('/adminsubmitted');
            }
        },
        onError: (data) => { console.log("error happened", data) },
    });

    const handleSignUpchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInpSignUpChange((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSignInchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInpSignInChange((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        // Outer Background: Deep Inkwell (#1A1C1E)
        <div className="flex justify-center items-center text-[#EAE4D9]">
            {/* Form Container Background: Dark News Block (#232527) */}
            <div className=" shadow-xl rounded-lg border-2 border-[#424549] p-8 w-full">

                {/* Title: Aged Paper White (#EAE4D9) */}
                <h2 className="text-3xl font-bold text-[#EAE4D9] text-center mb-6 tracking-tight">
                    {isLogin ? "Admin Login" : "Admin Creation"}
                </h2>
                {isLogin ?
                    <p className="mb-7">
                        NOTE: <br />
                        * to minimize security risks admin session is of only 1 hour after that, sign in again. <br />
                        * if you have any issue contact developer on - mr.duedull@gmail.com
                    </p>
                    :
                    <p className="mb-7">
                        NOTE: <br />
                        * fill each creadential with right details as it will be varified in the furtur process. <br />
                        * after signing up developer will contact you for the furture processes. <br />
                        * if you are facing any issue mail developer on - mr.duedull@gmail.com
                    </p>}
                {/* Form */}
                <form className="flex flex-col space-y-3" onSubmit={(e) => { e.preventDefault(); AuthMutation.mutate() }}>
                    {isLogin ? (
                        <>
                            <input
                                required
                                type="text"
                                name="loginIdentifier"
                                placeholder="Username or Email"
                                value={inpSignInChange.loginIdentifier}
                                onChange={handleSignInchange}
                                autoComplete="username"
                                // Input BG: Deep Inkwell, Text: Aged Paper White, Placeholder: Faded Newsprint, Focus: Journalist's Blue
                                className="w-full p-3 rounded-md  text-[#EAE4D9] placeholder-[#A9A296] border border-gray-400 focus:outline-0"
                            />
                            <input
                                required
                                type="password"
                                name="loginPassword"
                                placeholder="Enter your password"
                                value={inpSignInChange.loginPassword}
                                onChange={handleSignInchange}
                                autoComplete="current-password"
                                className="w-full p-3 rounded-md  text-[#EAE4D9] placeholder-[#A9A296] border border-gray-400 focus:outline-0"
                            />
                        </>
                    ) : (
                        <>
                            <input
                                required
                                type="text"
                                name="signUpName"
                                value={inpSignUpChange.signUpName}
                                placeholder="Enter your full name"
                                onChange={handleSignUpchange}
                                autoComplete="name"
                                className="w-full p-3 rounded-md  text-[#EAE4D9] placeholder-[#A9A296] border border-gray-400 focus:outline-0"
                            />
                            <input
                                required
                                type="number"
                                min="13"
                                name="signUpAge"
                                value={inpSignUpChange.signUpAge}
                                placeholder="Enter your age"
                                onChange={handleSignUpchange}
                                autoComplete="bday-year"
                                className="w-full p-3 rounded-md  text-[#EAE4D9] placeholder-[#A9A296] border border-gray-400 focus:outline-0"
                            />
                            <input
                                required
                                type="text"
                                name="signUpUsername"
                                value={inpSignUpChange.signUpUsername}
                                placeholder="Choose a username"
                                onChange={handleSignUpchange}
                                autoComplete="username"
                                className="w-full p-3 rounded-md  text-[#EAE4D9] placeholder-[#A9A296] border border-gray-400 focus:outline-0"
                            />
                            <input
                                required
                                type="email"
                                name="signUpEmail"
                                value={inpSignUpChange.signUpEmail}
                                placeholder="Enter your email address"
                                onChange={handleSignUpchange}
                                autoComplete="email"
                                className="w-full p-3 rounded-md  text-[#EAE4D9] placeholder-[#A9A296] border border-gray-400 focus:outline-0"
                            />
                            <input
                                required
                                type="password"
                                name="signUptypePassword"
                                value={inpSignUpChange.signUptypePassword}
                                placeholder="Create a strong password"
                                onChange={handleSignUpchange}
                                autoComplete="new-password"
                                minLength={6}
                                className="w-full p-3 rounded-md  text-[#EAE4D9] placeholder-[#A9A296] border border-gray-400 focus:outline-0"
                            />
                            <input
                                required
                                type="password"
                                name="signUpretypePassword"
                                // value={inpSignUpChange.signUpretypePassword} // Not defined in state, commented out
                                placeholder="Re-enter your password"
                                // onChange={handleSignUpchange} // Not defined in state, commented out
                                autoComplete="new-password"
                                className="w-full p-3 rounded-md  text-[#EAE4D9] placeholder-[#A9A296] border border-gray-400 focus:outline-0"
                            />
                        </>
                    )}

                    {/* Submit Button BG: Journalist's Blue (#5CA0D3), Hover: Pressed Ink Blue (#8BCFF2), Text: Aged Paper White (#EAE4D9) */}
                    <button
                        type="submit"
                        className="w-full py-3 mt-4 rounded-md border border-gray-400 cursor-pointer text-[#EAE4D9]"
                        disabled={AuthMutation.isPending}
                    >
                        {isLogin
                            ? AuthMutation.isPending
                                ? "Signing in..."
                                : "Sign In"
                            : AuthMutation.isPending
                                ? "Signing Up..."
                                : "Sign Up"
                        }
                    </button>
                </form>

                {/* Toggle Link */}
                <div className="text-center mt-6">
                    {isLogin ? (
                        <p className="text-[#A9A296]">
                            {/* Secondary Text: Faded Newsprint (#A9A296) */}
                            New User?{" "}
                            <button
                                onClick={() => setInLogin((prev) => !prev)}
                                // Link Text: Journalist's Blue (#5CA0D3)
                                className="text-white hover:underline cursor-pointer font-medium"
                            >
                                Sign Up
                            </button>
                        </p>
                    ) : (
                        <p className="text-[#A9A296]">
                            {/* Secondary Text: Faded Newsprint (#A9A296) */}
                            Already a User?{" "}
                            <button
                                onClick={() => setInLogin((prev) => !prev)}
                                // Link Text: Journalist's Blue (#5CA0D3)
                                className="text-white hover:underline cursor-pointer font-medium"
                            >
                                Sign In
                            </button>
                        </p>
                    )}
                </div>
            </div>
        </div>

    );
};

export default AdminAuthComponent;
