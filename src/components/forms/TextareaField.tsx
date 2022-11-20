import { forwardRef } from "react";

interface TextareaProps extends React.ComponentProps<"textarea"> {
    label: string;
    name: string;
    labelClass: string;
}
type Ref = HTMLTextAreaElement;

const TextareaField = forwardRef<Ref, TextareaProps>(
    ({ name, id, label, labelClass, children, ...rest }, ref) => {
        return (
            <>
                <label htmlFor={name} className={labelClass}>
                    {label}
                </label>
                <textarea name={name} ref={ref} {...rest}>
                    {children}
                </textarea>
            </>
        );
    },
);

export default TextareaField;
