import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  TriangleAlert,
  CircleAlert,
  CircleCheck,
  Info,
  Shield,
  RefreshCw,
  Stethoscope,
  Pill,
  Thermometer,
  Baby,
  ArrowRight,
  Clock,
  ChevronRight,
  User,
  Weight,
  Scale,
  BookOpen,
  ExternalLink,
} from "lucide-react";

interface HealthAssistantProps {
  onNavigate: (view: string) => void;
}

/* ───── Types ───── */
type AgeGroup =
  | "child"
  | "teenager"
  | "adult"
  | "older_adult"
  | "pregnant"
  | "prefer_not";
type Severity = "mild" | "moderate" | "severe" | "unsure";
type ConcernLevel =
  | "lower_concern"
  | "monitor"
  | "professional_review"
  | "urgent";

interface FormData {
  ageGroup: AgeGroup | null;
  symptoms: string;
  duration: string;
  severity: Severity | null;
  additionalInfo: string;
  consent: boolean;
}

interface AssessmentResult {
  concernLevel: ConcernLevel;
  concernLabel: string;
  concernIcon: React.ReactNode;
  concernColor: string;
  summary: string;
  generalInfo: string;
  safeActions: string[];
  warningSigns: string[];
  nextStep: string;
  urgentWarning?: string;
}

/* ───── Age group data ───── */
const ageGroups: { value: AgeGroup; label: string; icon: React.ReactNode }[] = [
  { value: "child", label: "Child (0–12)", icon: <Baby className="w-5 h-5" /> },
  { value: "teenager", label: "Teenager (13–19)", icon: <User className="w-5 h-5" /> },
  { value: "adult", label: "Adult (20–59)", icon: <User className="w-5 h-5" /> },
  { value: "older_adult", label: "Older adult (60+)", icon: <User className="w-5 h-5" /> },
  { value: "pregnant", label: "Pregnant person", icon: <Heart className="w-5 h-5" /> },
  { value: "prefer_not", label: "Prefer not to say", icon: <User className="w-5 h-5" /> },
];

const severityData: { value: Severity; label: string; icon: React.ReactNode; color: string }[] = [
  {
    value: "mild",
    label: "Mild",
    icon: <CircleCheck className="w-5 h-5" />,
    color: "text-green-600",
  },
  {
    value: "moderate",
    label: "Moderate",
    icon: <Clock className="w-5 h-5" />,
    color: "text-amber-500",
  },
  {
    value: "severe",
    label: "Severe",
    icon: <TriangleAlert className="w-5 h-5" />,
    color: "text-red-600",
  },
  {
    value: "unsure",
    label: "Unsure",
    icon: <Info className="w-5 h-5" />,
    color: "text-blue-500",
  },
];

/* ───── Emergency keywords (lowercase) ───── */
const EMERGENCY_KEYWORDS = [
  "chest pain",
  "chest tightness",
  "difficulty breathing",
  "shortness of breath",
  "can't breathe",
  "unconscious",
  "passed out",
  "fainted",
  "stroke",
  "sudden weakness",
  "numbness on one side",
  "slurred speech",
  "severe bleeding",
  "heavy bleeding",
  "head injury",
  "severe burn",
  "poisoning",
  "swallowed poison",
  "severe allergic reaction",
  "anaphylaxis",
  "seizure",
  "fitting",
  "drowning",
  "choking",
  "suicidal",
  "self-harm",
  "overdose",
];

/* ───── Client-side assessment engine ───── */
function assessSymptoms(data: FormData): AssessmentResult {
  const symptoms = data.symptoms.toLowerCase();
  const duration = data.duration.toLowerCase();
  const severity = data.severity;
  const isPregnant = data.ageGroup === "pregnant";
  const isOlder = data.ageGroup === "older_adult";

  // Check for emergency keywords
  const foundEmergencies = EMERGENCY_KEYWORDS.filter((kw) => symptoms.includes(kw));

  // Determine concern level
  let concernLevel: ConcernLevel;
  let concernLabel: string;
  let concernColor: string;
  let urgentWarning: string | undefined;

  if (severity === "severe" || foundEmergencies.length > 0) {
    concernLevel = "urgent";
    concernLabel = "Urgent Professional Attention";
    concernColor = "text-red-600";
    urgentWarning =
      foundEmergencies.length > 0
        ? "You have described symptoms that require immediate medical attention."
        : "You have indicated severe symptoms. This requires prompt medical evaluation.";
  } else if (severity === "moderate") {
    concernLevel = "professional_review";
    concernLabel = "Professional Review Advised";
    concernColor = "text-orange-500";
  } else if (severity === "unsure" && (isPregnant || isOlder)) {
    concernLevel = "professional_review";
    concernLabel = "Professional Review Advised";
    concernColor = "text-orange-500";
  } else if (severity === "mild" && (duration.includes("week") || duration.includes("month") || duration.includes("persistent"))) {
    concernLevel = "monitor";
    concernLabel = "Monitor Carefully";
    concernColor = "text-amber-500";
  } else {
    concernLevel = "lower_concern";
    concernLabel = "Lower Concern";
    concernColor = "text-green-600";
  }

  // Summary
  const ageText = ageGroups.find((a) => a.value === data.ageGroup)?.label ?? "N/A";
  const severityText = severityData.find((s) => s.value === severity)?.label ?? "Not specified";
  const summary = `You are an ${ageText} reporting "${data.symptoms}" (${severityText} severity) for ${data.duration || "an unspecified duration"}.${data.additionalInfo ? ` Additional context: ${data.additionalInfo}` : ""}`;

  // General Health Information
  const generalInfo = getGeneralInfo(symptoms, severity);

  // Safe Recommended Actions
  const safeActions = getSafeActions(concernLevel, symptoms, severity);

  // Warning Signs
  let warningSigns: string[];
  if (concernLevel === "urgent") {
    warningSigns = [
      "Chest pain or pressure",
      "Difficulty breathing or shortness of breath",
      "Sudden weakness or numbness on one side of the body",
      "Slurred speech or confusion",
      "Severe or uncontrolled bleeding",
      "Loss of consciousness",
      "Severe allergic reaction with swelling or difficulty breathing",
    ];
  } else if (concernLevel === "professional_review") {
    warningSigns = [
      "Symptoms that worsen suddenly",
      "New symptoms that develop",
      "Fever that does not improve after 3 days",
      "Difficulty breathing or chest discomfort",
      "Severe headache or stiff neck",
    ];
  } else {
    warningSigns = [
      "If symptoms worsen or persist beyond a few days",
      "If you develop a high fever",
      "If you experience difficulty breathing",
      "If you notice any unusual or severe symptoms",
    ];
  }

  // Next Step
  const nextStep = getNextStep(concernLevel, isPregnant, isOlder);

  return {
    concernLevel,
    concernLabel,
    concernIcon: getConcernIcon(concernLevel),
    concernColor,
    summary,
    generalInfo,
    safeActions,
    warningSigns,
    nextStep,
    urgentWarning,
  };
}

function getConcernIcon(level: ConcernLevel): React.ReactNode {
  switch (level) {
    case "urgent":
      return <TriangleAlert className="w-6 h-6" />;
    case "professional_review":
      return <Stethoscope className="w-6 h-6" />;
    case "monitor":
      return <Clock className="w-6 h-6" />;
    case "lower_concern":
      return <CircleCheck className="w-6 h-6" />;
  }
}

function getGeneralInfo(symptoms: string, severity: Severity | null): string {
  // Body-system based educational info
  if (symptoms.includes("headache") || symptoms.includes("head pain") || symptoms.includes("migraine")) {
    return "Headaches are common and can be caused by many factors including tension, dehydration, sinus congestion, or eye strain. The brain itself does not feel pain — headaches involve the nerves, blood vessels, and muscles of the head and neck. Most headaches are temporary and resolve with rest, hydration, and basic self-care. However, sudden severe headaches (sometimes called 'thunderclap' headaches) require medical evaluation.";
  }
  if (symptoms.includes("fever") || symptoms.includes("temperature") || symptoms.includes("hot")) {
    return "Fever is a natural response of the immune system. When the body detects an infection, it raises its temperature to help fight off germs. A normal body temperature is around 36–37°C (98–99°F). Mild fevers (up to 38°C / 100.4°F) are generally not dangerous and can be managed with rest and fluids. Persistent or very high fevers should be evaluated by a healthcare professional.";
  }
  if (symptoms.includes("cough") || symptoms.includes("sore throat") || symptoms.includes("cold") || symptoms.includes("runny nose") || symptoms.includes("congestion")) {
    return "The respiratory system includes the nose, throat, and lungs. Common colds and mild respiratory infections are usually caused by viruses and resolve on their own within 7–10 days. The body's immune system works to clear the infection. Rest, warm fluids, and humid air can help soothe symptoms. Antibiotics are not effective against viral infections.";
  }
  if (symptoms.includes("stomach") || symptoms.includes("abdominal") || symptoms.includes("nausea") || symptoms.includes("vomiting") || symptoms.includes("diarrhea") || symptoms.includes("digest")) {
    return "The digestive system processes food and absorbs nutrients. Common digestive discomfort can result from dietary choices, stress, infections, or food sensitivities. The stomach and intestines are sensitive to many factors. Staying hydrated is especially important if vomiting or diarrhea is present. The body usually recovers with rest and gentle nutrition.";
  }
  if (symptoms.includes("pain") || symptoms.includes("ache") || symptoms.includes("hurt")) {
    return "Pain is the body's way of signaling that something may be wrong. It can be acute (short-term) or chronic (long-lasting). The perception of pain varies from person to person. Rest, gentle movement, and proper hydration can help with mild discomfort. Persistent or severe pain should always be evaluated by a healthcare professional to identify the underlying cause.";
  }
  if (symptoms.includes("rash") || symptoms.includes("skin") || symptoms.includes("itching") || symptoms.includes("hives")) {
    return "The skin is the body's largest organ and serves as a protective barrier. Skin reactions can be caused by allergies, infections, weather changes, or contact with irritants. Most minor rashes resolve with gentle care and avoiding triggers. Signs of infection (warmth, spreading redness, pus) or widespread rashes with fever require medical attention.";
  }
  if (symptoms.includes("fatigue") || symptoms.includes("tired") || symptoms.includes("weakness") || symptoms.includes("exhaustion")) {
    return "Fatigue is a common symptom that can result from many factors: poor sleep, dehydration, stress, nutritional deficiencies, or underlying health conditions. The body requires adequate rest, nutrition, and hydration to maintain energy levels. If fatigue persists despite good sleep and self-care, it is worth discussing with a healthcare provider.";
  }

  // Default general info
  return "The human body has complex systems that work together to maintain health. Symptoms are signals from the body that something may need attention. Many symptoms are temporary and resolve with basic self-care, rest, and proper hydration. The body has remarkable healing capabilities, but it is always wise to seek professional medical advice for persistent, worsening, or concerning symptoms.";
}

function getSafeActions(level: ConcernLevel, symptoms: string, severity: Severity | null): string[] {
  const actions: string[] = [];

  if (level === "urgent") {
    actions.push("Do not wait — seek emergency medical care immediately.");
    actions.push("Call your local emergency number (e.g., 112 in Nigeria) or ask someone to drive you to the nearest hospital.");
    actions.push("While waiting for help, sit or lie down in a comfortable position.");
    actions.push("Do not eat or drink unless instructed by a medical professional.");
    return actions;
  }

  actions.push("Rest and allow your body time to recover.");
  actions.push("Drink plenty of clean, safe water to stay hydrated.");

  if (symptoms.includes("fever") || symptoms.includes("cough") || symptoms.includes("cold")) {
    actions.push("Get adequate rest and sleep to support your immune system.");
  }
  if (symptoms.includes("stomach") || symptoms.includes("nausea") || symptoms.includes("diarrhea")) {
    actions.push("Eat light, easy-to-digest foods like rice, bananas, or plain crackers.");
    actions.push("Avoid spicy, oily, or heavy foods until symptoms improve.");
  }
  if (symptoms.includes("headache")) {
    actions.push("Rest in a quiet, dark room if possible.");
    actions.push("Apply a cool or warm compress to your forehead.");
  }
  if (symptoms.includes("pain") || symptoms.includes("ache")) {
    actions.push("Rest the affected area and avoid strenuous activity.");
  }
  if (symptoms.includes("rash") || symptoms.includes("itching")) {
    actions.push("Avoid scratching the affected area.");
    actions.push("Keep the skin clean and dry.");
  }

  actions.push("Monitor your symptoms. If they worsen or do not improve, seek medical advice.");
  return actions;
}

function getNextStep(level: ConcernLevel, isPregnant: boolean, isOlder: boolean): string {
  switch (level) {
    case "urgent":
      return "Please go to the nearest hospital or call 112 (Nigeria Emergency) immediately. Do not wait for symptoms to improve on their own. Emergency care is available 24 hours a day.";
    case "professional_review":
      return "Schedule an appointment with a healthcare provider in the next few days. If you do not have a regular doctor, visit your local clinic or community health center. If you notice any new or worsening symptoms before your appointment, seek care sooner.";
    case "monitor":
      return "Monitor your symptoms closely over the next 24–48 hours. If symptoms persist beyond a week or begin to worsen, schedule a visit with a healthcare provider. Keep a simple record of how you feel each day.";
    default:
      return "Continue to rest and monitor how you feel. Most mild symptoms resolve on their own within a few days. If symptoms persist beyond 3–5 days or worsen, consult a healthcare provider at your local clinic.";
  }
}

/* ───── Component ───── */
export default function HealthAssistant({ onNavigate }: HealthAssistantProps) {
  const [step, setStep] = useState<"disclaimer" | "form" | "result">("disclaimer");
  const [formData, setFormData] = useState<FormData>({
    ageGroup: null,
    symptoms: "",
    duration: "",
    severity: null,
    additionalInfo: "",
    consent: false,
  });
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = useCallback(<K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const handleSubmit = useCallback(() => {
    const newErrors: Record<string, string> = {};
    if (!formData.ageGroup) newErrors.ageGroup = "Please select an age group.";
    if (!formData.symptoms.trim()) newErrors.symptoms = "Please describe your symptoms or health concern.";
    if (!formData.duration.trim()) newErrors.duration = "Please specify how long you have had these symptoms.";
    if (!formData.severity) newErrors.severity = "Please select a severity level.";
    if (!formData.consent) newErrors.consent = "You must acknowledge that this is educational information only.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const assessment = assessSymptoms(formData);
    setResult(assessment);
    setStep("result");
  }, [formData]);

  const handleStartOver = useCallback(() => {
    setStep("form");
    setResult(null);
    setFormData({
      ageGroup: null,
      symptoms: "",
      duration: "",
      severity: null,
      additionalInfo: "",
      consent: false,
    });
    setErrors({});
  }, []);

  /* ───── Disclaimer Step ───── */
  if (step === "disclaimer") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 16 }}
          className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8"
        >
          <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6">
            <TriangleAlert className="w-8 h-8 text-amber-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Important Safety Notice
          </h2>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6 text-left text-sm text-gray-700 leading-relaxed">
            <p className="mb-3">
              <strong className="text-gray-900">CommunityIQ Health Assistant</strong> provides general health education information only. It does not diagnose illness, prescribe medication, or replace a qualified healthcare professional.
            </p>
            <p className="mb-3">
              If you are experiencing a medical emergency, call <strong>112</strong> (Nigeria Emergency) or go to your nearest hospital immediately.
            </p>
            <p>
              Always consult a qualified healthcare professional for any medical concerns or before making any health-related decisions.
            </p>
          </div>
          <button
            onClick={() => setStep("form")}
            className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all active:scale-[0.97] shadow-lg shadow-green-200"
          >
            I Understand, Continue
          </button>
          <button
            onClick={() => onNavigate("home")}
            className="w-full mt-3 text-gray-500 hover:text-gray-700 px-6 py-3 rounded-xl font-medium transition-all"
          >
            Go Back
          </button>
        </motion.div>
      </div>
    );
  }

  /* ───── Form Step ───── */
  if (step === "form") {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-4">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <button
              onClick={() => onNavigate("home")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all"
              aria-label="Go back"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 rotate-180" />
            </button>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-green-600" />
              <h1 className="text-lg font-bold text-gray-900">Health Assistant</h1>
            </div>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 py-6 space-y-8">
          {/* Safety banner */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3"
          >
            <Info className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 leading-relaxed">
              This assistant provides general health education. It does not diagnose illness, prescribe medication, or replace a qualified healthcare professional.
            </p>
          </motion.div>

          {/* Age Group */}
          <section>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Age Group <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {ageGroups.map((age) => {
                const isSelected = formData.ageGroup === age.value;
                return (
                  <button
                    key={age.value}
                    type="button"
                    onClick={() => updateField("ageGroup", age.value)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all active:scale-[0.97] ${
                      isSelected
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <span className={isSelected ? "text-green-600" : "text-gray-400"}>
                      {age.icon}
                    </span>
                    {age.label}
                  </button>
                );
              })}
            </div>
            {errors.ageGroup && (
              <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                <CircleAlert className="w-3.5 h-3.5" /> {errors.ageGroup}
              </p>
            )}
          </section>

          {/* Main Symptoms */}
          <section>
            <label htmlFor="symptoms" className="block text-sm font-semibold text-gray-700 mb-2">
              Main symptoms or health concern <span className="text-red-500">*</span>
            </label>
            <textarea
              id="symptoms"
              rows={3}
              value={formData.symptoms}
              onChange={(e) => updateField("symptoms", e.target.value)}
              placeholder="Describe your symptoms or health concern. For example: headache, fever, cough, stomach pain, etc."
              className={`w-full rounded-xl border-2 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-green-400 transition-all resize-none ${
                errors.symptoms ? "border-red-300 bg-red-50" : "border-gray-200 bg-white"
              }`}
            />
            {errors.symptoms && (
              <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                <CircleAlert className="w-3.5 h-3.5" /> {errors.symptoms}
              </p>
            )}
          </section>

          {/* Duration */}
          <section>
            <label htmlFor="duration" className="block text-sm font-semibold text-gray-700 mb-2">
              How long have you had these symptoms? <span className="text-red-500">*</span>
            </label>
            <input
              id="duration"
              type="text"
              value={formData.duration}
              onChange={(e) => updateField("duration", e.target.value)}
              placeholder="e.g., a few hours, two days, one week, several months"
              className={`w-full rounded-xl border-2 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-green-400 transition-all ${
                errors.duration ? "border-red-300 bg-red-50" : "border-gray-200 bg-white"
              }`}
            />
            {errors.duration && (
              <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                <CircleAlert className="w-3.5 h-3.5" /> {errors.duration}
              </p>
            )}
          </section>

          {/* Severity */}
          <section>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Reported severity <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {severityData.map((s) => {
                const isSelected = formData.severity === s.value;
                return (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => updateField("severity", s.value)}
                    className={`flex flex-col items-center gap-2 px-4 py-4 rounded-xl border-2 text-sm font-medium transition-all active:scale-[0.97] ${
                      isSelected
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <span className={isSelected ? "text-green-600" : s.color}>
                      {s.icon}
                    </span>
                    {s.label}
                  </button>
                );
              })}
            </div>
            {errors.severity && (
              <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                <CircleAlert className="w-3.5 h-3.5" /> {errors.severity}
              </p>
            )}
          </section>

          {/* Additional Info */}
          <section>
            <label htmlFor="additionalInfo" className="block text-sm font-semibold text-gray-700 mb-2">
              Additional information <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              id="additionalInfo"
              rows={2}
              value={formData.additionalInfo}
              onChange={(e) => updateField("additionalInfo", e.target.value)}
              placeholder="Any other details you think are relevant..."
              className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-green-400 transition-all resize-none"
            />
          </section>

          {/* Consent */}
          <section>
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.consent}
                onChange={(e) => updateField("consent", e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors">
                I understand that this tool provides educational information and not a medical diagnosis.{" "}
                <span className="text-red-500">*</span>
              </span>
            </label>
            {errors.consent && (
              <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                <CircleAlert className="w-3.5 h-3.5" /> {errors.consent}
              </p>
            )}
          </section>

          {/* Submit */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleSubmit}
            className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-xl font-semibold text-base transition-all shadow-lg shadow-green-200 flex items-center justify-center gap-2"
          >
            <Shield className="w-5 h-5" />
            Review My Information
          </motion.button>
        </div>
      </div>
    );
  }

  /* ───── Result Step ───── */
  if (!result) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <button
            onClick={() => onNavigate("home")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all"
            aria-label="Go back"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 rotate-180" />
          </button>
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-green-600" />
            <h1 className="text-lg font-bold text-gray-900">Health Assessment</h1>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="space-y-6"
          >
            {/* Urgent warning */}
            {result.urgentWarning && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 border-2 border-red-300 rounded-xl p-5 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <TriangleAlert className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-red-800 text-sm mb-1">⚠ Immediate Attention Needed</h3>
                  <p className="text-sm text-red-700 leading-relaxed">{result.urgentWarning}</p>
                </div>
              </motion.div>
            )}

            {/* Concern Level */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  result.concernLevel === "urgent" ? "bg-red-100" :
                  result.concernLevel === "professional_review" ? "bg-orange-100" :
                  result.concernLevel === "monitor" ? "bg-amber-100" :
                  "bg-green-100"
                }`}>
                  <span className={
                    result.concernLevel === "urgent" ? "text-red-600" :
                    result.concernLevel === "professional_review" ? "text-orange-500" :
                    result.concernLevel === "monitor" ? "text-amber-500" :
                    "text-green-600"
                  }>
                    {result.concernIcon}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Concern Level</p>
                  <p className={`text-lg font-bold ${result.concernColor}`}>
                    {result.concernLabel}
                  </p>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-4 h-4 text-blue-500" />
                <h3 className="text-sm font-semibold text-gray-700">Summary</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{result.summary}</p>
            </div>

            {/* General Health Information */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-blue-500" />
                <h3 className="text-sm font-semibold text-gray-700">General Health Information</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{result.generalInfo}</p>
            </div>

            {/* Safe Recommended Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <CircleCheck className="w-4 h-4 text-green-500" />
                <h3 className="text-sm font-semibold text-gray-700">Safe Recommended Actions</h3>
              </div>
              <ul className="space-y-2">
                {result.safeActions.map((action, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 flex-shrink-0" />
                    {action}
                  </li>
                ))}
              </ul>
            </div>

            {/* Warning Signs */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <TriangleAlert className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-semibold text-gray-700">Warning Signs</h3>
              </div>
              <p className="text-xs text-gray-500 mb-3">
                Seek medical attention immediately if you experience any of the following:
              </p>
              <ul className="space-y-2">
                {result.warningSigns.map((sign, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                    {sign}
                  </li>
                ))}
              </ul>
            </div>

            {/* Suggested Next Step */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <ArrowRight className="w-4 h-4 text-blue-500" />
                <h3 className="text-sm font-semibold text-gray-700">Suggested Next Step</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{result.nextStep}</p>
            </div>

            {/* Important Disclaimer */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-amber-800 mb-1">Important Disclaimer</h3>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    This assessment is for educational purposes only. It does not provide a medical diagnosis,
                    treatment recommendation, or prescription. Always consult a qualified healthcare professional
                    for any health concerns. If you are experiencing a medical emergency, call 112 (Nigeria Emergency)
                    or go to your nearest hospital immediately.
                  </p>
                </div>
              </div>
            </div>

            {/* Start Over button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleStartOver}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 px-6 py-4 rounded-xl font-semibold text-base transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Start Over
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}