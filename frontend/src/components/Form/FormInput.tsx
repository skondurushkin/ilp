import { Control, FieldPath, FieldValues, RegisterOptions, useController } from 'react-hook-form';

import { FormErrorMessage } from './FormErrorMessage';
import { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface FormInputProps<TFieldValues extends FieldValues> extends Partial<InputHTMLAttributes<HTMLInputElement>> {
    name: FieldPath<TFieldValues>;
    rules?: RegisterOptions;
    label?: string;
    className?: string;
    control: Control<TFieldValues>;
}

export const FormInput = <TFieldValues extends FieldValues = FieldValues>(props: FormInputProps<TFieldValues>) => {
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
            <input
                {...field}
                {...rest}
                name={name}
                className={twMerge('input form-input', fieldState.invalid && 'input-error', className)}
            />
            <FormErrorMessage error={fieldState.error} />
        </div>
    );
};
