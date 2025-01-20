import { SidebarHeaderProps } from "@features/sidebar";
import './SidebarHeader.scss';

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ task }) => (
  <header>
    <h2 className="sidebar-header">
      Ticket # <span>{task.id}</span>
    </h2>
    <h3 className="sidebar-title">{task.title}</h3>
  </header>
);

export default SidebarHeader;