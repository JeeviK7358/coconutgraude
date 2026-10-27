import React, { useState } from 'react';
import { CameraDevice } from '../types';
import { translations } from '../translations';
import { api } from '../services/api';
import {
  Server,
  Radio,
  Cpu,
  Wifi,
  Sun,
  BatteryCharging,
  Zap,
  Activity,
  Save,
  CheckCircle2,
  Terminal,
  Shield,
  RotateCw
} from 'lucide-react';

interface IotDeviceViewProps {
  camera: CameraDevice;
  language: 'en' | 'ta';
  onCameraUpdated: (camera: CameraDevice) => void;
}

export const IotDeviceView: React.FC<IotDeviceViewProps> = ({
  camera,
  language,
  onCameraUpdated,
}) => {
  const t = translations[language];

  const [brokerUrl, setBrokerUrl] = useState<string>(camera.mqttBroker || 'mqtts://iot.coconuthub.ag:8883/pollachi-orchard-1/cam');
  const [telemetryTopic, setTelemetryTopic] = useState<string>('farm/pollachi/mast1/telemetry');
  const [commandTopic, setCommandTopic] = useState<string>('farm/pollachi/mast1/cmd');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleSaveMqtt = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const updated = await api.controlCamera({
        mqttBroker: brokerUrl
      });
      onCameraUpdated(updated);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-600/30 text-emerald-400 border border-emerald-500/40">
              <Server className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">{t.navIotDevice}</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Edge gateway controller configuration, MQTT broker endpoints, and electrical power bus monitoring.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase flex items-center gap-1.5 border ${
            camera.status === 'scanning' || camera.status === 'online'
              ? 'bg-emerald-950 text-emerald-400 border-emerald-700'
              : 'bg-amber-950 text-amber-400 border-amber-700'
          }`}>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Gateway {camera.status}</span>
          </span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Hardware Architecture Spec Card (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>Edge Hardware Architecture Spec</span>
            </h3>

            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Microcontroller:</span>
                <span className="text-white font-bold">ESP32-S3 Dual-Core Xtensa LX7 (240MHz)</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Camera Sensor:</span>
                <span className="text-white font-bold">OV5640 5MP Optical Module with autofocus</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Pan Rotation Motor:</span>
                <span className="text-white font-bold">NEMA-17 High-Torque Stepper (1.8° step)</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Motor Driver:</span>
                <span className="text-white font-bold">TMC2209 SilentStepStick (1/16 microstepping)</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Power Supply:</span>
                <span className="text-emerald-400 font-bold">50W Monocrystalline Solar + 12V 24Ah LiFePO4</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Enclosure Protection:</span>
                <span className="text-white font-bold">IP66 Weatherproof Agricultural Mast Casing</span>
              </div>
            </div>
          </div>

          {/* Electrical & Power Status */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Solar & Battery Bus Telemetry</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Battery Voltage</span>
                <span className="text-base font-bold text-emerald-400 mt-1 block">13.2 V</span>
                <span className="text-[10px] text-slate-500">State of Charge: {camera.batteryPercentage}%</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Solar Array Inflow</span>
                <span className="text-base font-bold text-amber-400 mt-1 block">{camera.solarVoltage} V</span>
                <span className="text-[10px] text-slate-500">Charging: Active (MPPT)</span>
              </div>
            </div>
          </div>
        </div>

        {/* MQTT Broker Configuration (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>MQTT Broker & Telemetry Gateway Configuration</span>
            </h3>

            <form onSubmit={handleSaveMqtt} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Secure MQTT Broker URI (TLS):
                </label>
                <input
                  type="text"
                  required
                  value={brokerUrl}
                  onChange={(e) => setBrokerUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-emerald-300 font-mono outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Device Telemetry Topic (Publish):
                </label>
                <input
                  type="text"
                  required
                  value={telemetryTopic}
                  onChange={(e) => setTelemetryTopic(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Stepper Rotation Command Topic (Subscribe):
                </label>
                <input
                  type="text"
                  required
                  value={commandTopic}
                  onChange={(e) => setCommandTopic(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono outline-none"
                />
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400 font-mono space-y-1">
                <div className="flex justify-between">
                  <span>MQTT Client ID:</span>
                  <span className="text-slate-200">ESP32_MAST_POL_001</span>
                </div>
                <div className="flex justify-between">
                  <span>QoS Level:</span>
                  <span className="text-slate-200">QoS 1 (At least once)</span>
                </div>
                <div className="flex justify-between">
                  <span>Keep-Alive:</span>
                  <span className="text-slate-200">60 seconds</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-950 transition-colors cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Updating Gateway...' : 'Save MQTT Parameters'}</span>
              </button>

              {savedSuccess && (
                <div className="p-2.5 rounded-lg bg-emerald-950 border border-emerald-800 text-center text-emerald-300 text-xs font-semibold">
                  MQTT Broker configuration persisted successfully!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
