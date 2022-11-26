import React, { forwardRef } from "react";

interface InputFieldProps extends React.ComponentProps<"input"> {
    label: string;
    name: string;
    labelClass: string;
}
type Ref = HTMLInputElement;

const InputField = React.forwardRef<Ref, InputFieldProps>(
    ({ name, labelClass, label, id, type = "text", ...rest }, ref) => {
        return (
            <>
                <label htmlFor={id ?? name} className={labelClass}>
                    {label}
                </label>
                <input
                    type={type}
                    name={name}
                    id={id ?? name}
                    {...rest}
                    ref={ref}
                />
            </>
        );
    },
);

export default InputField;
