import { getSeverityClasses } from "../../utils/bugSeverity";

interface Props {
    severity: string;
}

export default function BugSeverityBadge({ severity }: Props) {
    return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getSeverityClasses(severity)}`}>{severity}</span>;
}
