export type DiseaseCategory =
  | 'healthy'
  | 'bud_rot'
  | 'leaf_rot'
  | 'stem_bleeding'
  | 'basal_stem_rot' // Thanjavur wilt / Ganoderma
  | 'root_wilt'
  | 'red_palm_weevil'
  | 'rhinoceros_beetle'
  | 'nutrient_deficiency' // Potassium / Boron deficiency
  | 'leaf_blight'
  | 'unknown_or_inconclusive';

export type RiskLevel = 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH';

export type ConditionType = 'disease' | 'pest_damage' | 'nutrient_deficiency' | 'healthy' | 'inconclusive';

export type InspectionStatus = 'healthy' | 'suspected' | 'confirmed' | 'under_treatment' | 'awaiting_inspection';

export interface Tree {
  id: string; // e.g., 'COC-001'
  farmId: string;
  farmName: string;
  block: string;
  variety: string; // e.g., 'West Coast Tall', 'East Coast Tall', 'Chowghat Orange Dwarf', 'D x T Hybrid'
  plantingDate?: string;
  ageYears: number;
  latitude: number;
  longitude: number;
  healthStatus: InspectionStatus;
  currentRisk: RiskLevel;
  latestCondition: DiseaseCategory;
  latestConfidence: number; // 0-100%
  latestSeverity: number; // 0-100%
  lastInspectedAt: string;
  imageUrl?: string;
  notes?: string;
  treatmentHistory?: string[];
}

export interface DiseasePrediction {
  id: string;
  treeId: string;
  timestamp: string;
  category: DiseaseCategory;
  conditionNameEn: string;
  conditionNameTa: string;
  conditionType: ConditionType;
  modelConfidence: number; // 0-100%
  visualSeverity: number; // 0-100%
  riskLevel: RiskLevel;
  symptomsDetected: string[];
  symptomsDetectedTa: string[];
  recommendedActionEn: string;
  recommendedActionTa: string;
  requiresExpertInspection: boolean;
  isConfirmed: boolean;
  imageQualityScore: number; // 0-100%
  qualityNotes?: string;
  imageUrl?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  modelVersion: string;
  isSimulated?: boolean;
}

export interface Alert {
  id: string;
  farmName: string;
  treeId: string;
  timestamp: string;
  diseaseCategory: DiseaseCategory;
  conditionNameEn: string;
  conditionNameTa: string;
  riskLevel: RiskLevel;
  modelConfidence: number;
  visualSeverity: number;
  latitude: number;
  longitude: number;
  imageUrl?: string;
  recommendedAction: string;
  isResolved: boolean;
  deliveryStatus: {
    inApp: 'sent' | 'read';
    sms: 'not_configured' | 'pending' | 'sent' | 'delivered' | 'failed';
    email: 'not_configured' | 'pending' | 'sent' | 'delivered' | 'failed';
    whatsapp: 'not_configured' | 'pending' | 'sent' | 'delivered' | 'failed';
  };
}

export interface CameraDevice {
  id: string;
  name: string;
  hardwareModel: string; // e.g., 'ESP32-CAM Pan-Tilt Pro' or 'Raspberry Pi 4 + 360 Stepper'
  mode: 'DEMO' | 'LIVE_HARDWARE';
  status: 'online' | 'offline' | 'scanning' | 'paused' | 'error';
  currentPanAngle: number; // 0 to 360
  currentTiltAngle: number; // -30 to 45
  rotationSpeed: number; // 1 to 10 deg/sec
  scanIntervalSec: number; // 3 to 60 sec
  batteryPercentage: number;
  solarCharging: boolean;
  solarVoltage: number;
  wifiRssi: number; // -30 to -90 dBm
  lastHeartbeat: string;
  lastImageCapturedAt: string;
  currentTargetTreeId: string;
  totalScansToday: number;
  mqttBroker?: string;
  firmwareVersion: string;
}

export interface FarmerProfile {
  name: string;
  farmName: string;
  location: string;
  phone: string;
  email: string;
  language: 'en' | 'ta';
  alertThresholds: {
    smsHighRiskOnly: boolean;
    whatsappEnabled: boolean;
    emailDigestDaily: boolean;
    confidenceThreshold: number; // e.g. 75%
    visualSeverityThreshold: number; // e.g. 20%
  };
}

export interface DiseaseHistoryRecord {
  id: string;
  treeId: string;
  detectedAt: string;
  diseaseCategory: DiseaseCategory;
  conditionNameEn: string;
  conditionNameTa: string;
  riskLevel: RiskLevel;
  confidenceScore: number;
  visualSeverity: number;
  stage: 'early' | 'moderate' | 'advanced' | 'recovered';
  actionTaken: string;
  actionTakenTa: string;
  treatmentDate?: string;
  outcomeStatus: 'under_observation' | 'treatment_applied' | 'cured' | 'palm_removed';
  inspector: string;
  imageUrl?: string;
  followUpDue?: string;
}

