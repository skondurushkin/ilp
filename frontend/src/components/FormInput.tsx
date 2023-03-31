import { Control, FieldPath, FieldValues, RegisterOptions, useController } from 'react-hook-form';

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
        <div className="flex flex-col gap-1">
            <label htmlFor={name} className="text-small text-black dark:text-white">
                {label}
                {rules?.required && <span>&nbsp;*</span>}
            </label>
            <input
                {...field}
                {...rest}
                name={name}
                className={twMerge('input', fieldState.invalid && 'input-error', className)}
            />
            <div
                className={twMerge(
                    'h-3 opacity-0 transition-opacity duration-300 ease-in',
                    !!fieldState.error && 'opacity-100',
                )}
            >
                {!!fieldState.error && <p className="text-small text-error ">{fieldState.error.message}</p>}
            </div>
        </div>
    );
};
