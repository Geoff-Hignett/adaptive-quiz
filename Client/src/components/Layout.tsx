import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-950 text-white">
            <Header />

            <main className="px-3 py-4 sm:px-6 sm:py-6">
                <div className="mx-auto w-full max-w-md">{children}</div>
            </main>
        </div>
    );
}
