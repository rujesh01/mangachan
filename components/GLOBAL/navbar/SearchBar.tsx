"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    // Trigger your search logic here (e.g., router.push or API call)
    console.log("Searching for:", query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className="flex items-center w-full max-w-md rounded-lg border border-input bg-background focus-within:ring-2 focus-within:ring-ring"
    >
      <Input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        aria-label="Search"
        className="w-full border-none focus:outline-none focus-visible:ring-0"
      />
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:text-primary"
        aria-label="Submit search"
      >
        <Search className="h-5 w-5" />
      </Button>
    </form>
  );
};

export default SearchBar;
