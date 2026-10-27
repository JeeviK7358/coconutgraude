import React, { useState } from 'react';
import { FarmerProfile, CameraDevice } from '../types';
import { translations } from '../translations';
import { api } from '../services/api';
import {
  Settings,
  User,
  MapPin,
  Phone,
  Mail,
  Bell,
  Sliders,
  Save,
  CheckCircle2,
  Globe2,
  Cpu
} from 'lucide-react';

interface SettingsViewProps {
  farmer: FarmerProfile;
  camera: CameraDevice;
  language: 'en' | 'ta';
  onFarmerUpdated: (profile: FarmerProfile) => void;
  onCameraUpdated: (camera: CameraDevice) => void;
  onLanguageChange: (lang: 'en' | 'ta') => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  farmer,
  camera,
  language,
  onFarmerUpdated,
  onCameraUpdated,
  onLanguageChange,
}) => {
  const t = translations[language];

  const [name, setName] = useState<string>(farmer.name);
  const [farmName, setFarmName] = useState<string>(farmer.farmName);
  const [location, setLocation] = useState<string>(farmer.location);
  const [phone, setPhone] = useState<string>(farmer.phone);
  const [email, setEmail] = useState<string>(farmer.email);

  // Thresholds
  const [smsHighRiskOnly, setSmsHighRiskOnly] = useState<boolean>(farmer.alertThresholds.smsHighRiskOnly);
  const [whatsappEnabled, setWhatsappEnabled] = useState<boolean>(farmer.alertThresholds.whatsappEnabled);
  const [emailDigestDaily, setEmailDigestDaily] = useState<boolean>(farmer.alertThresholds.emailDigestDaily);
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(farmer.alertThresholds.confidenceThreshold);
  const [visualSeverityThreshold, setVisualSeverityThreshold] = useState<number>(farmer.alertThresholds.visualSeverityThreshold);

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const updatedProfile = await api.updateFarmerProfile({
        name,
        farmName,
        location,
        phone,
        email,
        language,
        alertThresholds: {
          smsHighRiskOnly,
          whatsappEnabled,
          emailDigestDaily,
          confidenceThreshold,
          visualSeverityThreshold,
        },
      });

      onFarmerUpdated(updatedProfile);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-600/30 text-emerald-400 border border-emerald-500/40">
              <Settings className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">{t.navSettings}</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Farmer credentials, notification delivery limits, and bilingual preference settings.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Farmer & Plantation Info Card */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
            <User className="w-4 h-4 text-emerald-400" />
            <span>Grower & Plantation Details</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Farmer Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Plantation / Farm Name</label>
              <input
                type="text"
                required
                value={farmName}
                onChange={(e) => setFarmName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-300 font-medium mb-1">Orchard Geographic Location</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">SMS & WhatsApp Mobile (+Country code)</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Email for Daily PDF Reports</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none"
              />
            </div>
          </div>
        </div>

        {/* Alert Notification Thresholds Card */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
            <Bell className="w-4 h-4 text-emerald-400" />
            <span>Early Warning Thresholds & Notification Channels</span>
          </h3>

          <div className="space-y-3 text-xs">
            {/* Toggles */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <span className="font-semibold text-white block">SMS High-Risk Only</span>
                <span className="text-[11px] text-slate-400">
                  Sends urgent SMS alerts to {phone} only for confirmed High-Risk bud rot or weevil attacks.
                </span>
              </div>
              <input
                type="checkbox"
                checked={smsHighRiskOnly}
                onChange={(e) => setSmsHighRiskOnly(e.target.checked)}
                className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <span className="font-semibold text-white block">WhatsApp Business Alerts</span>
                <span className="text-[11px] text-slate-400">
                  Transmits image snapshots and map coordinates directly via Meta WhatsApp API.
                </span>
              </div>
              <input
                type="checkbox"
                checked={whatsappEnabled}
                onChange={(e) => setWhatsappEnabled(e.target.checked)}
                className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <span className="font-semibold text-white block">Daily Morning Health Digest</span>
                <span className="text-[11px] text-slate-400">
                  Sends an 07:00 AM email summarizing all scans and abnormal canopy flags.
                </span>
              </div>
              <input
                type="checkbox"
                checked={emailDigestDaily}
                onChange={(e) => setEmailDigestDaily(e.target.checked)}
                className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
              />
            </div>

            {/* Threshold Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex justify-between font-semibold mb-1">
                  <span className="text-slate-300">Minimum AI Match Confidence:</span>
                  <span className="text-emerald-400 font-mono">{confidenceThreshold}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="95"
                  value={confidenceThreshold}
                  onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
                  className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
                <span className="text-[10px] text-slate-500 block mt-1">
                  Filters out low-confidence optical false positives.
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex justify-between font-semibold mb-1">
                  <span className="text-slate-300">Minimum Visual Severity:</span>
                  <span className="text-amber-400 font-mono">{visualSeverityThreshold}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="60"
                  value={visualSeverityThreshold}
                  onChange={(e) => setVisualSeverityThreshold(Number(e.target.value))}
                  className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
                <span className="text-[10px] text-slate-500 block mt-1">
                  Alert triggers when estimated tissue damage exceeds this level.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bilingual Preference Card */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
            <Globe2 className="w-4 h-4 text-emerald-400" />
            <span>Language Preference / மொழித் தேர்வு</span>
          </h3>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`flex-1 py-3 px-4 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-950'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              English (Universal)
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('ta')}
              className={`flex-1 py-3 px-4 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                language === 'ta'
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-950'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              தமிழ் (தமிழ்நாடு & புதுச்சேரி)
            </button>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-end gap-3">
          {saveSuccess && (
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Preferences saved successfully!</span>
            </span>
          )}
          <button
            type="submit"
            disabled={isSaving}
            className="py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-950 transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save All Preferences'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
