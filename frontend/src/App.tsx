import { useEffect, useState } from "react";
import EnterAnonymousName from "./components/auth/anonymousEnter";
import useSessionContext from "./context/useContext";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminAuthComponent from "./components/auth/Admin";
import checkSessionExistence from "./api/services/checkSessionExistence";
import fetchHeaderData from "./api/services/headerData";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./components/others/spinner";
import { useNavigate } from "react-router-dom";
import MainText from "./components/others/mainText";

const App = () => {

  const [showAnonForm, setshowAnonForm] = useState(false);
  const [showAdminForm, setshowAdminForm] = useState(false);
  const { user } = useSessionContext();
  const [isLogout, setIsLogout] = useState(false);
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["headerData"],
    queryFn: fetchHeaderData
  });

  // QUERY TO CHECK SESSION EXISTENCE
  const { data: sessionExists } = useQuery({
    queryKey: ["checkingSessionExistenceOnServer"],
    queryFn: checkSessionExistence
  });

  //IF THE SESSION AND LOCAL_STORAGE EXISTS JUST FORWARD TO HOME ROUTE
  useEffect(() => {
    if (!sessionExists) return;

    const checkLocal = localStorage.getItem("user");
    if (sessionExists && checkLocal) {
      navigate("/home", { replace: true });

      //✅ What replace: true does
      // It replaces the current entry in the browser's history instead of adding a new one.

    }
  }, [sessionExists, navigate]);

  useEffect(() => {
    if (user?.success) {
      setIsLogout(true);
    }
  }, [user]);

  //TOAST MESSAGE OF LOGOUT
  useEffect(() => {
    if (isLogout) {
      toast(user?.message || "You’ve been logged out!");
    }
  }, [isLogout, user?.message]);

  return (
    <div className="flex flex-col gap-2 bg-black items-center justify-center min-h-screen">

      {/* this is the main text in acii blurr */}
      <MainText />

      <p className="text-lg text-[#EAE4D9] mt-10">

        Greetings, <span className="font-bold">{isLoading ? <Spinner /> : isError ? "Guest" : data?.ip}</span>
      </p>

      <p className="text-[#A9A296] text-sm md:text-base italic">
        Choose your path to continue the <strong>Midnight Edition</strong> experience.
      </p>

      {/* two buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button className="cursor-pointer border-2 border-white text-white p-4"
          onClick={() => { setshowAdminForm(false); setshowAnonForm((prev) => !prev) }}>
          {showAnonForm ? "close[X]" : "🥸 Anonymous Access"}
        </button>

        <button className="cursor-pointer border-2 border-white text-white p-4"
          onClick={() => { setshowAnonForm(false); setshowAdminForm((prev) => !prev) }}>
          {showAdminForm ? "close[X]" : "🛡️ Admin Access"}
        </button>
      </div>

      {/* Conditional Form */}
      {showAnonForm && (
        <div className="mt-6 w-full bg-black p-6 rounded-lg">
          <p className="text-[#EAE4D9]">Anonymous Name Entry Form goes here...</p>
          <EnterAnonymousName />
        </div>
      )}

      {showAdminForm && (
        <div className="mt-6 w-full bg-black p-6 rounded-lg">
          <AdminAuthComponent />
        </div>
      )}


      <ToastContainer position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce} />
    </div>
  );
};

export default App;
