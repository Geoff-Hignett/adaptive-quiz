export default function AdminQuestionsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Manage Questions</h1>

                    <p className="text-sm text-gray-400">Create, edit and manage quiz questions.</p>
                </div>

                <button className="rounded-lg bg-white px-4 py-2 font-medium text-black transition hover:bg-gray-200">Create Question</button>
            </div>

            <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
                <p className="text-gray-400">Question management coming soon.</p>
            </div>
        </div>
    );
}
