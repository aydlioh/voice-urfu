import { Input as InputNextUI, InputProps } from '@nextui-org/react';
import { FaSearch } from "react-icons/fa";

export const SearchInput = (props: InputProps) => {
  return (
    <InputNextUI
      {...props}
      size="lg"
      startContent={
        <button type="submit">
          <FaSearch size={20} className="text-secondary" />
        </button>
      }
      autoComplete='off'
      classNames={{
        input: "data-[has-start-content=true]:ps-4 bg-primary text-secondary placeholder:text-secondary group-data-[has-value=true]:text-secondary",
        innerWrapper: "bg-primary py-1",
        inputWrapper: "rounded-md bg-primary data-[hover=true]:bg-primary group-data-[focus=true]:bg-primary",
      }}
      type="search"
    />
  );
};
