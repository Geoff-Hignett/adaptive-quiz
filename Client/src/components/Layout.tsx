import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = {
    children: React.ReactNode;
    width?: "narrow" | "wide" | "admin";
};

export default function Layout({ children, width = "narrow" }: LayoutProps) {
    const maxWidth = width === "narrow" ? "max-w-md" : width === "wide" ? "max-w-5xl" : "max-w-7xl";

    return (
        <div className="flex min-h-screen flex-col bg-gray-950 text-white">
            <Header />

            <main className="flex-1 px-4 py-4 sm:px-6 sm:py-6">
                <div className={`mx-auto w-full ${maxWidth}`}>{children}</div>
            </main>

            <Footer />
        </div>
    );
}
