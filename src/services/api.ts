import { Tree, Alert, CameraDevice, FarmerProfile, DiseasePrediction, DiseaseHistoryRecord } from '../types';

export const api = {
  async getTrees(): Promise<Tree[]> {
    const res = await fetch('/api/trees');
    const data = await res.json();
    return data.trees || [];
  },

  async addTree(tree: Tree): Promise<Tree> {
    const res = await fetch('/api/trees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tree)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to add tree');
    return data.tree;
  },

  async updateTree(id: string, updates: Partial<Tree>): Promise<Tree> {
    const res = await fetch(`/api/trees/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update tree');
    return data.tree;
  },

  async deleteTree(id: string): Promise<void> {
    const res = await fetch(`/api/trees/${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to delete tree');
  },

  async getAlerts(): Promise<Alert[]> {
    const res = await fetch('/api/alerts');
    const data = await res.json();
    return data.alerts || [];
  },

  async resolveAlert(id: string): Promise<Alert> {
    const res = await fetch(`/api/alerts/${encodeURIComponent(id)}/resolve`, {
      method: 'PATCH'
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to resolve alert');
    return data.alert;
  },

  async dispatchTestAlert(params: { treeId: string; channel: 'sms' | 'email' | 'whatsapp' | 'all'; customMessage?: string }): Promise<Alert> {
    const res = await fetch('/api/alerts/dispatch-test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to dispatch alert');
    return data.alert;
  },

  async getHistory(): Promise<DiseaseHistoryRecord[]> {
    const res = await fetch('/api/history');
    const data = await res.json();
    return data.history || [];
  },

  async addHistoryEntry(entry: Partial<DiseaseHistoryRecord>): Promise<DiseaseHistoryRecord> {
    const res = await fetch('/api/history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to add history entry');
    return data.entry;
  },

  async getCameraTelemetry(): Promise<CameraDevice> {
    const res = await fetch('/api/camera/telemetry');
    const data = await res.json();
    return data.camera;
  },

  async controlCamera(payload: Partial<CameraDevice> & { panAngle?: number; action?: 'start' | 'stop' | 'pause' | 'resume' }): Promise<CameraDevice> {
    const res = await fetch('/api/camera/control', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    return data.camera;
  },

  async getAnalytics(): Promise<any> {
    const res = await fetch('/api/analytics');
    const data = await res.json();
    return data;
  },

  async getFarmerProfile(): Promise<FarmerProfile> {
    const res = await fetch('/api/farmer/profile');
    const data = await res.json();
    return data.profile;
  },

  async updateFarmerProfile(profile: Partial<FarmerProfile>): Promise<FarmerProfile> {
    const res = await fetch('/api/farmer/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile)
    });
    const data = await res.json();
    return data.profile;
  },

  async analyzeImage(params: { imageBase64?: string; imageUrl?: string; treeId?: string; benchmarkId?: string }): Promise<DiseasePrediction> {
    const res = await fetch('/api/analyze-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Failed to analyze image');
    }
    return data.prediction;
  }
};
