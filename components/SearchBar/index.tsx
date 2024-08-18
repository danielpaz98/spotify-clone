"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
// PLUGINS
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
// UTILS
import { cn } from "@/utils";
// COMPONENTS
import { Input } from "@/components/ui";
// ICONS
import SearchIcon from "@/icons/search.svg";
import XMarkIcon from "@/icons/xmark.svg";

interface Props extends Omit<React.ComponentPropsWithRef<typeof Input>, "onChange"> {
  searchIcon?: React.ReactNode;
  clearIcon?: React.ReactNode;
  inputClassName?: string;
  delay?: number;
  onChange?: (value: string) => void;
}

const iconContainerClassNames =
  "flex items-center justify-between absolute right-3 left-3 top-0 bottom-0 pointer-events-none";

const iconClassNames = "flex-shrink-0 fill-white/70 group-hover:fill-white group-focus-within:fill-white";

const SearchBar = forwardRef<React.ElementRef<typeof Input>, Props>(
  ({ className, inputClassName, searchIcon, clearIcon, delay = 500, onChange, ...restProps }, ref) => {
    const classNames = cn("group relative w-full max-w-[364px]", className);

    const inputClassNames = /* tw */ cn(
      "bg-shark rounded-full h-12 py-[6px] px-9 text-ellipsis",
      "hover:bg-nero hover:shadow-[0_0_0_1px_hsla(0,0%,100%,.2)]",
      "focus:shadow-[0_0_0_2px_#fff] focus:text-white",
      "placeholder:relative placeholder:top-[1px] placeholder:text-[rgb(117,117,117)]",
      inputClassName,
    );

    const searchParams = useSearchParams();
    const title = searchParams.get("title") ?? "";
    const [searchValue, setSearchValue] = useState(title);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter();

    const handleOnSearch = (search: string) => {
      const query = { ...(search && { title: search }) };

      const url = qs.stringifyUrl({ url: "/search", query });
      router.push(url);
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);

      if (debounceRef.current !== null) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(() => {
        if (onChange) return onChange?.(e.target.value);

        handleOnSearch(e.target.value);
      }, delay);
    };

    const handleOnClear = () => {
      setSearchValue("");

      if (onChange) return onChange?.("");

      handleOnSearch("");
    };

    useEffect(() => setSearchValue(title), [title]);

    return (
      <form autoComplete="off" className={classNames} role="search" onSubmit={(e) => e.preventDefault()}>
        <Input
          ref={ref || inputRef}
          {...restProps}
          className={inputClassNames}
          type="text"
          value={searchValue}
          onChange={handleOnChange}
        />

        <div className={iconContainerClassNames}>
          <button
            className="pointer-events-auto cursor-default"
            type="button"
            onClick={() => inputRef?.current?.focus()}
          >
            {searchIcon ? searchIcon : <SearchIcon className={cn(iconClassNames, "h-[17.5px] w-[17.5px]")} />}
          </button>

          {searchValue !== "" && (
            <button className="pointer-events-auto cursor-default" type="button" onClick={handleOnClear}>
              {clearIcon ? clearIcon : <XMarkIcon className={cn(iconClassNames, "h-4 w-4")} />}
            </button>
          )}
        </div>
      </form>
    );
  },
);

SearchBar.displayName = "SearchBar";

export default SearchBar;
