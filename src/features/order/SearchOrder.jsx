import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchOrder = () => {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="rounded-full
       px-4 py-2
       text-sm
       placeholder:text-stone-400
       bg-yellow-100 sm:w-64 sm:focus:w-72 transition-all duration-300
       focus:outline-none focus:ring-yellow-500 sm:w-64"
        placeholder="Search order"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
};

export default SearchOrder;
