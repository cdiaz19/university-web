import { SearchInput } from "../../types";

const Search = ({ value, onChange, placeholder = 'Search...' } : SearchInput) =>  {
  return (
    <div className="mb-4 max-w-prose">
      <input
        type="text"
        placeholder={placeholder}
        className="p-2 border border-gray-300 rounded w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default Search
