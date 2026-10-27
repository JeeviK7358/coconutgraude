import React from 'react';
import { translations } from '../translations';
import {
  LayoutDashboard,
  Camera,
  MapPin,
  ScanEye,
  Trees,
  BellRing,
  History,
  BarChart3,
  BookOpenCheck,
  Server,
  Settings
} from 'lucide-react';

export type TabId =
  | 'dashboard'
  | 'camera'
  | 'map'
  | 'ai-detect'
  | 'trees'
  | 'alerts'
  | 'history'
  | 'analytics'
  | 'treatment'
  | 'iot'
  | 'settings';

interface NavigationProps {
  currentTab: TabId;
  onTabChange: (tab: TabId) => void;
  language: 'en' | 'ta';
  unreadAlertCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onTabChange,
  language,
  unreadAlertCount
}) => {
  const t = translations[language];

  const tabs: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }>; badge?: number }[] = [
    { id: 'dashboard', label: t.navDashboard, icon: LayoutDashboard },
    { id: 'camera', label: t.navCamera, icon: Camera },
    { id: 'map', label: t.navMap, icon: MapPin },
    { id: 'ai-detect', label: t.navAiDetection, icon: ScanEye },
    { id: 'trees', label: t.navTreeManagement, icon: Trees },
    { id: 'alerts', label: t.navAlerts, icon: BellRing, badge: unreadAlertCount },
    { id: 'history', label: t.navDiseaseHistory, icon: History },
    { id: 'analytics', label: t.navAnalytics, icon: BarChart3 },
    { id: 'treatment', label: t.navTreatmentGuide, icon: BookOpenCheck },
    { id: 'iot', label: t.navIotDevice, icon: Server },
    { id: 'settings', label: t.navSettings, icon: Settings },
  ];

  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-4 lg:px-8 overflow-x-auto scrollbar-none">
      <div className="max-w-7xl mx-auto flex items-center gap-1 py-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
              {typeof tab.badge === 'number' && tab.badge > 0 && (
                <span
                  className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-white text-emerald-800' : 'bg-red-500 text-white'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
