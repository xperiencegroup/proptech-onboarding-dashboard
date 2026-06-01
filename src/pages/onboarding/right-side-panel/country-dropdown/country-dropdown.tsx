import { useState, useRef, useEffect } from "react";
import { countries } from "country-data-list";
import { CircleFlag } from "react-circle-flags";
import { useOnboardingStore } from "../../../../store/formulario/useOnboardingStore";
import "../../../../styles/tokens.css";

export default function CountryComponent() {
  const [open, setOpen] = useState(false);
  const dialCode = useOnboardingStore((state) => state.dialCode);
  const setField = useOnboardingStore((state) => state.setField);
  const [countryCode, setCountryCode] = useState("mx");
  const [search, setSearch] = useState("");
  const [highlighted, setHighlighted] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = countries.all.filter((c) => {
    if (!c.countryCallingCodes?.[0]) return false;
    return (
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.countryCallingCodes[0].includes(search)
    );
  });

  const selectCountry = (country: (typeof countries.all)[0]) => {
    const dialCode = country.countryCallingCodes?.[0];
    if (!dialCode) return;
    setField("dialCode", dialCode);
    setCountryCode(country.alpha2.toLowerCase());
    setOpen(false);
    setSearch("");
    setHighlighted(0);
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Focus search when opens
  useEffect(() => {
    if (open && searchRef.current) {
      setTimeout(() => searchRef.current?.focus(), 60);
    }
  }, [open]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[highlighted]) selectCountry(filtered[highlighted]);
    } else if (e.key === "Escape") {
      setOpen(false);
      setSearch("");
    }
  };

  // Scroll highlighted into view
  useEffect(() => {
    if (listRef.current) {
      const item = listRef.current.children[highlighted] as HTMLElement;
      item?.scrollIntoView({ block: "nearest" });
    }
  }, [highlighted]);

  return (
    <div
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
      className="relative inline-flex"
    >
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={[
          "relative flex justify-center items-center w-fit gap-[clamp(6px,0.42vw,8px)] overflow-hidden whitespace-nowrap cursor-pointer bg-white px-[clamp(12px,0.83vw,16px)] py-[clamp(8px,0.52vw,10px)] rounded-[clamp(8px,0.52vw,10px)] border-[clamp(1px,0.08vw,1.5px)] transition-all duration-200 text-stone-800/80 text-[clamp(11px,0.68vw,13px)] font-medium tracking-wide touch-action-manipulation",
          open
            ? "border-aluna-green-dark"
            : "border-[#2a2a2a] hover:border-yellow-xg active:border-yellow-xg",
        ].join(" ")}
      >
        <CircleFlag
          className="size-[clamp(16px,1.04vw,20px)]"
          countryCode={countryCode}
        />

        <span className="text-yellow-xg font-medium">{dialCode}</span>

        {/* Chevron */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={[
            "w-[clamp(12px,0.73vw,14px)] h-[clamp(12px,0.73vw,14px)] shrink-0 transition-all duration-200",
            open ? "text-yellow-xg" : "rotate-180 text-[#666]",
          ].join(" ")}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          role="listbox"
          className="absolute bottom-full left-0 -translate-y-[clamp(5px,0.52vw,10px)] z-9999 w-[clamp(82.88px,14.58vw,280px)] overflow-hidden origin-bottom-left bg-[#111] border-[clamp(0.44px,0.08vw,1.5px)] border-[#2a2a2a] rounded-[clamp(4.14px,0.73vw,14px)]"
        >
          {/* Search */}
          <div className="relative flex items-center px-[clamp(3.55px,0.62vw,12px)] pt-[clamp(1px,0.62vw,12px)] pb-[clamp(2.37px,0.42vw,8px)] border-b border-[#1e1e1e]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute left-[clamp(6.51px,1.15vw,22px)] w-[clamp(4.14px,0.73vw,14px)] h-[clamp(4.14px,0.73vw,14px)] text-[#555] pointer-events-none"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              ref={searchRef}
              type="text"
              placeholder="Buscar país o código..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setHighlighted(0);
              }}
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white text-[clamp(3.55px,0.62vw,12px)] pl-[clamp(10.07px,1.77vw,34px)] pr-[clamp(2.96px,0.52vw,10px)] py-[clamp(2.37px,0.42vw,8px)] outline-none placeholder-[#444] transition-colors duration-200 focus:border-yellow-xg"
            />
          </div>

          {/* List */}
          <div
            ref={listRef}
            role="group"
            className="max-h-[clamp(65.14px,11.46vw,220px)] overflow-y-auto py-[clamp(1.78px,0.31vw,6px)]
    [scrollbar-width:thin] [scrollbar-color:#2a2a2a_transparent]
    [&::-webkit-scrollbar]:w-1
    [&::-webkit-scrollbar-thumb]:bg-[#2a2a2a]
    [&::-webkit-scrollbar-thumb]:rounded-sm
    [&::-webkit-scrollbar-track]:bg-transparent"
          >
            {filtered.length === 0 ? (
              <p className="py-[clamp(5.92px,1.04vw,20px)] px-[clamp(4.14px,0.73vw,14px)] text-center text-[#444] text-[clamp(3.55px,0.62vw,12px)]">
                Sin resultados
              </p>
            ) : (
              filtered.map((country, i) => {
                const dialCode = country.countryCallingCodes[0];
                const isActive = i === highlighted;
                return (
                  <button
                    key={country.alpha2 + i}
                    type="button"
                    role="option"
                    onClick={() => selectCountry(country)}
                    onMouseEnter={() => setHighlighted(i)}
                    className={[
                      "flex items-center gap-[clamp(2.96px,0.52vw,10px)] w-full px-[clamp(4.14px,0.73vw,14px)] py-[clamp(2.37px,0.42vw,8px)]",
                      "text-[clamp(3.55px,0.62vw,12px)] text-left cursor-pointer border-none",
                      "transition-colors duration-100",
                      isActive
                        ? "bg-yellow-xg/10 text-white"
                        : "bg-transparent text-[#ccc] hover:bg-yellow-xg/[0.07] hover:text-white",
                    ].join(" ")}
                  >
                    <CircleFlag
                      className="size-[clamp(5.92px,1.04vw,20px)]"
                      countryCode={country.alpha2.toLowerCase()}
                    />
                    <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                      {country.name}
                    </span>
                    <span className="flex-shrink-0 text-yellow-xg text-[clamp(3.26px,0.57vw,11px)] font-medium opacity-85">
                      {dialCode}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
