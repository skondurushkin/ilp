import { DebouncedInput } from '../../components/DebouncedInput';
import { ReactComponent as SearchSVG } from '../../assets/search.svg';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
}

export const SearchInput = (props: SearchInputProps) => {
    const { value, onChange } = props;

    return (
        <div className="relative inline-flex text-left">
            <DebouncedInput
                className="input form-input w-full pl-12"
                placeholder="Поиск"
                value={value}
                onChange={(value) => onChange(value.toString())}
            />
            <SearchSVG className="stroke-gray absolute bottom-3 left-3" />
        </div>
    );
};
