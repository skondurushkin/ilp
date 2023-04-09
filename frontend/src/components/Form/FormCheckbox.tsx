import { Control, FieldPath, FieldValues, RegisterOptions, useController } from 'react-hook-form';

import { FormErrorMessage } from './FormErrorMessage';
import { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface FormCheckboxProps<TFieldValues extends FieldValues>
    extends Partial<InputHTMLAttributes<Omit<HTMLInputElement, 'type'>>> {
    name: FieldPath<TFieldValues>;
    rules?: RegisterOptions;
    label?: string;
    className?: string;
    control: Control<TFieldValues>;
}

export const FormCheckbox = <TFieldValues extends FieldValues = FieldValues>(
    props: FormCheckboxProps<TFieldValues>,
) => {
    const { control, name, rules, label, className, ...rest } = props;

    const { field, fieldState } = useController({
        name,
        control,
        rules,
    });

    return (
        <div className="flex flex-col gap-4">
            <label className="inline-flex cursor-pointer items-center">
                <input
                    {...field}
                    {...rest}
                    type="checkbox"
                    name={name}
                    defaultChecked={field.value}
                    className={twMerge('checkbox form-checkbox cursor-pointer', className)}
                />
                <span className="ml-2 text-base text-black dark:text-white">
                    {label}
                    {rules?.required && <span>&nbsp;*</span>}
                </span>
            </label>
            <FormErrorMessage error={fieldState.error} />
        </div>
    );
};
