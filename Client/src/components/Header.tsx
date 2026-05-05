import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";

export default function Header() {
    const { displayName } = useUser();

    return (
        <div className="w-full flex justify-between items-center p-4 bg-gray-900 text-white">
            <Link to="/">Quiz</Link>

            <div className="flex gap-4 items-center">
                <Link to="/leaderboard">Leaderboard</Link>
                <Link to="/profile">{displayName || "Profile"}</Link>
            </div>
        </div>
    );
}
