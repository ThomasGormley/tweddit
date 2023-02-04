import { useState } from "react";
import PostToSubreddit from "./post-to-subreddit/post-to-subreddit";
import PostButtons from "./post-to-subreddit/post-buttons";
import { FormProvider, useForm } from "react-hook-form";
import { useWhatsHappeningState } from "./hooks/whats-happening-context";
import TextSubmissionForm from "./form/text-submission-form";
import useCurrentSubreddit from "@/hooks/use-current-subreddit";
import LinkSubmissionForm from "./form/link-submission-form";

export function WhatsHappening() {
    const currentSubreddit = useCurrentSubreddit();
    const { state } = useWhatsHappeningState();
    const [postToSubreddit] = useState(currentSubreddit);

    const linkSubmissionMethods = useForm({
        defaultValues: {
            composeTitle: "",
            composeUrl: "",
        },
    });
    const textSubmissionMethods = useForm({
        defaultValues: {
            composeTitle: "",
            composeBody: "",
        },
    });

    const isTextSubmission = state.postType === "text";
    return (
        <div className="group w-full py-[12px]">
            {isTextSubmission ? (
                <FormProvider {...textSubmissionMethods}>
                    <TextSubmissionForm />
                </FormProvider>
            ) : (
                <FormProvider {...linkSubmissionMethods}>
                    <LinkSubmissionForm />
                </FormProvider>
            )}
            {state.inputHasBeenFocused && (
                <PostToSubreddit postToSubreddit={postToSubreddit} />
            )}
            <PostButtons />
        </div>
    );
}
