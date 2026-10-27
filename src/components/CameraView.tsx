import React, { useState, useEffect } from 'react';
import { CameraDevice, Tree } from '../types';
import { translations } from '../translations';
import { api } from '../services/api';
import {
  Camera,
  Play,
  Square,
  Pause,
  RotateCw,
  Gauge,
  Sliders,
  Radio,
  Cpu,
  Sun,
  BatteryCharging,
  Wifi,
  ScanEye,
  CheckCircle,
  AlertCircle,
  Clock,
  Compass,
  ArrowRight,
  Maximize2
} from 'lucide-react';

interface CameraViewProps {
  camera: CameraDevice;
  trees: Tree[];
  language: 'en' | 'ta';
  onUpdateCamera: (camera: CameraDevice) => void;
  onSendToAiDetector: (image: string, treeId: string) => void;
}

export const CameraView: React.FC<CameraViewProps> = ({
  camera,
  trees,
  language,
  onUpdateCamera,
  onSendToAiDetector,
}) => {
  const t = translations[language];

  const [panAngleInput, setPanAngleInput] = useState<number>(camera.currentPanAngle);
  const [rotationSpeed, setRotationSpeed] = useState<number>(camera.rotationSpeed);
  const [scanInterval, setScanInterval] = useState<number>(camera.scanIntervalSec);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [mqttBrokerInput, setMqttBrokerInput] = useState<string>(camera.mqttBroker || '');
  const [snapshotFlash, setSnapshotFlash] = useState<boolean>(false);

  // Sync state if camera changes from polling
  useEffect(() => {
    setPanAngleInput(camera.currentPanAngle);
  }, [camera.currentPanAngle]);

  const handleAction = async (action: 'start' | 'stop' | 'pause' | 'resume') => {
    try {
      setIsUpdating(true);
      const updated = await api.controlCamera({ action });
      onUpdateCamera(updated);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleApplySettings = async () => {
    try {
      setIsUpdating(true);
      const updated = await api.controlCamera({
        panAngle: panAngleInput,
        rotationSpeed,
        scanIntervalSec: scanInterval,
        mqttBroker: mqttBrokerInput
      });
      onUpdateCamera(updated);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleToggleMode = async (newMode: 'DEMO' | 'LIVE_HARDWARE') => {
    try {
      setIsUpdating(true);
      const updated = await api.controlCamera({ mode: newMode });
      onUpdateCamera(updated);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  // Find target tree
  const targetTree = trees.find((t) => t.id === camera.currentTargetTreeId) || trees[0];
  const latestImage = targetTree?.imageUrl || 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop&q=80';

  const handleManualCapture = () => {
    setSnapshotFlash(true);
    setTimeout(() => setSnapshotFlash(false), 300);
  };

  return (
    <div className="space-y-6">
      {/* Hardware Mode Banner */}
      <div
        className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
          camera.mode === 'DEMO'
            ? 'bg-amber-950/30 border-amber-800/60 text-amber-200'
            : 'bg-emerald-950/40 border-emerald-700/60 text-emerald-200'
        }`}
      >
        <div className="flex items-start gap-3">
          <Cpu className="w-6 h-6 shrink-0 mt-0.5" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm uppercase tracking-wide">
                {camera.mode === 'DEMO' ? 'Demonstration Hardware Mode' : 'Live Physical IoT Mast Gateway Mode'}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 border border-current">
                {camera.mode}
              </span>
            </div>
            <p className="text-xs opacity-90 mt-1 max-w-2xl">
              {camera.mode === 'DEMO'
                ? 'Telemetry and 360° pan rotations are simulated in software using benchmark orchard dataset. Live ESP32/Pi hardware is not required.'
                : 'Connected to physical orchard mast controller via MQTT/HTTPS endpoint. Real motor step angles and sensor telemetry streaming.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center shrink-0">
          <button
            onClick={() => handleToggleMode('DEMO')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              camera.mode === 'DEMO'
                ? 'bg-amber-600 text-slate-950 border-amber-500 font-bold shadow-sm'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            Switch to Demo Mode
          </button>
          <button
            onClick={() => handleToggleMode('LIVE_HARDWARE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              camera.mode === 'LIVE_HARDWARE'
                ? 'bg-emerald-600 text-white border-emerald-500 font-bold shadow-sm'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            Switch to Live Hardware
          </button>
        </div>
      </div>

      {/* Main Console Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 360 Pan Visualizer & Live Camera Frame (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Live Camera Viewfinder Card */}
          <div className="relative rounded-2xl bg-black border border-slate-800 overflow-hidden shadow-2xl">
            {/* Viewfinder Header Bar */}
            <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between p-3 bg-gradient-to-b from-black/80 via-black/40 to-transparent text-white font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className={`flex h-2.5 w-2.5 rounded-full ${camera.status === 'scanning' ? 'bg-red-500 animate-ping' : 'bg-amber-400'}`}></span>
                <span className="font-bold text-white uppercase tracking-wider">
                  {camera.mode === 'DEMO' ? 'SIMULATED OPTICAL FEED' : 'LIVE RTSP/MJPEG FEED'}
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-emerald-400">
                <span>ANGLE: {camera.currentPanAngle}°</span>
                <span>TARGET: {camera.currentTargetTreeId}</span>
              </div>
            </div>

            {/* Viewfinder Image */}
            <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center overflow-hidden">
              <img
                src={latestImage}
                alt="Camera feed"
                className={`w-full h-full object-cover transition-transform duration-700 ${snapshotFlash ? 'brightness-150' : 'brightness-100'}`}
              />

              {/* Reticle / Optical Focus Grids */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                {/* Crosshairs */}
                <div className="w-16 h-16 border-2 border-emerald-400/60 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                </div>
                <div className="absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 border-emerald-400/70"></div>
                <div className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-emerald-400/70"></div>
                <div className="absolute bottom-8 left-8 w-6 h-6 border-b-2 border-l-2 border-emerald-400/70"></div>
                <div className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-emerald-400/70"></div>
              </div>

              {/* Bottom HUD Information Overlay */}
              <div className="absolute bottom-0 inset-x-0 z-20 p-3 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center justify-between text-xs text-slate-300 font-mono">
                <div>
                  <span className="text-white font-bold">{targetTree?.variety || 'Coconut Palm'}</span>
                  <span className="text-slate-400 ml-2">({targetTree?.block || 'Block A'})</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleManualCapture}
                    className="px-2 py-1 bg-slate-800/80 hover:bg-slate-700 rounded text-slate-200 text-[11px] border border-slate-600 flex items-center gap-1 cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Snapshot</span>
                  </button>
                  <button
                    onClick={() => onSendToAiDetector(latestImage, camera.currentTargetTreeId)}
                    className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 rounded text-white text-[11px] font-bold border border-emerald-400 flex items-center gap-1 cursor-pointer shadow-md"
                  >
                    <ScanEye className="w-3.5 h-3.5" />
                    <span>Send to AI Detector</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Compass & 360° Circular Pan Mechanism Visualizer */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  360° Stepper Azimuth Position & Orchard Orientation
                </h3>
              </div>
              <span className="font-mono text-xs font-bold text-emerald-400">
                {camera.currentPanAngle}° / 360°
              </span>
            </div>

            {/* Circular Azimuth Diagram */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
              <div className="relative w-44 h-44 rounded-full border-4 border-slate-800 bg-slate-950 flex items-center justify-center shadow-inner">
                {/* 12 Cardinal Ticks */}
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                  <div
                    key={deg}
                    className="absolute w-full h-full flex justify-center"
                    style={{ transform: `rotate(${deg}deg)` }}
                  >
                    <div className={`w-0.5 ${deg % 90 === 0 ? 'h-3 bg-emerald-400 font-bold' : 'h-1.5 bg-slate-700'}`}></div>
                  </div>
                ))}

                {/* Cardinal Labels */}
                <span className="absolute top-2 text-[10px] font-mono font-bold text-slate-400">N</span>
                <span className="absolute right-2 text-[10px] font-mono font-bold text-slate-400">E</span>
                <span className="absolute bottom-2 text-[10px] font-mono font-bold text-slate-400">S</span>
                <span className="absolute left-2 text-[10px] font-mono font-bold text-slate-400">W</span>

                {/* Rotating Needle / Field of view wedge */}
                <div
                  className="absolute w-full h-full flex items-center justify-center pointer-events-none transition-transform duration-300"
                  style={{ transform: `rotate(${camera.currentPanAngle}deg)` }}
                >
                  {/* FOV Cone */}
                  <div
                    className="absolute top-3 w-16 h-20 bg-emerald-500/20 border-x border-emerald-400/40 rounded-t-full origin-bottom"
                    style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }}
                  />
                  <div className="w-1.5 h-16 bg-gradient-to-t from-emerald-500 to-emerald-300 rounded-full shadow-lg shadow-emerald-500/50 mb-14" />
                </div>

                <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-emerald-400 z-10 flex items-center justify-center text-xs">
                  🌴
                </div>
              </div>

              {/* Tree Azimuth Mapping List */}
              <div className="space-y-2 text-xs flex-1 max-w-sm">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Registered Palms within View Sector:
                </div>
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {trees.slice(0, 5).map((t, idx) => {
                    const treeAngle = Math.round((idx / trees.length) * 360);
                    const isTarget = t.id === camera.currentTargetTreeId;

                    return (
                      <div
                        key={t.id}
                        onClick={() => {
                          setPanAngleInput(treeAngle);
                          api.controlCamera({ panAngle: treeAngle }).then(onUpdateCamera);
                        }}
                        className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors border ${
                          isTarget
                            ? 'bg-emerald-950/80 border-emerald-600/70 text-emerald-200'
                            : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${t.currentRisk === 'HIGH' ? 'bg-red-500' : 'bg-emerald-500'}`}></span>
                          <span className="font-mono font-bold">{t.id}</span>
                          <span className="text-[11px] text-slate-400 truncate max-w-[120px]">{t.variety}</span>
                        </div>
                        <span className="font-mono text-[11px] text-slate-400">{treeAngle}° Azimuth</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Hardware Command & Telemetry Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Main Action Command Buttons */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-400" />
              <span>Gimbal Scan Sequencer</span>
            </h3>

            {/* Scan Sequence Buttons */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                disabled={camera.status === 'scanning' || isUpdating}
                onClick={() => handleAction('start')}
                className="py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-emerald-950"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{t.startScan}</span>
              </button>

              <button
                disabled={camera.status !== 'scanning' || isUpdating}
                onClick={() => handleAction('pause')}
                className="py-3 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-amber-950"
              >
                <Pause className="w-4 h-4 fill-slate-950" />
                <span>{t.pauseScan}</span>
              </button>

              <button
                disabled={camera.status !== 'paused' || isUpdating}
                onClick={() => handleAction('resume')}
                className="py-3 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <RotateCw className="w-4 h-4" />
                <span>{t.resumeScan}</span>
              </button>

              <button
                disabled={camera.status === 'offline' || camera.status === 'online' || isUpdating}
                onClick={() => handleAction('stop')}
                className="py-3 px-3 rounded-xl bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Square className="w-4 h-4 fill-white" />
                <span>{t.stopScan}</span>
              </button>
            </div>

            {/* Sliders for Pan Angle and Rotation Speed */}
            <div className="space-y-4 pt-2 border-t border-slate-800">
              {/* Pan Angle Slider */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                  <span className="text-slate-300">Set Pan Angle Manually</span>
                  <span className="font-mono font-bold text-emerald-400">{panAngleInput}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="359"
                  value={panAngleInput}
                  onChange={(e) => setPanAngleInput(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
              </div>

              {/* Rotation Speed Slider */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                  <span className="text-slate-300">{t.rotationSpeed}</span>
                  <span className="font-mono font-bold text-emerald-400">{rotationSpeed}° / sec</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={rotationSpeed}
                  onChange={(e) => setRotationSpeed(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
              </div>

              {/* Capture Interval */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                  <span className="text-slate-300">{t.captureInterval}</span>
                  <span className="font-mono font-bold text-emerald-400">Every {scanInterval} sec</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[3, 5, 8, 15].map((sec) => (
                    <button
                      key={sec}
                      onClick={() => setScanInterval(sec)}
                      className={`py-1.5 text-xs font-mono rounded-lg border transition-colors cursor-pointer ${
                        scanInterval === sec
                          ? 'bg-emerald-600 text-white border-emerald-500 font-bold'
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                      }`}
                    >
                      {sec}s
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleApplySettings}
                disabled={isUpdating}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-colors cursor-pointer"
              >
                Apply Parameters to Gimbal Motor
              </button>
            </div>
          </div>

          {/* IoT Controller Telemetry Card */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-emerald-400" />
                <span>Mast IoT Telemetry</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                ESP32-S3
              </span>
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Battery Level</span>
                <span className="text-sm font-bold text-amber-400 flex items-center gap-1.5 mt-0.5">
                  <BatteryCharging className="w-4 h-4" />
                  {camera.batteryPercentage}%
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Solar Array</span>
                <span className="text-sm font-bold text-emerald-400 flex items-center gap-1.5 mt-0.5">
                  <Sun className="w-4 h-4" />
                  {camera.solarVoltage} V (Active)
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Wi-Fi Signal</span>
                <span className="text-sm font-bold text-sky-400 flex items-center gap-1.5 mt-0.5">
                  <Wifi className="w-4 h-4" />
                  {camera.wifiRssi} dBm
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Total Scans Today</span>
                <span className="text-sm font-bold text-white mt-0.5 block">
                  {camera.totalScansToday} palms
                </span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono space-y-1 text-slate-400">
              <div className="flex justify-between">
                <span>Last Heartbeat:</span>
                <span className="text-slate-200">{new Date(camera.lastHeartbeat).toLocaleTimeString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Firmware:</span>
                <span className="text-slate-200">{camera.firmwareVersion}</span>
              </div>
              <div className="flex justify-between truncate">
                <span>MQTT Endpoint:</span>
                <span className="text-emerald-400 truncate max-w-[150px]">{camera.mqttBroker || 'None'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
