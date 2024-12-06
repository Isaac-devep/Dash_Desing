import React from 'react';
import { Home, BarChart2, Users, Settings, HelpCircle } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4">
      <div className="flex items-center mb-8">
        <BarChart2 className="h-8 w-8 text-blue-400" />
        <span className="text-xl font-bold ml-2">Analytics Pro</span>
      </div>
      
      <nav>
        <SidebarLink icon={<Home />} text="Dashboard" active />
        <SidebarLink icon={<BarChart2 />} text="Statistics" />
        <SidebarLink icon={<Users />} text="Users" />
        <SidebarLink icon={<Settings />} text="Settings" />
        <SidebarLink icon={<HelpCircle />} text="Help" />
      </nav>
    </div>
  );
};

interface SidebarLinkProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ icon, text, active = false }) => {
  return (
    <a
      href="#"
      className={`flex items-center p-3 mb-2 rounded-lg transition-colors ${
        active ? 'bg-blue-600' : 'hover:bg-gray-800'
      }`}
    >
      {React.cloneElement(icon as React.ReactElement, { className: 'h-5 w-5 mr-3' })}
      {text}
    </a>
  );
};

export default Sidebar;