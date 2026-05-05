import { useLocation, Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import { ChevronDownIcon, TrophyIcon, HomeIcon, InformationCircleIcon } from "@heroicons/react/24/solid";

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const { displayName } = useUser();

    const [open, setOpen] = useState(false);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/");
    };

    const navItem = (path: string, label: string, Icon?: React.ComponentType<{ className?: string }>) => {
        const isActive = location.pathname === path;

        return (
            <Link
                to={path}
                className={`px-2 py-1 rounded transition flex items-center gap-2 ${
                    isActive ? "text-white font-semibold" : "text-gray-400 hover:text-white"
                }`}>
                {Icon && <Icon className="w-4 h-4" />}
                {label}
            </Link>
        );
    };

    return (
        <div className="w-full flex justify-between items-center px-6 py-4 bg-gray-900 border-b border-gray-800">
            {/* Left nav */}
            <div className="flex items-center gap-6">
                {navItem("/quiz", "Quiz", HomeIcon)}
                {navItem("/leaderboard", "Leaderboard", TrophyIcon)}
                {navItem("/about", "About", InformationCircleIcon)}
            </div>

            {/* Right dropdown */}
            <div className="relative">
                <button onClick={() => setOpen(!open)} className="flex items-center gap-2 text-gray-300 hover:text-white transition">
                    {displayName || "Profile"}
                    <ChevronDownIcon className="w-4 h-4" />
                </button>

                {open && (
                    <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
                        <Link to="/profile" onClick={() => setOpen(false)} className="block px-4 py-2 hover:bg-gray-700">
                            Profile
                        </Link>

                        <Link to="/stats" onClick={() => setOpen(false)} className="block px-4 py-2 hover:bg-gray-700">
                            Stats
                        </Link>

                        <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-red-500/20 text-red-400">
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
