import { useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import './CheckList.scss';

interface CheckItem {
  id: string;
  label: string;
  checked: boolean;
}

interface CheckListProps {
  items: CheckItem[];
  onItemToggle?: (id: string, checked: boolean) => void;
  onEditItem?: (id: string) => void;
  onDeleteItem?: (id: string) => void;
}

const CheckList: React.FC<CheckListProps> = ({ items, onItemToggle, onEditItem, onDeleteItem }) => {
  const [localItems, setLocalItems] = useState<CheckItem[]>(items);

  const handleToggle = (id: string) => {
    const updatedItems = localItems.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setLocalItems(updatedItems);
    if (onItemToggle) {
      const toggledItem = updatedItems.find((item) => item.id === id);
      if (toggledItem) onItemToggle(id, toggledItem.checked);
    }
  };

  return (
    <ul className="checklist">
      {localItems.map((item) => (
        <li key={item.id} className={`checklist__item ${item.checked ? 'checked' : ''}`}>
          <div className="checklist__content">
            <input
              type="checkbox"
              id={item.id}
              className="checklist__checkbox"
              checked={item.checked}
              onChange={() => handleToggle(item.id)}
            />
            <label htmlFor={item.id}>{item.label}</label>
          </div>
          <div className="checklist__actions">
            <button
              className="checklist__edit"
              onClick={() => onEditItem && onEditItem(item.id)}
              aria-label="Edit item"
            >
              <PencilIcon className="icon" />
            </button>
            <button
              className="checklist__delete"
              onClick={() => onDeleteItem && onDeleteItem(item.id)}
              aria-label="Delete item"
            >
              <TrashIcon className="icon" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CheckList;
