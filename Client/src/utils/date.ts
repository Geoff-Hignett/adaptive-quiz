import { formatDistanceToNow } from "date-fns";

export function formatRelativeDate(date: string) {
    return formatDistanceToNow(new Date(date), {
        addSuffix: true,
    });
}
