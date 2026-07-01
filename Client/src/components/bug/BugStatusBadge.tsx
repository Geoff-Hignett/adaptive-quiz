import { getStatusClasses } from "../../utils/bugStatus";

interface Props {
    status: string;
}

export default function BugStatusBadge({ status }: Props) {
    return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getStatusClasses(status)}`}>{status}</span>;
}
