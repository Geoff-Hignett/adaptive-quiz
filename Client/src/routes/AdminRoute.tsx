import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function AdminRoute({ children }: { children: React.ReactNode }) {
    const { role } = useUser();

    if (role !== "Admin") {
        return <Navigate to="/quiz" replace />;
    }

    return children;
}
