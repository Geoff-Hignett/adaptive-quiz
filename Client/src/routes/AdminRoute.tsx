import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function AdminRoute({ children }: { children: React.ReactNode }) {
    const { role, isReady } = useUser();

    console.log("[AdminRoute]");
    console.log("isReady:", isReady);
    console.log("role:", role);

    if (!isReady) {
        console.log("[AdminRoute] waiting for user");
        return null;
    }

    if (role !== "Admin") {
        console.log("[AdminRoute] redirecting to /quiz");
        return <Navigate to="/quiz" replace />;
    }

    console.log("[AdminRoute] allowed");

    return children;
}
