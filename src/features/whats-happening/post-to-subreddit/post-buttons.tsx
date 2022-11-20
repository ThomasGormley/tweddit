import { PostButtonIcons } from "./post-button-icons";
import { Dispatch, useMemo } from "react";
import type {
    PostButtonsProperties,
    WhatsHappeningReducerActions,
    WhatsHappeningReducerState,
} from "../types";
import { useWhatsHappeningState } from "../hooks/whats-happening-context";

function PostButtons() {
    const { state, dispatch } = useWhatsHappeningState();
    const buttonsData: Array<PostButtonsProperties> = useMemo(
        () => [
            {
                id: "text",
                ariaLabel: "Submit a text based post",
                onClick: () =>
                    dispatch({ type: "setSubmissionType", payload: "text" }),
            },
            {
                id: "link",
                ariaLabel: "Submit a link based post",
                onClick: () =>
                    dispatch({ type: "setSubmissionType", payload: "link" }),
            },
            {
                id: "media",
                ariaLabel: "Add photos or video",
                onClick: () =>
                    dispatch({ type: "setSubmissionType", payload: "link" }),
            },
            {
                id: "repliesToInbox",
                ariaLabel: "Send replies to my inbox",
                onClick: () => dispatch({ type: "toggleRepliesToInbox" }),
            },
        ],
        [],
    );
    return (
        <div className="my-2 flex justify-between">
            <div className="flex flex-row space-x-2">
                {buttonsData.map(({ id, ariaLabel, onClick }) => (
                    <button
                        type="button"
                        className="flex h-[36px] w-[36px] items-center justify-center rounded-full transition-colors duration-200 hover:cursor-pointer hover:bg-primary/10"
                        aria-label={ariaLabel}
                        key={id}
                        onClick={onClick}
                    >
                        <div className="h-[20px] w-[20px] text-primary">
                            <PostButtonIcons id={id} />
                        </div>
                    </button>
                ))}
            </div>
            <button
                type="submit"
                form="whats-happening"
                className="rounded-full bg-primary px-[16px]"
            >
                Tweet
            </button>
        </div>
    );
}

export default PostButtons;
