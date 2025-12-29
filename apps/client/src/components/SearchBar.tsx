import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="hidden items-center gap-2 rounded-md px-2 py-1 shadow-md ring-1 ring-gray-200 md:flex">
      <Search className="size-4 text-gray-500" />

      <input
        type="text"
        placeholder="Search..."
        id="search"
        className="text-sm outline-0"
      />
    </div>
  );
};

export { SearchBar };
