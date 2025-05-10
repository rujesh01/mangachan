"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useDebounce } from "@/hooks/useDebounce";
import { Search } from "lucide-react";

interface Manga {
  id: string;
  attributes: {
    title: {
      [key: string]: string;
    };
  };
}

const fetchManga = async (query: string): Promise<Manga[]> => {
  const res = await fetch(
    `https://api.mangadex.org/manga?limit=5&title=${encodeURIComponent(query)}`
  );
  if (!res.ok) throw new Error("Failed to fetch manga");
  const data = await res.json();
  return data.data || [];
};

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: results = [], isFetching } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: () => fetchManga(debouncedQuery),
    enabled: !!debouncedQuery.trim(),
    staleTime: 1000 * 60, // cache for 1 minute
  });

  useEffect(() => {
    setShowResults(!!debouncedQuery.trim());
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (id: string) => {
    setShowResults(false);
    setQuery("");
    router.push(`/manga/${id}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results[0]) handleSelect(results[0].id);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex items-center rounded-xl border border-input bg-background px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-ring"
      >
        <Input
          type="search"
          placeholder="Search manga..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border-none focus-visible:ring-0 bg-transparent"
        />
        <Button type="submit" variant="ghost" size="icon">
          <Search className="h-5 w-5 text-muted-foreground" />
        </Button>
      </form>

      {showResults && (
        <Card className="absolute mt-2 w-full z-50 shadow-lg border border-border bg-popover">
          <CardContent className="p-2 space-y-1">
            {isFetching ? (
              <p className="text-muted-foreground text-sm px-3 py-1">Searching...</p>
            ) : results.length > 0 ? (
              results.map((manga) => (
                <div
                  key={manga.id}
                  onClick={() => handleSelect(manga.id)}
                  className="cursor-pointer rounded-md px-3 py-2 hover:bg-accent"
                >
                  {manga.attributes.title.en ??
                    Object.values(manga.attributes.title)[0]}
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm px-3 py-1">No results found.</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchBar;
