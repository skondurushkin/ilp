import { Control, FieldPath, FieldValues, RegisterOptions, useController } from 'react-hook-form';

import { FormErrorMessage } from './FormErrorMessage';
import { TextareaHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface FormTextAreaProps<TFieldValues extends FieldValues>
    extends Partial<TextareaHTMLAttributes<HTMLTextAreaElement>> {
    name: FieldPath<TFieldValues>;
    rules?: RegisterOptions;
    label?: string;
    className?: string;
    control: Control<TFieldValues>;
}

export const FormTextArea = <TFieldValues extends FieldValues = FieldValues>(
    props: FormTextAreaProps<TFieldValues>,
) => {
    const { control, name, rules, label, className, ...rest } = props;

    const { field, fieldState } = useController({
        name,
        control,
        rules,
    });

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={name} className="text-base text-black dark:text-white">
                {label}
                {rules?.required && <span>&nbsp;*</span>}
            </label>
            <textarea
                {...field}
                {...rest}
                name={name}
                className={twMerge('textarea form-textarea', fieldState.invalid && 'input-error', className)}
            />
            <FormErrorMessage error={fieldState.error} />
        </div>
    );
};
