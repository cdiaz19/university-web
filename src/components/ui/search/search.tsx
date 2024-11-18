export interface SearchProps extends Omit<React.HTMLProps<HTMLInputElement>, 'onChange'> {
  onChange: (value: string) => void;
}

const Search = ({ onChange, ...rest } : SearchProps) =>  {
  return (
    <div className="mb-4 max-w-prose">
      <input
        type="text"
        className="p-2 border border-gray-300 rounded w-full"
        onChange={(e) => onChange(e.target.value)}
        { ...rest }
      />
    </div>
  );
}

export default Search
