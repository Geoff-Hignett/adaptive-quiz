import { useLocation, Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronDownIcon, TrophyIcon, HomeIcon, InformationCircleIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { displayName, role } = useUser();

    const [open, setOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        queryClient.clear();
        navigate("/");
    };

    const navItem = (path: string, label: string, Icon?: React.ComponentType<{ className?: string }>) => {
        const isActive = location.pathname === path;

        return (
            <Link
                to={path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 rounded px-2 py-2 transition ${
                    isActive ? "font-semibold text-white" : "text-gray-400 hover:text-white"
                }`}>
                {Icon && <Icon className="h-4 w-4" />}
                {label}
            </Link>
        );
    };

    const roleBadge = () => {
        if (!role || role === "User") return null;

        const styles =
            role === "Admin" ? "bg-red-500/20 text-red-300 border border-red-500/30" : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30";

        return <span className={`rounded px-2 py-0.5 text-xs font-semibold ${styles}`}>{role.toUpperCase()}</span>;
    };

    return (
        <header className="border-b border-gray-800 bg-gray-900">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-3 sm:px-6">
                {/* Left */}
                <div className="flex items-center gap-6">
                    {/* Desktop nav */}
                    <nav className="hidden items-center gap-4 md:flex">
                        {navItem("/quiz", "Quiz", HomeIcon)}
                        {navItem("/leaderboard", "Leaderboard", TrophyIcon)}
                        {navItem("/about", "About", InformationCircleIcon)}
                    </nav>
                </div>

                {/* Right */}
                <div className="flex items-center gap-3">
                    {/* Desktop profile dropdown */}
                    <div className="relative hidden md:block">
                        <button onClick={() => setOpen(!open)} className="flex items-center gap-2 text-gray-300 transition hover:text-white">
                            <span className="max-w-[120px] truncate">{displayName || "Profile"}</span>
                            {roleBadge()}

                            <ChevronDownIcon className="h-4 w-4" />
                        </button>

                        {open && (
                            <div className="absolute right-0 mt-2 w-44 rounded-lg border border-gray-700 bg-gray-800 shadow-lg">
                                <Link to="/profile" onClick={() => setOpen(false)} className="block px-4 py-2 hover:bg-gray-700">
                                    Profile
                                </Link>

                                <Link to="/stats" onClick={() => setOpen(false)} className="block px-4 py-2 hover:bg-gray-700">
                                    Stats
                                </Link>

                                {role === "Admin" && (
                                    <Link to="/admin/questions" onClick={() => setOpen(false)} className="block px-4 py-2 hover:bg-gray-700">
                                        Manage Questions
                                    </Link>
                                )}

                                <button onClick={handleLogout} className="w-full px-4 py-2 text-left text-red-400 hover:bg-red-500/20">
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button onClick={() => setMobileOpen(!mobileOpen)} className="text-gray-300 md:hidden">
                        {mobileOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="border-t border-gray-800 bg-gray-900 px-3 py-3 md:hidden">
                    <div className="mb-4 flex items-center gap-2 px-2">
                        <span className="font-medium text-white">{displayName || "Profile"}</span>

                        {roleBadge()}
                    </div>

                    <nav className="flex flex-col gap-1">
                        {navItem("/quiz", "Quiz", HomeIcon)}

                        {navItem("/leaderboard", "Leaderboard", TrophyIcon)}

                        {navItem("/about", "About", InformationCircleIcon)}

                        {navItem("/profile", "Profile")}

                        {navItem("/stats", "Stats")}

                        {role === "Admin" && navItem("/admin/questions", "Manage Questions")}

                        <button onClick={handleLogout} className="rounded px-2 py-2 text-left text-red-400 hover:bg-red-500/20">
                            Logout
                        </button>
                    </nav>
                </div>
            )}
        </header>
    );
}
