import { useRouter } from "next/router";
import { useRef, useState } from "react";
import PostToSubreddit from "./post-to-subreddit/post-to-subreddit";
import PostButtons from "./post-to-subreddit/post-buttons";
import { FormProvider, useForm, useFormState } from "react-hook-form";
import TextareaField from "@/components/forms/TextareaField";
import InputField from "@/components/forms/InputField";
import { useWhatsHappeningState } from "./hooks/whats-happening-context";
import TextSubmissionForm from "./form/text-submission-form";
import useCurrentSubreddit from "@/hooks/use-current-subreddit";

export function WhatsHappening() {
    const currentSubreddit = useCurrentSubreddit();
    const { state } = useWhatsHappeningState();
    const [postToSubreddit, setPostToSubreddit] = useState(currentSubreddit);

    const textSubmissionMethods = useForm({
        defaultValues: {
            composeTitle: "",
            composeBody: "",
        },
    });
    const { touchedFields } = useFormState({
        control: textSubmissionMethods.control,
    });

    const textareaHasBeenFocused = touchedFields.composeTitle;

    const onSubmit = (data: any) => {
        console.log(data);
    };

    const isTextSubmission = state.postType === "text";
    const FormComponent = isTextSubmission
        ? TextSubmissionForm
        : TextSubmissionForm;
    const formMethods = isTextSubmission
        ? textSubmissionMethods
        : textSubmissionMethods;

    return (
        <div className="group w-full py-[12px]">
            <FormProvider {...formMethods}>
                <FormComponent />
            </FormProvider>
            {textareaHasBeenFocused && (
                <PostToSubreddit postToSubreddit={postToSubreddit} />
            )}
            <PostButtons />
        </div>
    );
}
