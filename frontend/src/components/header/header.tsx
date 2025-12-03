import { useQuery } from "@tanstack/react-query";
import useSessionContext from "../../context/useContext";
import Username from "./logoutBtn";
import fetchHeaderData from "../../api/services/headerData";
import Spinner from "../others/spinner";

const Header: React.FC = () => {
    const { user } = useSessionContext();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["headerData"],
        queryFn: fetchHeaderData
    });

    const getValue = (value?: number) => {
        if (isLoading) return <Spinner />;
        if (isError) return "XXX";
        return value ?? "-";
    };

    return (
        <header className="bg-black flex flex-wrap justify-between text-gray-300 px-4 py-2">

            <div>
                <p>Total Users: {getValue(data?.total_users)}</p>
            </div>

            <div>
                <p>Active Users: {getValue(data?.active_users)}</p>
            </div>

            <div>
                <p>Total categories: {getValue(data?.total_categories)}</p>
            </div>

            <div>
                <p>Total Boards: {getValue(data?.total_boards)}</p>
            </div>

            <div>
                <p>Total Threads: {getValue(data?.total_threads)}</p>
            </div>

            <div>
                <p>About</p>
            </div>

            <div>
                <p>Developer</p>
            </div>

            {user && (
                <div className="flex flex-row gap-2">
                    <Username />
                </div>
            )}

        </header>
    );
};

export default Header;
