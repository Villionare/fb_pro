import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminRequestSubmitted = () => {
    const navigate = useNavigate();

    //if no user Exists then redirect
    useEffect(() => {
        const check: string | null = localStorage.getItem("user");

        if (!check) {
            navigate('/')
        }
    }, []);
    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-900 text-gray-100 px-4">
            <div className="bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-md text-center">

                {/* Icon / Status */}
                <div className="flex justify-center mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-violet-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2l4-4m6 2a9 9 0 11-18 0a9 9 0 0118 0z" />
                    </svg>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-violet-400 mb-3">
                    Request Submitted
                </h2>

                {/* Message */}
                <p className="text-gray-300 mb-6">
                    Your request to become an admin has been submitted.
                    You will receive confirmation after verification within{" "}
                    <span className="font-semibold text-amber-400">30 minutes</span>.
                </p>

                {/* Button */}
                <button
                    onClick={() => window.location.href = "/"}
                    className="px-6 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 transition text-white font-semibold"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default AdminRequestSubmitted;
