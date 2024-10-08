"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const SearchForm = () => {
  const router = useRouter();
  const param = useSearchParams();
  const query = param.get("q") ?? "";
  const filter = param.get("f") ?? "";

  const [searchTerm, setSearchTerm] = React.useState(query);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (searchTerm?.trim()) {
      const baseUrl = `/search?q=${encodeURIComponent(searchTerm)}`;
      const url = filter ? `${baseUrl}&f=user` : baseUrl;
      router.push(url);
    }
  };
  return (
    <div className="w-full">
      <form
        className="w-full flex-1"
        action="#"
        role="search"
        onSubmit={handleSubmit}
      >
        <div
          className="relative flex flex-row
               items-center h-11 bg-[#eee]
               dark:bg-gray-800 rounded-full"
        >
          <div
            className="shrink-0 w-8 flex 
                  items-center !justify-end
                  text-muted-foreground
                  "
          >
            <SearchIcon size="20px" />
          </div>
          <div className="flex-1">
            <Input
              className="rounded-full
                     w-full h-full border-0 
                     !outline-none !ring-0
                          "
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
