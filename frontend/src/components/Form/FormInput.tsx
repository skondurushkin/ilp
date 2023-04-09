import { Control, FieldPath, FieldValues, RegisterOptions, useController } from 'react-hook-form';

import { FormErrorMessage } from './FormErrorMessage';
import { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface FormInputProps<TInput extends string, TOutput, TFieldValues extends FieldValues>
    extends Partial<InputHTMLAttributes<HTMLInputElement>> {
    name: FieldPath<TFieldValues>;
    rules?: RegisterOptions;
    label?: string;
    className?: string;
    labelClassName?: string;
    control: Control<TFieldValues>;
    transform?: {
        input?: (value: TOutput) => TInput;
        output?: (value: React.ChangeEvent<HTMLInputElement>) => TOutput;
    };
}

export const FormInput = <TInput extends string, TOutput, TFieldValues extends FieldValues = FieldValues>(
    props: FormInputProps<TInput, TOutput, TFieldValues>,
) => {
    const { control, name, rules, label, className, labelClassName, transform, ...rest } = props;

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
            <input
                {...field}
                {...rest}
                name={name}
                className={twMerge('input form-input', fieldState.invalid && 'input-error', className)}
                onChange={(e) => (transform?.output ? field.onChange(transform.output(e)) : field.onChange(e))}
                value={transform?.input ? transform.input(field.value) : field.value}
            />
            <FormErrorMessage error={fieldState.error} />
        </div>
    );
};
