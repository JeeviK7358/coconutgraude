# 🌴 Smart Coconut Health AI

### AI-Powered Coconut Tree Disease Detection & Smart Farm Monitoring System

An intelligent agriculture monitoring system designed to detect potential coconut tree diseases at an early stage using AI-powered image analysis, a 360° rotating camera, GPS mapping, and real-time farmer alerts.

---

## 📌 Project Overview

Farmers often find it difficult to inspect every coconut tree regularly. Coconut diseases may go unnoticed during their early stages, potentially resulting in severe crop damage and economic losses.

**Smart Coconut Health AI** aims to solve this problem by combining Artificial Intelligence (AI), the Internet of Things (IoT), computer vision, and GPS technology.

The system captures images of coconut trees using a rotating camera, analyzes the images for visible disease symptoms, identifies potentially affected trees, and notifies farmers with relevant images, location information, and risk assessments.

### 🎯 Main Objectives

* Detect potential coconut tree diseases at an early stage.
* Monitor coconut trees using a 360° rotating camera.
* Analyze captured images using an AI-based disease detection model.
* Identify and locate potentially affected trees using GPS.
* Notify farmers about suspected diseases.
* Display affected trees on an interactive farm map.
* Provide disease risk assessments and recommended next steps.
* Reduce the need for frequent manual inspections.

---

## ✨ Key Features

### 1. 🤖 AI-Based Disease Detection

Analyze coconut tree images to identify potential disease symptoms and pest damage.

The system can be configured to recognize conditions such as:

* Bud Rot
* Leaf Rot
* Stem Bleeding
* Basal Stem Rot
* Root Wilt Disease
* Red Palm Weevil Infestation
* Rhinoceros Beetle Damage
* Leaf Discoloration
* Other Visible Abnormalities

*Actual detection performance depends on the trained AI model, image quality, and validation data.*

### 2. 📷 360° Rotating Camera Monitoring

* Automatically scan coconut trees using a rotating camera mechanism.
* Capture images at configurable intervals.
* Monitor camera position and scanning status.
* Support manual and automated scanning modes.
* Integrate with compatible IoT controllers.

### 3. 📍 GPS-Based Farm Mapping

* Display registered coconut trees on an interactive map.
* Associate trees with their GPS coordinates.
* Identify potentially affected trees by their location.
* View individual tree details and inspection history.
* Filter trees by health status and risk level.

**Map color indicators:**

| Color     | Meaning                         |
| --------- | ------------------------------- |
| 🟢 Green  | No abnormality detected         |
| 🟡 Yellow | Low-risk or uncertain finding   |
| 🟠 Orange | Medium risk                     |
| 🔴 Red    | High risk                       |
| ⚪ Gray    | Not inspected or no recent data |

These colors represent configured monitoring statuses, not guaranteed diagnoses.

### 4. 📱 Farmer Notification System

Provide notifications containing:

* Tree ID
* Suspected disease
* Captured image
* AI confidence score
* Estimated disease severity, when supported
* GPS location
* Risk level
* Recommended next steps
* Detection date and time

Potential notification channels include in-app notifications, SMS, email, and supported WhatsApp Business integrations.

External notification services require appropriate configuration.

### 5. 📊 Smart Dashboard

The dashboard displays:

* Total monitored trees
* Healthy trees
* Trees with suspected diseases
* High-risk trees
* Trees awaiting inspection
* Recent detection events
* Disease distribution
* Farm health statistics
* Camera and IoT device status

### 6. 📈 Disease History and Analytics

* Track previous detections.
* Review historical images.
* Monitor changes in tree health.
* Analyze disease trends.
* Export supported farm reports.

### 7. 🌐 Tamil and English Support

Provide an accessible interface for farmers in Tamil Nadu and other coconut-growing regions.

---

## 🏗️ System Architecture

```text
         COCONUT TREE
               |
               v
       360° ROTATING CAMERA
               |
               v
          IoT CONTROLLER
       (ESP32 / Raspberry Pi)
               |
               v
       IMAGE TRANSMISSION
               |
               v
       AI DISEASE DETECTION
               |
               v
       DISEASE RISK ANALYSIS
               |
        +------+------+
        |             |
        v             v
   GPS LOCATION   DATABASE
        |             |
        +------+------+
               |
               v
       FARMER ALERT SYSTEM
               |
        +------+------+
        |             |
        v             v
   MOBILE ALERT    FARM MAP
        |             |
        +------+------+
               |
               v
       FARM MONITORING
          DASHBOARD
```

---

## 🛠️ Technology Stack

The following technologies are proposed for the project. Final selections depend on the implementation.

| Component              | Technology                                   |
| ---------------------- | -------------------------------------------- |
| Frontend               | React.js / TypeScript                        |
| UI Styling             | Tailwind CSS                                 |
| Backend API            | Python / FastAPI                             |
| Database               | PostgreSQL                                   |
| AI and Computer Vision | TensorFlow or PyTorch                        |
| Image Processing       | OpenCV                                       |
| Interactive Map        | Leaflet / OpenStreetMap                      |
| Charts and Analytics   | Recharts                                     |
| IoT Controller         | ESP32 or Raspberry Pi                        |
| Camera Control         | Compatible camera and motor controller       |
| Device Communication   | MQTT or HTTPS                                |
| Image Storage          | Secure object storage                        |
| Notifications          | Configured SMS, email, or messaging provider |

---

## 🔌 Hardware Requirements

| Hardware                               | Purpose                          |
| -------------------------------------- | -------------------------------- |
| ESP32 or Raspberry Pi                  | Device control and communication |
| Compatible Camera Module               | Capture coconut tree images      |
| Pan Rotation Mechanism                 | Rotate the camera through 360°   |
| Servo Motor or Pan-Tilt Assembly       | Control camera movement          |
| GPS Module or Suitable Location Source | Obtain geographic coordinates    |
| Wi-Fi or Cellular Connectivity         | Transfer images and results      |
| Power Supply                           | Power the monitoring equipment   |
| Weather-Appropriate Enclosure          | Protect outdoor electronics      |

Hardware selection should account for camera resolution, operating distance, power requirements, connectivity, and outdoor conditions.

---

## ⚙️ How It Works

### Step 1: Camera Scanning

The camera rotates according to a configured scanning sequence and captures images of relevant tree sections.

### Step 2: Image Upload

Captured images are transferred to the backend for analysis.

### Step 3: AI Analysis

A configured computer vision model analyzes the images for visible disease symptoms.

### Step 4: Risk Assessment

The system generates a suspected condition, model confidence score, and severity estimate if the model supports it.

### Step 5: GPS Mapping

The result is associated with the correct tree ID and its recorded geographic location.

### Step 6: Farmer Notification

If configured alert criteria are met, the system creates a notification containing the detection details and captured image.

### Step 7: Dashboard Monitoring

Farmers can review affected trees, inspect their locations, and track disease history.

---

## 🦠 Disease Detection and Severity

The system should distinguish between the following measurements:

**AI Confidence Score:** Indicates the model's confidence in its prediction.

**Estimated Disease Severity:** Estimates the extent or seriousness of visible disease symptoms using a suitably trained and validated model.

**Risk Level:** Categorizes the required response according to configured, disease-specific rules.

Example of illustrative output:

```text
Tree ID: COC-024

Predicted Condition: Suspected Bud Rot
AI Confidence: 91%
Estimated Visual Severity: 35%
Risk Level: Medium
Location: GPS coordinates from registered tree
Status: Field Verification Required
```

*The values above are examples only and do not represent an actual diagnosis.*

A low-confidence result should be marked as uncertain rather than presented as a confirmed disease.

---

## 🚀 Getting Started

### Prerequisites

Install or configure the tools required by your implementation:

* Node.js and npm
* Python 3.10 or a compatible supported version
* Git
* PostgreSQL, if using a PostgreSQL backend
* A configured AI model or inference service
* Optional IoT hardware and notification provider credentials

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd smart-coconut-health-ai
```

Replace the placeholder with your actual repository URL.

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Configure the Backend

If the project uses FastAPI, create and activate a Python virtual environment.

```bash
python -m venv venv
```

Activate it on Windows:

```bash
venv\Scripts\activate
```

Activate it on Linux or macOS:

```bash
source venv/bin/activate
```

Install the backend dependencies listed in your project's `requirements.txt`:

```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables

Create a `.env` file using the configuration required by your implementation.

Example:

```env
DATABASE_URL=your_database_connection_string
AI_MODEL_ENDPOINT=your_ai_model_endpoint
IMAGE_STORAGE_CONFIG=your_storage_configuration
MQTT_BROKER_URL=your_mqtt_broker_url
SMS_PROVIDER_API_KEY=your_sms_provider_api_key
```

These are example configuration names. They must match the variables used by your actual code.

**Security:** Never commit API keys, passwords, or production credentials to GitHub.

### 5. Start the Application

For a frontend project configured with a development script:

```bash
npm run dev
```

For a FastAPI backend whose application entry point is `main.py`:

```bash
uvicorn main:app --reload
```

Run each command in the appropriate project directory. Your actual startup commands may differ depending on the generated project structure.

---

## 🧪 Demo Mode and Live Mode

### Demo Mode

Allows users to explore the dashboard using clearly labeled sample images, simulated device status, and illustrative disease predictions.

Demo results must never be represented as real detections.

### Live Hardware Mode

Requires integration with:

* A physical camera and rotation mechanism
* An IoT controller
* Real device communication
* A working image transmission pipeline
* A configured AI inference service
* Real GPS coordinates
* A database and image storage
* Configured notification services

The application must clearly indicate whether it is operating in demo mode or live mode.

---

## 🔐 Security and Privacy

* Protect farmer accounts with authentication.
* Restrict access to authorized farm records.
* Secure image uploads and stored photographs.
* Keep API credentials on the backend.
* Validate incoming device data.
* Use authenticated communication between IoT devices and the backend.
* Avoid exposing private farm coordinates to unauthorized users.
* Maintain logs for important system events.

---

## ⚠️ Limitations

* Disease detection accuracy depends on the quality and coverage of training data.
* Some diseases require inspection of specific tree parts that may not be visible in a single image.
* GPS accuracy depends on the location hardware and environmental conditions.
* Network connectivity may affect real-time notifications.
* Automated disease detection is not a substitute for professional agricultural diagnosis.
* Disease severity estimates require appropriate training and validation.
* Real-time camera operation requires compatible hardware and a functioning integration layer.

---

## 🔮 Future Enhancements

* Solar-powered autonomous monitoring stations.
* Multiple camera units for large farms.
* Offline image capture and delayed synchronization.
* Multilingual voice alerts for farmers.
* Weather-based disease risk analysis.
* Integration with agricultural extension services.
* Historical disease prediction and trend analysis.
* Improved disease localization within captured images.
* Farm-wide IoT sensor integration.
* Mobile application support.

---

## 🌱 Expected Impact

Smart Coconut Health AI aims to help farmers:

* Identify potential disease symptoms earlier.
* Reduce the effort required for routine inspections.
* Locate trees that need attention.
* Prioritize high-risk cases.
* Maintain digital records of tree health.
* Make more informed crop-management decisions.

The real-world impact must be evaluated through field testing and validation.

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Implement and test your changes.
4. Submit a pull request describing your improvements.

---

## 📜 License

Choose an appropriate open-source license before publishing the project. For example, the MIT License may be suitable if you want others to use, modify, and distribute your code under its terms.

---

## 👨‍💻 Project Information

**Project Name:** Smart Coconut Health AI

**Domain:** Artificial Intelligence, IoT, Smart Agriculture, Computer Vision

**Primary Application:** Coconut Tree Disease Monitoring

**Goal:** Early identification of potential coconut tree health problems and timely farmer notification.

---

### 🌴 Smart Coconut Health AI

**Smarter Monitoring. Earlier Warnings. Healthier Coconut Farms.**
