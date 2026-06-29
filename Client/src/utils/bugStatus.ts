export function getStatusClasses(status: string) {
    switch (status) {
        case "Open":
            return "bg-blue-500/20 text-blue-300 border border-blue-500/30";

        case "In Progress":
            return "bg-amber-500/20 text-amber-300 border border-amber-500/30";

        case "Resolved":
            return "bg-green-500/20 text-green-300 border border-green-500/30";

        case "Closed":
            return "bg-gray-500/20 text-gray-300 border border-gray-500/30";

        default:
            return "bg-gray-700 text-gray-300";
    }
}
