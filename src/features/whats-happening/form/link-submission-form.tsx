import InputField from "@/components/forms/InputField";
import TextareaField from "@/components/forms/TextareaField";
import { Fragment, useState } from "react";
import { useForm, useFormContext, useFormState } from "react-hook-form";
import { useWhatsHappeningState } from "../hooks/whats-happening-context";

export default function LinkSubmissionForm() {
    const { dispatch, state } = useWhatsHappeningState();
    const { register, handleSubmit, control } = useFormContext<{
        composeTitle: string;
        composeUrl: string;
    }>();
    const { onBlur, ...restRegister } = register("composeTitle");
    const { isDirty, errors, touchedFields } = useFormState({ control });
    const shouldShowTextarea =
        state.inputHasBeenFocused ||
        isDirty ||
        touchedFields.composeTitle ||
        touchedFields.composeUrl;

    const onSubmit = (data: any) => {
        console.log(data);
    };

    const registerTitle: typeof restRegister = {
        ...restRegister,
        maxLength: 300,
        required: true,
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} id="whats-happening">
            <InputField
                label="Submission title text"
                labelClass="sr-only"
                placeholder="What's happening?"
                className="w-full resize-none overflow-auto overflow-y-hidden border-none bg-transparent py-[2px] text-20px leading-[24px] outline-none"
                onFocus={() => dispatch({ type: "inputHasBeenFocused" })}
                onBlur={(e) => {
                    onBlur(e);
                }}
                {...registerTitle}
            />
            {shouldShowTextarea && (
                <InputField
                    label="Submission url"
                    labelClass="sr-only"
                    placeholder="Share a link"
                    className="text-18px w-full resize-none overflow-auto overflow-y-hidden border-none bg-transparent py-[2px] leading-[24px] outline-none"
                    {...register("composeTitle")}
                />
            )}
        </form>
    );
}
