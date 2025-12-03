import { useEffect, useState } from "react";
import useSessionContext from "../../context/useContext";
import Timer from "./Timer";
import SessionOver from "../popups/sessionOver";
import { useMutation } from "@tanstack/react-query";
import logoutAdminOrUser from "../../api/services/logout";
import { useNavigate } from "react-router-dom";

interface Timer {
    hours: number;
    minutes: number;
    seconds: number;
    onComplete?: () => void;
}

const Username = () => {

    const navigate = useNavigate();
    const { user, setUser } = useSessionContext();
    const [time, setTime] = useState<Timer>();
    const [showPopUp, setShowPopUp] = useState<boolean | null>(null);
    const [logoutURL, setLogoutURL] = useState<string>("");

    //setting the logout url
    useEffect(() => {
        if (user?.session_data?.type === "admin") {
            setLogoutURL('/admin/admin_logout');
        } else {
            setLogoutURL('/anonymous/anon_logout');
        }
    }, [user?.session_data.type]);

    const LogoutMutation = useMutation({

        mutationKey: ["logoutQuery"],

        mutationFn: () => logoutAdminOrUser({ logoutURL }),

        onSuccess: (data) => {
            if (data?.success) {
                console.log(data)
                setUser(data);
                localStorage.removeItem('user');
                navigate('/');
            }

            if (!data?.authorized) {
                setUser(null);
                localStorage.removeItem('user');
                navigate('/');
            }
        },

        onError: (data) => {
            console.error('Server failed to logout (success: false)', data);
        }
    });

    //this is to set the timers remaining time.
    useEffect(() => {
        if (user?.session_expiry) {

            const givenTime = new Date(user.session_expiry);

            //this is the current time
            const now = new Date();


            //.getTime() will convert both of them in milliseconds
            const diffMs = givenTime.getTime() - now.getTime();

            // If the time already passed:
            if (diffMs <= 0) {
                setTime({ hours: 0, minutes: 0, seconds: 0 });
            } else {
                const hours = Math.floor(diffMs / (1000 * 60 * 60));
                const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
                setTime({ hours, minutes, seconds });
            }
        }
    }, [user])

    const handleComplete = () => {
        setShowPopUp(true);
    }

    if (user?.session_data) {

        const userType = user.session_data?.type;
        const username = user.session_data?.username;

        if (!time) return null;

        return (
            <div className="flex gap-7">
                <div className="flex gap-2 text-red-600">
                    {userType === 'admin' && <span role="img" aria-label="shield"> 🛡️ </span>}
                    {userType === 'anonymous' && <span role="img" aria-label="wave"> 🥸 </span>}
                    {username || 'user'}
                    <Timer hours={time?.hours} minutes={time?.minutes} seconds={time?.seconds} onComplete={handleComplete} />
                </div>

                <button onClick={() => LogoutMutation.mutate()} className="border-1 border-gray-400 px-2 cursor-pointer">
                    {LogoutMutation.isPending ? "Logging Out" : "Logout"}
                </button>

                {showPopUp && <SessionOver setShowPopUp={setShowPopUp} />}
            </div>
        );
    }
}

export default Username;
