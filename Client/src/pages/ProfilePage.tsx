import { useState } from "react";
import { useStats, useUpdateDisplayName } from "../hooks/useQuiz";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function ProfilePage() {
    const { data, isLoading } = useStats();
    const updateName = useUpdateDisplayName();

    const [newName, setNewName] = useState("");
    const { setDisplayName } = useUser();

    const handleUpdate = async () => {
        await updateName.mutateAsync(newName);
        setDisplayName(newName);
        setNewName("");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
            <div className="max-w-md w-full space-y-6">
                <h1 className="text-3xl font-bold text-center">Profile</h1>

                {/* Display Name */}
                <div className="space-y-2">
                    <input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="New display name"
                        className="w-full p-3 rounded text-black"
                    />

                    <button onClick={handleUpdate} className="w-full bg-white text-black py-2 rounded-lg">
                        Update Name
                    </button>
                </div>

                {/* Stats */}
                {isLoading && <p>Loading stats...</p>}

                {data && (
                    <div className="space-y-2 text-center">
                        <div>Total Attempts: {data.totalAttempts}</div>
                        <div>Total Score: {data.totalScore}</div>
                        <div>Avg Score: {data.averageScore}</div>
                        <div>Best Score: {data.bestScore}</div>
                        <div>Accuracy: {data.averageAccuracy}%</div>
                    </div>
                )}

                <Link to="/" className="block w-full text-center border border-gray-600 py-2 rounded-lg">
                    Back
                </Link>
            </div>
        </div>
    );
}
