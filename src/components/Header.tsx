import React from 'react';
import { CameraDevice, FarmerProfile, Alert } from '../types';
import { translations } from '../translations';
import {
  Activity,
  Bell,
  Cpu,
  Globe2,
  Radio,
  Sun,
  BatteryCharging,
  ShieldAlert,
  UserCheck
} from 'lucide-react';

interface HeaderProps {
  camera: CameraDevice;
  farmer: FarmerProfile;
  alerts: Alert[];
  language: 'en' | 'ta';
  onLanguageChange: (lang: 'en' | 'ta') => void;
  onOpenAlerts: () => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  camera,
  farmer,
  alerts,
  language,
  onLanguageChange,
  onOpenAlerts,
  onOpenProfile
}) => {
  const t = translations[language];
  const unresolvedAlerts = alerts.filter((a) => !a.isResolved);
  const highRiskCount = unresolvedAlerts.filter((a) => a.riskLevel === 'HIGH').length;

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-emerald-900/40 px-4 lg:px-8 py-3 transition-colors shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Brand and Subtitle */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 border border-emerald-400/30 text-white shadow-emerald-900/30 shadow-md">
            <span className="text-2xl select-none">🌴</span>
            <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${camera.status === 'scanning' ? 'bg-emerald-400' : 'bg-amber-400'} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${camera.status === 'scanning' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg lg:text-xl font-bold tracking-tight text-white font-sans flex items-center gap-2">
                {t.appTitle}
                <span className="text-xs uppercase font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-700/50">
                  v2.4
                </span>
              </h1>
            </div>
            <p className="text-xs text-emerald-300/80 font-medium">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        {/* Status Indicators & Controls */}
        <div className="flex flex-wrap items-center gap-2 lg:gap-3">
          {/* Mode Badge (Explicit separation between Demo & Live) */}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border ${
              camera.mode === 'DEMO'
                ? 'bg-amber-950/70 border-amber-600/40 text-amber-300'
                : 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
            }`}
            title={camera.mode === 'DEMO' ? t.demoModeNotice : t.liveHardwareNotice}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span className="uppercase tracking-wider">{camera.mode === 'DEMO' ? 'Demo Mode' : 'Live Hardware'}</span>
          </div>

          {/* Hardware Quick Status */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-md text-xs bg-slate-800/80 border border-slate-700 text-slate-300 font-mono">
            <span className="flex items-center gap-1 text-emerald-400">
              <Radio className={`w-3.5 h-3.5 ${camera.status === 'scanning' ? 'animate-pulse' : ''}`} />
              <span className="capitalize">{camera.status}</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">{camera.currentPanAngle}°</span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1 text-amber-400" title="Solar & Battery">
              <Sun className="w-3 h-3 text-amber-300" />
              <span>{camera.batteryPercentage}%</span>
            </span>
          </div>

          {/* Bilingual Language Switcher */}
          <div className="flex items-center bg-slate-800 rounded-md p-0.5 border border-slate-700">
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-0.5 text-xs font-semibold rounded transition-colors ${
                language === 'en'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('ta')}
              className={`px-2 py-0.5 text-xs font-semibold rounded transition-colors ${
                language === 'ta'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              தமிழ்
            </button>
          </div>

          {/* Notifications Bell */}
          <button
            onClick={onOpenAlerts}
            className="relative p-2 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition-colors cursor-pointer"
            title={`${unresolvedAlerts.length} Active Alerts`}
          >
            <Bell className="w-4 h-4" />
            {highRiskCount > 0 ? (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow-sm animate-pulse">
                {highRiskCount}
              </span>
            ) : unresolvedAlerts.length > 0 ? (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-slate-950">
                {unresolvedAlerts.length}
              </span>
            ) : null}
          </button>

          {/* Farmer Profile Mini Button */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-md bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/40 text-xs text-emerald-200 transition-colors cursor-pointer"
          >
            <div className="w-6 h-6 rounded-full bg-emerald-700 flex items-center justify-center text-white text-[10px] font-bold">
              {farmer.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div className="text-left hidden lg:block">
              <p className="font-semibold leading-tight text-white">{farmer.name}</p>
              <p className="text-[10px] text-emerald-400/80 leading-none truncate max-w-[110px]">{farmer.farmName}</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
