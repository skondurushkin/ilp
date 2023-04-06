import { Control, FieldPath, FieldValues, RegisterOptions, useController } from 'react-hook-form';

import { FormErrorMessage } from './FormErrorMessage';
import { SelectHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface FormSelectOption {
    label: string;
    value: string;
}

interface FormSelectProps<TFieldValues extends FieldValues> extends Partial<SelectHTMLAttributes<HTMLSelectElement>> {
    name: FieldPath<TFieldValues>;
    rules?: RegisterOptions;
    label?: string;
    className?: string;
    labelClassName?: string;
    control: Control<TFieldValues>;
    options: FormSelectOption[];
}

export const FormSelect = <TFieldValues extends FieldValues = FieldValues>(props: FormSelectProps<TFieldValues>) => {
    const { control, name, rules, label, className, labelClassName, options, ...rest } = props;

    const { field, fieldState } = useController({
        name,
        control,
        rules,
    });

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={name} className={twMerge('text-base text-black dark:text-white', labelClassName)}>
                {label}
                {rules?.required && <span>&nbsp;*</span>}
            </label>
            <select
                {...field}
                {...rest}
                name={name}
                className={twMerge('select form-select', fieldState.invalid && 'input-error', className)}
            >
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <FormErrorMessage error={fieldState.error} />
        </div>
    );
};
