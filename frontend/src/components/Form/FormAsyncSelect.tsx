import { Control, FieldPath, FieldValues, RegisterOptions, useController } from 'react-hook-form';

import AsyncSelect from 'react-select/async';
import { ComponentProps } from 'react';
import { FormErrorMessage } from './FormErrorMessage';
import { twMerge } from 'tailwind-merge';

export interface FormAsyncSelectOption {
    label: string;
    value: string;
}

interface FormAsyncSelectProps<TFieldValues extends FieldValues> {
    name: FieldPath<TFieldValues>;
    rules?: RegisterOptions;
    label?: string;
    className?: string;
    labelClassName?: string;
    control: Control<TFieldValues>;
    loadOptions: ComponentProps<AsyncSelect>['loadOptions'];
}

export const FormAsyncSelect = <TFieldValues extends FieldValues = FieldValues>(
    props: FormAsyncSelectProps<TFieldValues>,
) => {
    const { control, name, rules, label, labelClassName, loadOptions } = props;

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
            <AsyncSelect
                {...field}
                name={name}
                cacheOptions
                defaultOptions
                maxMenuHeight={130}
                placeholder="Введите название"
                noOptionsMessage={() => 'Нет результатов, уточните запрос'}
                loadingMessage={() => 'Загрузка ...'}
                styles={{
                    menu: (base) => ({
                        ...base,
                        borderRadius: 0,
                    }),
                    control: (base, state) => ({
                        ...base,
                        borderRadius: 0,
                        height: 50,
                        border: state.isFocused ? '2px solid #029C08' : '2px solid #95979A',
                        boxShadow: 'none',
                        '&:hover': {
                            border: '2px solid #029C08',
                        },
                    }),
                }}
                loadOptions={loadOptions}
            />
            <FormErrorMessage error={fieldState.error} />
        </div>
    );
};
