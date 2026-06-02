import { useRef, useEffect } from "react";
import { useUIStore } from "../../../../store/ui/useUIStore";
import "./db-searcher.css";

export default function DbSearcher() {
  const inputRef = useRef<HTMLInputElement>(null);

  const { setSearchQuery, searchQuery } = useUIStore();

  // Shortcut ⌘K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="db-search">
      <svg
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
      </svg>
      <input
        ref={inputRef}
        id="dashSearch"
        placeholder="Buscar leads, folios, unidades..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <kbd>⌘K</kbd>
    </div>
  );
}
