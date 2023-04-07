import { InputHTMLAttributes, useEffect, useState } from 'react';

import useDebounce from 'react-use/lib/useDebounce';

interface DebouncedInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    value: string | number;
    onChange: (value: string | number) => void;
    debounceTimeMs?: number;
}

export const DebouncedInput = (props: DebouncedInputProps) => {
    const { value: initialValue, onChange, debounceTimeMs = 500, ...rest } = props;

    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    useDebounce(
        () => {
            onChange(value);
        },
        debounceTimeMs,
        [value],
    );

    return <input {...rest} value={value} onChange={(e) => setValue(e.target.value)} />;
};
