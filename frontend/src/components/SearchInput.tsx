import { DebouncedInput } from './DebouncedInput';
import { ReactComponent as SearchSVG } from '../assets/search.svg';
import { ReactComponent as XSquareVG } from '../assets/x-square.svg';
import { twMerge } from 'tailwind-merge';

interface SearchInputProps {
    value: string;
    placeholder?: string;
    onChange: (value: string) => void;
}

export const SearchInput = (props: SearchInputProps) => {
    const { value, placeholder, onChange } = props;

    return (
        <div className="relative text-left">
            <DebouncedInput
                className="input form-input w-full pl-12"
                placeholder={placeholder}
                value={value}
                onChange={(value) => onChange(value.toString())}
            />
            <SearchSVG className="stroke-gray absolute bottom-3 left-3" />
            <button
                className={twMerge(
                    'absolute  bottom-3 right-3 z-10 opacity-0 transition-opacity duration-200 ease-in',
                    !!value && 'opacity-100',
                )}
                onClick={() => onChange('')}
            >
                <XSquareVG className="fill-gray h-6 w-6" />
            </button>
        </div>
    );
};
