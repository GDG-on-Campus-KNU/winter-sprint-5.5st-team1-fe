import { createContext, useContext } from "react";
import { useQueryState } from "nuqs";


interface TabContextValue {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabContext = createContext<TabContextValue | null>(null);

const useTabContext = () => {
  const ctx = useContext(TabContext);
  if (!ctx) throw new Error("Tab 컴포넌트는 TabRoot 안에서 사용해야 합니다");
  return ctx;
};


interface TabRootProps {
  queryKey: string;
  defaultActiveTab: string;
  children: React.ReactNode;
}

export function TabRoot({ queryKey, defaultActiveTab, children }: TabRootProps) {
  const [urlTab, setUrlTab] = useQueryState(queryKey, {
    defaultValue: defaultActiveTab,
  });

  return (
    <TabContext.Provider value={{ activeTab: urlTab ?? defaultActiveTab, setActiveTab: setUrlTab }}>
      {children}
    </TabContext.Provider>
  );
}


interface TabNavBarProps {
  children: React.ReactNode;
  className?: string;
}

export function TabNavBar({ children, className }: TabNavBarProps) {
  return (
    <nav className={`rounded-2xl bg-white shadow-sm overflow-hidden ${className ?? ""}`}>
      {children}
    </nav>
  );
}


interface TabNavItemProps {
  menu: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export function TabNavItem({ menu, children, icon, className }: TabNavItemProps) {
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


interface TabPanelProps {
  menu: string;
  children: React.ReactNode;
}

export function TabPanel({ menu, children }: TabPanelProps) {
  const { activeTab } = useTabContext();
  if (activeTab !== menu) return null;
  return <>{children}</>;
}