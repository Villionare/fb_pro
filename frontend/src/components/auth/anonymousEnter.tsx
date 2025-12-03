import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSessionContext from "../../context/useContext";
import createAnonymousUser from "../../api/services/Anonymous";
import { useMutation } from "@tanstack/react-query";

const EnterAnonymousName = () => {
    const { login } = useSessionContext();
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const AnonymousMutation = useMutation({
        mutationKey: ["AnonymousAuth"],
        mutationFn: () => createAnonymousUser(username),
        onSuccess: (data) => {
            login(data);
            navigate('home');
            console.log(data)
        },
        onError: (data) => { console.log("error happened", data) },
    });

    return (
        // Inner Container BG: Dark News Block (#232527) with a Column Rule border
        <div className="flex flex-col bg-black p-4 gap-2 rounded-lg border border-[#424549] shadow-md">

            <form onSubmit={(e) => { e.preventDefault(); AnonymousMutation.mutate() }}>
                <div className="flex flex-row  gap-3 items-center justify-center">

                    <input
                        type="text"
                        className="flex-1 w-full sm:w-auto px-4 py-2 rounded-md border border-[#424549] bg-black text-[#EAE4D9] placeholder-[#A9A296] focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Enter your username..."
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} />

                    <button
                        type="submit"
                        // Button styling: Journalist's Blue BG, Aged Paper White Text, Pressed Ink Blue Hover
                        className="bg-black border-1 border-[#424549] p-2 text-[#EAE4D9] rounded-md font-semibold cursor-pointer w-full sm:w-auto">
                        Start Session (24hrs)
                    </button>
                </div>
            </form>
            <p className="text-white">
                ** username should be unique, <br />
                ** minimum letters 3, <br />
                ** you will be signed in the ip address, until you manually sign out <br />
                ** session will be off 24hrs, after that all of your data will be removed <br />
                ** your identity is safe.
            </p>
        </div>
    );
}

export default EnterAnonymousName;
