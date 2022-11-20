import InputField from "@/components/forms/InputField";
import TextareaField from "@/components/forms/TextareaField";
import { useState } from "react";
import { useForm, useFormContext, useFormState } from "react-hook-form";

export default function TextSubmissionForm() {
    const [textareaIsFocused, setTextareaIsFocused] = useState(false);
    const { register, handleSubmit, control } = useFormContext();
    const { onBlur, ...restRegister } = register("composeTitle");
    const { isDirty } = useFormState({ control });
    const shouldShowTextarea = textareaIsFocused || isDirty;

    const onSubmit = (data: any) => {
        console.log(data);
    };

    const registerTitle: typeof restRegister = {
        ...restRegister,
        max: 5,
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} id="whats-happening">
            <InputField
                label="Submission title text"
                labelClass="sr-only"
                placeholder="What's happening?"
                className="w-full resize-none overflow-auto overflow-y-hidden border-none bg-transparent py-[2px] text-20px leading-[24px] outline-none"
                onFocus={() => setTextareaIsFocused(true)}
                onBlur={(e) => {
                    onBlur(e);
                    setTextareaIsFocused(false);
                }}
                {...registerTitle}
            />
            {shouldShowTextarea && (
                <TextareaField
                    label="Submission body text"
                    labelClass="sr-only"
                    placeholder="Text"
                    rows={1}
                    wrap="hard"
                    className="text-18px w-full resize-none overflow-auto overflow-y-hidden border-none bg-transparent py-[2px] leading-[24px] outline-none"
                    {...register("composeBody")}
                ></TextareaField>
            )}
        </form>
    );
}
