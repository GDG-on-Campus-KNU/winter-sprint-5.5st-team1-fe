import { createContext, useContext, useState } from "react";
import { useQueryState } from "nuqs";


interface TabContextValue {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabContext = createContext<TabContextValue | null>(null);

function useTabContext() {
  const ctx = useContext(TabContext);
  if (!ctx) throw new Error("Tab 컴포넌트는 Tab.Root 안에서 사용해야 합니다");
  return ctx;
}


interface RootProps {
  queryKey?: string;
  defaultActiveTab: string;
  children: React.ReactNode;
}

function Root({ queryKey, defaultActiveTab, children }: RootProps) {
  const [urlTab, setUrlTab] = queryKey
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useQueryState(queryKey, { defaultValue: defaultActiveTab })
    : [null, null];

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [localTab, setLocalTab] = useState(defaultActiveTab);

  const activeTab = urlTab ?? localTab;
  const setActiveTab = (tab: string) => {
    if (setUrlTab) setUrlTab(tab);
    else setLocalTab(tab);
  };

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
}


interface NavBarProps {
  children: React.ReactNode;
  className?: string;
}

function NavBar({ children, className }: NavBarProps) {
  return (
    <nav className={`rounded-2xl bg-white shadow-sm overflow-hidden ${className ?? ""}`}>
      {children}
    </nav>
  );
}


interface NavItemProps {
  menu: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

function NavItem({ menu, children, icon, className }: NavItemProps) {
  const { activeTab, setActiveTab } = useTabContext();
  const isActive = activeTab === menu;

  return (
    <button
      onClick={() => setActiveTab(menu)}
      className={`flex w-full items-center gap-3 px-6 py-4 text-[15px] font-semibold transition-colors border-b border-gray-100 last:border-none ${
        isActive
          ? "bg-pink-500 text-white"
          : "text-gray-400 hover:bg-pink-200/30"
      } ${className ?? ""}`}
    >
      {icon}
      {children}
    </button>
  );
}


interface PanelProps {
  menu: string;
  children: React.ReactNode;
}

function Panel({ menu, children }: PanelProps) {
  const { activeTab } = useTabContext();
  if (activeTab !== menu) return null;
  return <>{children}</>;
}


export const Tab = {
  Root,
  NavBar,
  NavItem,
  Panel,
};