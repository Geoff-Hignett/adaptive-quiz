import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="border-t border-gray-800 bg-gray-900">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 text-sm text-gray-400 sm:flex-row sm:px-6">
                <div>© {new Date().getFullYear()} Adaptive Quiz</div>

                <div className="flex items-center gap-6">
                    <Link to="/about" className="transition hover:text-white">
                        About
                    </Link>

                    <Link to="/bugs" className="transition hover:text-white">
                        Report Bug
                    </Link>
                </div>
            </div>
        </footer>
    );
}
