import { Button } from './Button';
import { ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ChipsProps<T extends ReadonlyArray<Option>> {
    className?: string;
    options: T;
    value: OptionValues<T>;
    onChange: (value: OptionValues<T>) => void;
}

interface Option {
    label: string;
    value: string;
}

type OptionValues<T extends ReadonlyArray<Option>> = T[number]['value'];

export function Chips<T extends ReadonlyArray<Option>>(props: ChipsProps<T>): ReactElement {
    const { className, options, value: filter, onChange: onChangeFilter } = props;
    return (
        <div className={twMerge('flex gap-2', className)}>
            {options.map((opt) => {
                const primary = filter === opt.value;
                return (
                    <Button
                        key={opt.value}
                        size="small"
                        black
                        textBlack={primary}
                        primary={primary}
                        onClick={() => {
                            if (filter === opt.value) {
                                return;
                            }
                            onChangeFilter(opt.value);
                        }}
                    >
                        {opt.label}
                    </Button>
                );
            })}
        </div>
    );
}
