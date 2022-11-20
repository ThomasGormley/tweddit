import React, { forwardRef } from "react";

interface InputFieldProps extends React.ComponentProps<"input"> {
    label: string;
    name: string;
    labelClass: string;
}
type Ref = HTMLInputElement;

const InputField = React.forwardRef<Ref, InputFieldProps>(
    ({ name, labelClass, label, ...rest }, ref) => {
        return (
            <>
                <label htmlFor={name} className={labelClass}>
                    {label}
                </label>
                <input name={name} {...rest} ref={ref} />
            </>
        );
    },
);

export default InputField;
