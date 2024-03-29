import { PostButtonIcons } from "./post-button-icons";
import { useMemo } from "react";
import type {
    PostButtonsProperties,
} from "../types";
import { useWhatsHappeningState } from "../hooks/whats-happening-context";
import clsx from "clsx";

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
            <div className="flex flex-row">
                {buttonsData.map(({ id, ariaLabel, onClick }) => {
                    const isLinkPostAndMediaIcon =
                        state.postType === "text" && id === "media";
                    return (
                        <button
                            type="button"
                            className="flex h-[36px] w-[36px] items-center justify-center rounded-full transition-colors duration-200 hover:cursor-pointer hover:bg-primary/10"
                            aria-label={ariaLabel}
                            key={id}
                            onClick={onClick}
                        >
                            <div
                                className={clsx(
                                    "h-[20px] w-[20px] text-primary",
                                    isLinkPostAndMediaIcon && "opacity-50",
                                )}
                            >
                                <PostButtonIcons id={id} />
                            </div>
                        </button>
                    );
                })}
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
