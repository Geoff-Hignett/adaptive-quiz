export function getSeverityClasses(severity: string) {
    switch (severity) {
        case "Low":
            return "bg-blue-500/20 text-blue-300 border border-blue-500/30";

        case "Medium":
            return "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30";

        case "High":
            return "bg-orange-500/20 text-orange-300 border border-orange-500/30";

        case "Critical":
            return "bg-red-500/20 text-red-300 border border-red-500/30";

        default:
            return "bg-gray-700 text-gray-200";
    }
}
