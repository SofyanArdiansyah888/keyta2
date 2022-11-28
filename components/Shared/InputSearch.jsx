import Image from "next/image";
import { useState } from "react";
export default function InputSearch({
  placeholder = "Search",
  name,
  setIsSearch,
  setSearch,
}) {
  return (
    <>
      <div className="relative bg-gray-100 p-1 rounded-xl">
        <div className="absolute top-3 left-2">
          <Image src="/icons/search.svg" height="18" width="18" alt="Logo" />
        </div>

        <input
          type="text"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          className={`p-2 pl-8  text-xs w-full  bg-transparent`}
          placeholder={placeholder}
        />

        <div
          className="absolute top-3 right-2"
          onClick={() => {
            setSearch("");
            setIsSearch(false);
          }}
        >
          <Image
            src="/icons/icon_close.svg"
            height="18"
            width="18"
            alt="Logo"
          />
        </div>
      </div>
    </>
  );
}
