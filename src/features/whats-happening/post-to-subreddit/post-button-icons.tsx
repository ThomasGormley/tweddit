import { PostButtonsProperties } from "../types";
import { match } from "@/lib/util/match";
import {
    DocumentTextIcon,
    FaceSmileIcon,
    InboxArrowDownIcon,
    InboxIcon,
    LinkIcon,
    PhotoIcon,
} from "@heroicons/react/24/outline";
import { useWhatsHappeningState } from "../hooks/whats-happening-context";

export function PostButtonIcons({ id }: { id: PostButtonsProperties["id"] }) {
    const { state } = useWhatsHappeningState();
    const { repliesToInbox } = state;
    return match(id, {
        link: () => <LinkIcon />,
        text: () => <DocumentTextIcon />,
        media: () => <PhotoIcon />,
        repliesToInbox: () =>
            repliesToInbox ? <InboxArrowDownIcon /> : <InboxIcon />,
    });
}
