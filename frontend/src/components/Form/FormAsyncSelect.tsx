import { Control, FieldPath, FieldValues, RegisterOptions, useController } from 'react-hook-form';

import AsyncSelect from 'react-select/async';
import { ComponentProps } from 'react';
import { FormErrorMessage } from './FormErrorMessage';
import { colors } from '../../../colors';
import { twMerge } from 'tailwind-merge';
import { useTheme } from '../../theme';

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
    const theme = useTheme();
    const isDarkTheme = theme === 'dark';

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
                className="bg-white text-black dark:bg-black dark:text-white"
                styles={{
                    singleValue: (base) => ({
                        ...base,
                        color: isDarkTheme ? colors.white : colors.black,
                        borderRadius: 0,
                    }),
                    input: (base) => ({
                        ...base,
                        color: isDarkTheme ? colors.white : colors.black,
                        borderRadius: 0,
                    }),
                    menu: (base) => ({
                        ...base,
                        color: isDarkTheme ? colors.white : colors.black,
                        background: isDarkTheme ? colors.black : colors.white,
                        borderRadius: 0,
                        border: `2px solid ${colors.gray}`,
                    }),
                    option: (base, state) => ({
                        ...base,
                        color: isDarkTheme ? colors.white : colors.black,
                        background: state.isFocused
                            ? isDarkTheme
                                ? colors['gray-dark']
                                : colors.primary
                            : isDarkTheme
                            ? colors.black
                            : colors.white,
                        '&:hover': {
                            background: state.isFocused
                                ? isDarkTheme
                                    ? colors['gray-dark']
                                    : colors.primary
                                : isDarkTheme
                                ? colors.black
                                : colors.white,
                        },
                    }),
                    control: (base, state) => ({
                        ...base,
                        background: isDarkTheme ? colors.black : colors.white,
                        height: 50,
                        borderRadius: 0,
                        border: fieldState.invalid
                            ? `2px solid ${colors.error}`
                            : state.isFocused
                            ? `2px solid ${colors.success}`
                            : `2px solid ${colors.gray}`,
                        boxShadow: 'none',
                        '&:hover': {
                            border: `2px solid ${colors.success}`,
                        },
                    }),
                }}
                loadOptions={loadOptions}
            />
            <FormErrorMessage error={fieldState.error} />
        </div>
    );
};
