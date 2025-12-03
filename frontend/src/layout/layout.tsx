import { Outlet } from "react-router-dom";
import Header from "../components/header/header.js";
import Footer from "../components/footer/footer.js";

const LayoutBay: React.FC = () => {

    return <div className="font-terminal min-h-screen">
        <Header />
        <Outlet />
        <Footer />
    </div>
}

export default LayoutBay;