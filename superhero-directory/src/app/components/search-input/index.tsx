import { FC } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  dimBackground?: boolean;
}

const SearchInput: FC<SearchInputProps> = (props) => {
  const { value, onChange, placeholder, dimBackground } = props;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input
      name="query"
      key="search-input"
      type="text"
      value={value}
      onChange={handleInputChange}
      placeholder={placeholder}
      className={`w-full rounded border border-gray-300 p-2 ${
        dimBackground ? 'bg-gray-100' : 'bg-white'
      }`}
    />
  );
};

export default SearchInput;
