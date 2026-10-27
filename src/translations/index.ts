export interface TranslationDict {
  appTitle: string;
  appSubtitle: string;
  demoModeNotice: string;
  liveHardwareNotice: string;
  // Nav
  navDashboard: string;
  navCamera: string;
  navMap: string;
  navAiDetection: string;
  navTreeManagement: string;
  navAlerts: string;
  navDiseaseHistory: string;
  navAnalytics: string;
  navTreatmentGuide: string;
  navIotDevice: string;
  navSettings: string;
  // Stats
  totalMonitored: string;
  healthyTrees: string;
  suspectedDisease: string;
  highRiskTrees: string;
  awaitingInspection: string;
  lastMonitoringTime: string;
  cameraStatus: string;
  iotDeviceStatus: string;
  coverage: string;
  farmHealthIndex: string;
  // Risk
  riskHigh: string;
  riskMedium: string;
  riskLow: string;
  riskNone: string;
  // Common
  treeId: string;
  disease: string;
  confidence: string;
  severity: string;
  symptoms: string;
  location: string;
  lastScanned: string;
  recommendedAction: string;
  viewOnMap: string;
  inspectNow: string;
  startScan: string;
  stopScan: string;
  pauseScan: string;
  resumeScan: string;
  scanProgress: string;
  panAngle: string;
  rotationSpeed: string;
  captureInterval: string;
  scanHardwareMode: string;
  demoMode: string;
  liveMode: string;
  // AI Detection
  aiTitle: string;
  aiSubtitle: string;
  uploadOrCapture: string;
  selectSampleImage: string;
  analyzeImageButton: string;
  analyzingImage: string;
  modelConfidenceDisclaimer: string;
  expertInspectionRequired: string;
  // Map
  farmMapTitle: string;
  searchTreePlaceholder: string;
  allRisks: string;
  allDiseases: string;
  zoomToAffected: string;
  zoomToHighRisk: string;
  resetView: string;
  mapLegend: string;
  // Tree Management
  addTree: string;
  editTree: string;
  variety: string;
  block: string;
  age: string;
  years: string;
  exportCsv: string;
  // Alerts
  alertsCenter: string;
  sendTestAlert: string;
  alertHighRiskNotice: string;
  statusSent: string;
  statusDelivered: string;
  statusFailed: string;
  statusPending: string;
  markResolved: string;
  resolved: string;
  // Guides
  pathogen: string;
  prevention: string;
  bioControl: string;
  chemicalAdvisory: string;
  scientificReference: string;
}

export const translations: Record<'en' | 'ta', TranslationDict> = {
  en: {
    appTitle: 'SMART COCONUT HEALTH AI',
    appSubtitle: 'AI-Powered Early Disease Detection and Smart Farm Monitoring',
    demoModeNotice: 'DEMO MODE ACTIVE — Using simulated hardware telemetry and benchmark farm dataset',
    liveHardwareNotice: 'LIVE HARDWARE MODE ACTIVE — Connected to field IoT Camera Gateway',
    navDashboard: 'Dashboard',
    navCamera: '360° Camera System',
    navMap: 'GPS Farm Map',
    navAiDetection: 'AI Disease Detector',
    navTreeManagement: 'Tree Registry',
    navAlerts: 'Alert Center',
    navDiseaseHistory: 'Disease History',
    navAnalytics: 'Farm Analytics',
    navTreatmentGuide: 'Treatment & Prevention',
    navIotDevice: 'IoT Gateway',
    navSettings: 'Farm Settings',

    totalMonitored: 'Monitored Trees',
    healthyTrees: 'Healthy Trees',
    suspectedDisease: 'Suspected Condition',
    highRiskTrees: 'High Risk Urgent',
    awaitingInspection: 'Awaiting Inspection',
    lastMonitoringTime: 'Last Monitoring Time',
    cameraStatus: 'Camera Gimbal',
    iotDeviceStatus: 'IoT Controller',
    coverage: 'Orchard Coverage',
    farmHealthIndex: 'Farm Health Index',

    riskHigh: 'High Risk',
    riskMedium: 'Medium Risk',
    riskLow: 'Low Risk',
    riskNone: 'Healthy / No Risk',

    treeId: 'Tree ID',
    disease: 'Suspected Condition',
    confidence: 'AI Confidence',
    severity: 'Visual Severity',
    symptoms: 'Visible Symptoms',
    location: 'GPS Location',
    lastScanned: 'Last Scanned',
    recommendedAction: 'Recommended Next Action',
    viewOnMap: 'View on Farm Map',
    inspectNow: 'Verify in Field',
    startScan: 'Start 360° Scan',
    stopScan: 'Stop Scan',
    pauseScan: 'Pause',
    resumeScan: 'Resume Scan',
    scanProgress: 'Scanning Progress',
    panAngle: 'Pan Gimbal Angle',
    rotationSpeed: 'Rotation Speed',
    captureInterval: 'Capture Interval',
    scanHardwareMode: 'Operating Mode',
    demoMode: 'Demo Simulation',
    liveMode: 'Live Hardware',

    aiTitle: 'Coconut Pathology Computer Vision',
    aiSubtitle: 'Analyze crown, fronds, spindle, trunk, or base for early pathology and pest damage',
    uploadOrCapture: 'Upload Tree Image or Capture Live Frame',
    selectSampleImage: 'Or select verified real-world benchmark case:',
    analyzeImageButton: 'Run AI Disease Diagnosis',
    analyzingImage: 'Running Computer Vision Inference & Symptom Parsing...',
    modelConfidenceDisclaimer: 'Scientific Notice: AI Model Confidence reflects optical feature match probability. Visual Severity measures estimated damaged canopy or trunk tissue percentage. Neither is a definitive lab culture diagnosis without field validation.',
    expertInspectionRequired: 'Requires Agricultural Extension Officer / Field Expert Verification',

    farmMapTitle: 'Interactive GPS Orchard Map',
    searchTreePlaceholder: 'Search by Tree ID (e.g. COC-014)...',
    allRisks: 'All Risk Levels',
    allDiseases: 'All Disease Categories',
    zoomToAffected: 'Zoom to Affected Trees',
    zoomToHighRisk: 'Zoom High Risk Only',
    resetView: 'Reset Farm View',
    mapLegend: 'Map Marker Health Legend',

    addTree: 'Register New Tree',
    editTree: 'Edit Tree Record',
    variety: 'Coconut Variety',
    block: 'Farm Block / Sector',
    age: 'Palm Age',
    years: 'years',
    exportCsv: 'Export Records (CSV)',

    alertsCenter: 'Farmer Alert & Notification Center',
    sendTestAlert: 'Dispatch Test Alert',
    alertHighRiskNotice: 'Automated SMS & WhatsApp alerts trigger automatically when visual severity > 20% and risk is High.',
    statusSent: 'Sent to Carrier',
    statusDelivered: 'Delivered',
    statusFailed: 'Failed',
    statusPending: 'Queued',
    markResolved: 'Mark Verified',
    resolved: 'Resolved',

    pathogen: 'Causal Agent / Pathogen',
    prevention: 'Cultural & Preventive Measures',
    bioControl: 'Biological Control & Bio-agents',
    chemicalAdvisory: 'Chemical Advisory & Caution',
    scientificReference: 'Research Reference (ICAR-CPCRI / TNAU)'
  },

  ta: {
    appTitle: 'ஸ்மார்ட் தென்னை நலன் AI',
    appSubtitle: 'செயற்கை நுண்ணறிவு மூலம் தென்னை நோய் முன்கூட்டியே கண்டறிதல் மற்றும் ஜி.பி.எஸ் பண்ணை கண்காணிப்பு',
    demoModeNotice: 'டெமோ பயன்முறை — மாதிரி பண்ணை தரவு மற்றும் உருவகப்படுத்தப்பட்ட வன்பொருள் இயக்கத்தில் உள்ளது',
    liveHardwareNotice: 'நேரடி வன்பொருள் பயன்முறை — கள கேமரா மற்றும் ஐ.ஓ.டி கட்டுப்படுத்தியுடன் இணைக்கப்பட்டுள்ளது',
    navDashboard: 'முகப்பு பலகை',
    navCamera: '360° கேமரா அமைப்பு',
    navMap: 'ஜி.பி.எஸ் பண்ணை வரைபடம்',
    navAiDetection: 'AI நோய் கண்டறிதல்',
    navTreeManagement: 'மரங்கள் பதிவு',
    navAlerts: 'எச்சரிக்கை மையம்',
    navDiseaseHistory: 'நோய் வரலாறு',
    navAnalytics: 'பண்ணை பகுப்பாய்வு',
    navTreatmentGuide: 'சிகிச்சை & தடுப்பு முறைகள்',
    navIotDevice: 'ஐ.ஓ.டி கேட்வே',
    navSettings: 'பண்ணை அமைப்புகள்',

    totalMonitored: 'கண்காணிக்கப்படும் மரங்கள்',
    healthyTrees: 'ஆரோக்கியமான மரங்கள்',
    suspectedDisease: 'நோய் சந்தேக மரங்கள்',
    highRiskTrees: 'அதி தீவிர பாதிப்பு மரங்கள்',
    awaitingInspection: 'ஆய்வு தேவைப்படும் மரங்கள்',
    lastMonitoringTime: 'கடைசி கண்காணிப்பு நேரம்',
    cameraStatus: 'சுழலும் கேமரா நிலை',
    iotDeviceStatus: 'ஐ.ஓ.டி சாதனம்',
    coverage: 'தோட்ட கண்காணிப்பு பரப்பு',
    farmHealthIndex: 'பண்ணை ஆரோக்கிய குறியீடு',

    riskHigh: 'அதி தீவிரம்',
    riskMedium: 'நடுத்தர ஆபத்து',
    riskLow: 'குறைந்த ஆபத்து',
    riskNone: 'ஆரோக்கியமானது',

    treeId: 'மர எண்',
    disease: 'சந்தேகிக்கப்படும் பாதிப்பு',
    confidence: 'AI உறுதி சதவீதம்',
    severity: 'கண்ணால் காணும் தீவிரம்',
    symptoms: 'கண்டறியப்பட்ட அறிகுறிகள்',
    location: 'ஜி.பி.எஸ் அமைவிடம்',
    lastScanned: 'கடைசி ஆய்வு',
    recommendedAction: 'பரிந்துரைக்கப்படும் நடவடிக்கை',
    viewOnMap: 'வரைபடத்தில் பார்க்க',
    inspectNow: 'நேரடி கள ஆய்வு',
    startScan: '360° ஸ்கேன் தொடங்கு',
    stopScan: 'ஸ்கேன் நிறுத்து',
    pauseScan: 'இடைநிறுத்து',
    resumeScan: 'மீண்டும் தொடங்கு',
    scanProgress: 'ஸ்கேன் முன்னேற்றம்',
    panAngle: 'கேமரா கோணம்',
    rotationSpeed: 'சுழற்சி வேகம்',
    captureInterval: 'படம்பிடிக்கும் இடைவெளி',
    scanHardwareMode: 'இயக்க முறை',
    demoMode: 'மாதிரி டெமோ',
    liveMode: 'நேரடி வன்பொருள்',

    aiTitle: 'தென்னை நோயியல் கம்ப்யூட்டர் விஷன்',
    aiSubtitle: 'உச்சிக் கொண்டை, ஓலை, குருத்து அல்லது அடித்தண்டு புகைப்படங்களை ஆராய்ந்து ஆரம்பகால நோய்களைக் கண்டறிதல்',
    uploadOrCapture: 'மரத்தின் புகைப்படத்தை பதிவேற்றவும் அல்லது கேமரா மூலம் எடுக்கவும்',
    selectSampleImage: 'அல்லது சரிபார்க்கப்பட்ட கள மாதிரி புகைப்படத்தைத் தேர்ந்தெடுக்கவும்:',
    analyzeImageButton: 'AI நோய் பரிசோதனை செய்',
    analyzingImage: 'படத்தை நுணுக்கமாக ஆராய்ந்து அறிகுறிகள் கணக்கிடப்படுகிறது...',
    modelConfidenceDisclaimer: 'அறிவியல் குறிப்பு: AI மாதிரி நம்பிக்கை சதவீதம் என்பது காட்சி ஒற்றுமை அளவீடு ஆகும். காட்சி தீவிரம் என்பது பாதிக்கப்பட்ட பகுதியின் சதவீதத்தைக் குறிக்கிறது. இது நேரடி ஆய்வக பரிசோதனைக்கு மாற்றாகாது.',
    expertInspectionRequired: 'வேளாண் அலுவலர் அல்லது தாவரவியல் வல்லுநர் நேரடி ஆய்வு தேவை',

    farmMapTitle: 'ஊடாடும் ஜி.பி.எஸ் பண்ணை வரைபடம்',
    searchTreePlaceholder: 'மர எண் கொண்டு தேடுக (உதா: COC-014)...',
    allRisks: 'அனைத்து ஆபத்து நிலைகள்',
    allDiseases: 'அனைத்து நோய் வகைகள்',
    zoomToAffected: 'பாதிக்கப்பட்ட மரங்களைக் காட்டு',
    zoomToHighRisk: 'அதி தீவிர மரங்கள் மட்டும்',
    resetView: 'பண்ணை முழுத் தோற்றம்',
    mapLegend: 'வரைபட குறியீட்டு விளக்கம்',

    addTree: 'புதிய மரம் பதிவு',
    editTree: 'மர விவரம் திருத்து',
    variety: 'தென்னை ரகம்',
    block: 'தோட்ட பகுதி / பிளாக்',
    age: 'மரத்தின் வயது',
    years: 'ஆண்டுகள்',
    exportCsv: 'விவரங்களை பதிவிறக்கு (CSV)',

    alertsCenter: 'விவசாயி எச்சரிக்கை & தகவல் மையம்',
    sendTestAlert: 'மாதிரி எச்சரிக்கை அனுப்பு',
    alertHighRiskNotice: 'காட்சி தீவிரம் 20% மேல் மற்றும் அதிக ஆபத்து கண்டறியப்பட்டால் தானாக எஸ்.எம்.எஸ் மற்றும் வாட்ஸ்அப் அனுப்பப்படும்.',
    statusSent: 'அனுப்பப்பட்டது',
    statusDelivered: 'சேர்க்கப்பட்டது',
    statusFailed: 'தோல்வி',
    statusPending: 'வரிசையில் உள்ளது',
    markResolved: 'சரிபார்க்கப்பட்டது என குறி',
    resolved: 'தீர்க்கப்பட்டது',

    pathogen: 'நோய் காரணி / நுண்ணுயிர்',
    prevention: 'உழவியல் மற்றும் தடுப்பு நடவடிக்கைகள்',
    bioControl: 'உயிரியல் முறை கட்டுப்பாடு',
    chemicalAdvisory: 'ரசாயன மருந்துகள் பற்றிய எச்சரிக்கை',
    scientificReference: 'ஆராய்ச்சி குறிப்பு (ICAR-CPCRI / TNAU)'
  }
};
