import React, { useState } from "react";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/16/solid";

interface ChatHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedFilter: string;
  onFilterSelect: (filter: string) => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ searchQuery, onSearchChange, selectedFilter, onFilterSelect }) => {
  const [isFilterOpen, setFilterOpen] = useState(false);

  const filters = ["all", "open", "in-progress", "completed", "overdue"];

  return (
    <div className="chat-header">
      <h1 className="chat-title">Lista de Tareas</h1>
      <div className="chat-actions">
        <div className="search-bar">
          <MagnifyingGlassIcon className="search-icon" />
          <input
            type="text"
            placeholder="Buscar tareas..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-container">
          <button className="filter-button" onClick={() => setFilterOpen(!isFilterOpen)}>
            <FunnelIcon className="filter-icon" />
          </button>
          {isFilterOpen && (
            <div className="filter-menu">
              {filters.map((filter) => (
                <button key={filter} onClick={() => onFilterSelect(filter)}>
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
