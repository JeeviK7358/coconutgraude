import React, { useState, useEffect } from 'react';
import { Tree, CameraDevice, Alert, FarmerProfile, DiseasePrediction, DiseaseHistoryRecord } from './types';
import { api } from './services/api';
import { INITIAL_CAMERA_DEVICE, INITIAL_FARMER_PROFILE, INITIAL_TREES, INITIAL_ALERTS, INITIAL_DISEASE_HISTORY } from './services/sampleData';
import { Header } from './components/Header';
import { Navigation, TabId } from './components/Navigation';
import { DashboardView } from './components/DashboardView';
import { CameraView } from './components/CameraView';
import { MapView } from './components/MapView';
import { AiDetectionView } from './components/AiDetectionView';
import { TreeManagementView } from './components/TreeManagementView';
import { AlertsView } from './components/AlertsView';
import { DiseaseHistoryView } from './components/DiseaseHistoryView';
import { AnalyticsView } from './components/AnalyticsView';
import { TreatmentGuideView } from './components/TreatmentGuideView';
import { IotDeviceView } from './components/IotDeviceView';
import { SettingsView } from './components/SettingsView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabId>('dashboard');
  const [language, setLanguage] = useState<'en' | 'ta'>('en');

  // Application Data State
  const [trees, setTrees] = useState<Tree[]>(INITIAL_TREES);
  const [camera, setCamera] = useState<CameraDevice>(INITIAL_CAMERA_DEVICE);
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);
  const [farmer, setFarmer] = useState<FarmerProfile>(INITIAL_FARMER_PROFILE);
  const [diseaseHistory, setDiseaseHistory] = useState<DiseaseHistoryRecord[]>(INITIAL_DISEASE_HISTORY);

  // Cross-view selection state
  const [selectedTreeId, setSelectedTreeId] = useState<string>('COC-024');
  const [aiDiagnosticImage, setAiDiagnosticImage] = useState<string | undefined>(undefined);
  const [aiDiagnosticTreeId, setAiDiagnosticTreeId] = useState<string | undefined>(undefined);

  // Load initial backend data
  const loadData = async () => {
    try {
      const [treesData, alertsData, cameraData, farmerData, historyData] = await Promise.allSettled([
        api.getTrees(),
        api.getAlerts(),
        api.getCameraTelemetry(),
        api.getFarmerProfile(),
        api.getHistory(),
      ]);

      if (treesData.status === 'fulfilled' && treesData.value.length > 0) {
        setTrees(treesData.value);
      }
      if (alertsData.status === 'fulfilled' && alertsData.value.length > 0) {
        setAlerts(alertsData.value);
      }
      if (cameraData.status === 'fulfilled' && cameraData.value) {
        setCamera(cameraData.value);
      }
      if (farmerData.status === 'fulfilled' && farmerData.value) {
        setFarmer(farmerData.value);
        if (farmerData.value.language) setLanguage(farmerData.value.language);
      }
      if (historyData.status === 'fulfilled' && historyData.value.length > 0) {
        setDiseaseHistory(historyData.value);
      }
    } catch (err) {
      console.warn('Initial data load warning:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Polling camera telemetry to update pan angle & status smoothly
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const cam = await api.getCameraTelemetry();
        if (cam) setCamera(cam);
      } catch (e) {
        // quiet ignore in background
      }
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Handlers
  const handleSelectTreeForMap = (treeId: string) => {
    setSelectedTreeId(treeId);
    setCurrentTab('map');
  };

  const handleSelectTreeForAi = (treeId: string) => {
    const tree = trees.find((t) => t.id === treeId);
    setAiDiagnosticTreeId(treeId);
    if (tree?.imageUrl) setAiDiagnosticImage(tree.imageUrl);
    setCurrentTab('ai-detect');
  };

  const handleSendFrameToAi = (image: string, treeId: string) => {
    setAiDiagnosticImage(image);
    setAiDiagnosticTreeId(treeId);
    setCurrentTab('ai-detect');
  };

  const handlePredictionComplete = (prediction: DiseasePrediction) => {
    // Update local tree status
    setTrees((prev) =>
      prev.map((t) => {
        if (t.id === prediction.treeId) {
          return {
            ...t,
            latestCondition: prediction.category,
            latestConfidence: prediction.modelConfidence,
            latestSeverity: prediction.visualSeverity,
            currentRisk: prediction.riskLevel,
            lastInspectedAt: prediction.timestamp,
            healthStatus: prediction.riskLevel === 'HIGH' ? 'suspected' : t.healthStatus,
          };
        }
        return t;
      })
    );

    // Refresh alerts in background
    api.getAlerts().then((data) => {
      if (data && data.length > 0) setAlerts(data);
    });
  };

  const unreadAlertCount = alerts.filter((a) => !a.isResolved).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Application Header */}
      <Header
        camera={camera}
        farmer={farmer}
        alerts={alerts}
        language={language}
        onLanguageChange={(newLang) => {
          setLanguage(newLang);
          api.updateFarmerProfile({ language: newLang });
        }}
        onOpenAlerts={() => setCurrentTab('alerts')}
        onOpenProfile={() => setCurrentTab('settings')}
      />

      {/* Navigation Tab Bar */}
      <Navigation
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        language={language}
        unreadAlertCount={unreadAlertCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8">
        {currentTab === 'dashboard' && (
          <DashboardView
            trees={trees}
            camera={camera}
            alerts={alerts}
            farmer={farmer}
            language={language}
            onNavigate={setCurrentTab}
            onSelectTree={handleSelectTreeForMap}
          />
        )}

        {currentTab === 'camera' && (
          <CameraView
            camera={camera}
            trees={trees}
            language={language}
            onUpdateCamera={setCamera}
            onSendToAiDetector={handleSendFrameToAi}
          />
        )}

        {currentTab === 'map' && (
          <MapView
            trees={trees}
            language={language}
            selectedTreeId={selectedTreeId}
            onSelectTree={setSelectedTreeId}
            onNavigateToAi={handleSelectTreeForAi}
          />
        )}

        {currentTab === 'ai-detect' && (
          <AiDetectionView
            trees={trees}
            language={language}
            initialImage={aiDiagnosticImage}
            initialTreeId={aiDiagnosticTreeId}
            onPredictionComplete={handlePredictionComplete}
            onNavigateToMap={handleSelectTreeForMap}
          />
        )}

        {currentTab === 'trees' && (
          <TreeManagementView
            trees={trees}
            language={language}
            onTreesUpdated={() => api.getTrees().then(setTrees)}
            onNavigateToMap={handleSelectTreeForMap}
            onNavigateToAi={handleSelectTreeForAi}
          />
        )}

        {currentTab === 'alerts' && (
          <AlertsView
            alerts={alerts}
            trees={trees}
            farmer={farmer}
            language={language}
            onAlertsUpdated={() => api.getAlerts().then(setAlerts)}
            onNavigateToMap={handleSelectTreeForMap}
          />
        )}

        {currentTab === 'history' && (
          <DiseaseHistoryView
            history={diseaseHistory}
            trees={trees}
            language={language}
            onHistoryUpdated={() => api.getHistory().then(setDiseaseHistory)}
            onNavigateToMap={handleSelectTreeForMap}
            onNavigateToAi={handleSelectTreeForAi}
          />
        )}

        {currentTab === 'analytics' && (
          <AnalyticsView
            trees={trees}
            alerts={alerts}
            language={language}
          />
        )}

        {currentTab === 'treatment' && (
          <TreatmentGuideView language={language} />
        )}

        {currentTab === 'iot' && (
          <IotDeviceView
            camera={camera}
            language={language}
            onCameraUpdated={setCamera}
          />
        )}

        {currentTab === 'settings' && (
          <SettingsView
            farmer={farmer}
            camera={camera}
            language={language}
            onFarmerUpdated={setFarmer}
            onCameraUpdated={setCamera}
            onLanguageChange={setLanguage}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900/90 border-t border-slate-800/80 px-4 py-4 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            SMART COCONUT HEALTH AI • Precision Agriculture & Pathology Vision System
          </span>
          <span>
            Adhering to ICAR-CPCRI & TNAU Diagnostic Protocols
          </span>
        </div>
      </footer>
    </div>
  );
}
