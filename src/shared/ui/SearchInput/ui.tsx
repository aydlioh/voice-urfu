import { FaSearch } from "react-icons/fa";
import { Input, InputProps } from "../Input";

export const SearchInput = (props: InputProps) => {
  return (
    <Input
      {...props}
      size="lg"
      startContent={
        <button type="submit">
          <FaSearch size={20} className="text-secondary" />
        </button>
      }
      autoComplete="off"
      variant='flat'
      type="search"
    />
  );
};
