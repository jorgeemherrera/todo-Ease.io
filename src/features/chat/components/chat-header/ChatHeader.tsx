import { useState, useRef, useEffect } from "react";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { ChatHeaderProps } from "@features/chat/types";
import "./ChatHeader.scss";

const ChatHeader: React.FC<ChatHeaderProps> = ({ searchQuery, setSearchQuery, setSelectedFilter }) => {
  const [isFilterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const toggleFilterMenu = () => setFilterOpen((prev) => !prev);
  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    setFilterOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
      setFilterOpen(false);
    }
  };

  return (
    <header className="chat-header">
      <h1 className="chat-title">Lista de Tareas</h1>
      <div className="chat-actions">
        <div className="search-bar">
          <MagnifyingGlassIcon className="search-icon" />
          <input
            type="text"
            placeholder="Buscar tareas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-container" ref={filterRef}>
          <button className="filter-button" onClick={toggleFilterMenu}>
            <FunnelIcon className="filter-icon" />
          </button>
          {isFilterOpen && (
            <div className="filter-menu">
              {[
                { label: "Todas", value: "all" },
                { label: "Abiertas", value: "open" },
                { label: "En progreso", value: "in-progress" },
                { label: "Completadas", value: "completed" },
                { label: "Vencidas", value: "overdue" },
              ].map(({ label, value }) => (
                <button key={value} onClick={() => handleFilterSelect(value)}>
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
