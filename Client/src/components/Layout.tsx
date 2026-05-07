import Header from "./Header";

type LayoutProps = {
    children: React.ReactNode;
    width?: "narrow" | "wide";
};

export default function Layout({ children, width = "narrow" }: LayoutProps) {
    return (
        <div className="min-h-screen bg-gray-950 text-white">
            <Header />

            <main className="px-3 py-4 sm:px-6 sm:py-6">
                <div className={`mx-auto w-full ${width === "narrow" ? "max-w-md" : "max-w-5xl"}`}>{children}</div>
            </main>
        </div>
    );
}
