import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap, BookOpen, Brain, Lightbulb, CircleCheck, CircleX, ArrowLeft, ChevronRight,
  Sparkles, Star, RefreshCw, Target, BookText, Calculator, Microscope, Globe, CircleAlert,
  Zap, FlaskConical, Monitor, Trophy, ChevronLeft,
} from "lucide-react";

interface LearningAssistantProps { onNavigate: (view: string) => void; }
type ClassLevel = "p1-3" | "p4-6" | "jss" | "sss";
type Subject = "mathematics" | "english" | "basic-science" | "biology" | "chemistry" | "physics" | "computer-studies" | "civic-education" | "other";
type Goal = "understand" | "solve" | "revise" | "quiz";
type Difficulty = "beginner" | "intermediate" | "advanced";
type Tab = "study" | "quiz";
interface FormData { classLevel: ClassLevel; subject: Subject; topic: string; goal: Goal; difficulty: Difficulty; }
interface QuizQuestion { question: string; options: string[]; correct: number; explanation: string; steps?: string[]; }
interface StudyResult { topic: string; simpleExplanation: string; keyPoints: string[]; workedExample: { title: string; steps: string[] }; commonMistakes: string[]; quiz: QuizQuestion[]; }

const classLevels: { value: ClassLevel; label: string }[] = [
  { value: "p1-3", label: "Primary 1-3" }, { value: "p4-6", label: "Primary 4-6" }, { value: "jss", label: "Junior Secondary" }, { value: "sss", label: "Senior Secondary" },
];
const subjects: { value: Subject; label: string; icon: React.ReactNode }[] = [
  { value: "mathematics", label: "Mathematics", icon: <Calculator className="w-4 h-4" /> },
  { value: "english", label: "English Language", icon: <BookText className="w-4 h-4" /> },
  { value: "basic-science", label: "Basic Science", icon: <Microscope className="w-4 h-4" /> },
  { value: "biology", label: "Biology", icon: <Brain className="w-4 h-4" /> },
  { value: "chemistry", label: "Chemistry", icon: <FlaskConical className="w-4 h-4" /> },
  { value: "physics", label: "Physics", icon: <Zap className="w-4 h-4" /> },
  { value: "computer-studies", label: "Computer Studies", icon: <Monitor className="w-4 h-4" /> },
  { value: "civic-education", label: "Civic Education", icon: <Globe className="w-4 h-4" /> },
  { value: "other", label: "Other", icon: <CircleAlert className="w-4 h-4" /> },
];
const goals: { value: Goal; label: string; description: string }[] = [
  { value: "understand", label: "Understand a topic", description: "Get a clear, simple explanation" },
  { value: "solve", label: "Solve a question", description: "Step-by-step worked example" },
  { value: "revise", label: "Revise for exam", description: "Key points and common mistakes" },
  { value: "quiz", label: "Practice quiz", description: "Test yourself with 5 questions" },
];
const difficulties: { value: Difficulty; label: string }[] = [
  { value: "beginner", label: "Beginner" }, { value: "intermediate", label: "Intermediate" }, { value: "advanced", label: "Advanced" },
];

function nigerianPraise(score: number, total: number): string {
  const ratio = score / total;
  if (ratio === 1) return "Outstanding! You got every question right. Kudos!";
  if (ratio >= 0.8) return "Excellent work! Keep shining!";
  if (ratio >= 0.6) return "Good job! With a little more practice, you will master this.";
  if (ratio >= 0.4) return "Nice try! Review the study guide and try again.";
  return "Do not give up! Every expert was once a beginner. Try again!";
}

function generateResult(data: FormData): StudyResult {
  const topic = data.topic.trim() || "General Study Guide";

  const base: Record<Subject, StudyResult> = {
    mathematics: {
      topic,
      simpleExplanation: `${topic} is about using numbers and patterns to solve problems. Take it step by step, write down what you know, and always check your final answer.`,
      keyPoints: ["Read the question carefully.", "Write the formula or method you will use.", "Show every step of your working.", "Use the correct units.", "Check your answer by working backwards."],
      workedExample: { title: "Sharing Chin-Chin Fairly", steps: ["Mama has 36 pieces of chin-chin.", "She wants to share them equally among 4 children.", "Divide: 36 / 4 = 9.", "Each child gets 9 pieces."] },
      commonMistakes: ["Rushing without reading the full question.", "Forgetting to convert percentages to decimals.", "Making small arithmetic errors."],
      quiz: [
        { question: "What is 25% of 800 naira?", options: ["200 naira", "250 naira", "100 naira", "400 naira"], correct: 0, explanation: "0.25 x 800 = 200 naira.", steps: ["Convert 25% to a decimal: 0.25", "Multiply by 800: 0.25 x 800 = 200", "Answer: 200 naira"] },
        { question: "A bus travels from Lagos to Ibadan, a distance of 120 km, in 2 hours. What is its speed?", options: ["60 km/h", "120 km/h", "240 km/h", "30 km/h"], correct: 0, explanation: "Speed = Distance / Time = 120 / 2 = 60 km/h.", steps: ["Formula: Speed = Distance / Time", "Distance = 120 km, Time = 2 hours", "120 / 2 = 60 km/h"] },
        { question: "Solve 2x + 6 = 14.", options: ["4", "5", "6", "8"], correct: 0, explanation: "2x = 8, so x = 4.", steps: ["Subtract 6 from both sides: 2x = 8", "Divide by 2: x = 4"] },
        { question: "A rectangle has an area of 56 cm2 and a length of 8 cm. What is the width?", options: ["6 cm", "7 cm", "8 cm", "9 cm"], correct: 1, explanation: "Width = Area / Length = 56 / 8 = 7 cm.", steps: ["Formula: Width = Area / Length", "56 / 8 = 7", "Answer: 7 cm"] },
        { question: "3/4 + 1/2 = ?", options: ["4/6", "1", "5/4", "1/4"], correct: 2, explanation: "3/4 + 2/4 = 5/4.", steps: ["Find common denominator: 4", "Convert 1/2 to 2/4", "Add: 3/4 + 2/4 = 5/4"] },
      ],
    },
    english: {
      topic,
      simpleExplanation: `${topic} is about communicating clearly in English. Focus on grammar, vocabulary, and organising your ideas so others can understand you.`,
      keyPoints: ["Every sentence needs a subject and a verb.", "Use tenses correctly.", "Adjectives describe nouns; adverbs describe verbs.", "Organise your writing into paragraphs.", "Proofread to catch spelling and grammar mistakes."],
      workedExample: { title: "Parts of Speech", steps: ["Sentence: 'The quick brown fox jumps happily.'", "'The' = article", "'quick/brown' = adjectives", "'fox' = noun", "'jumps' = verb", "'happily' = adverb"] },
      commonMistakes: ["Confusing their/there/they're.", "Using double negatives.", "Subject-verb disagreement."],
      quiz: [
        { question: "Which word is a verb?", options: ["Beautiful", "Quickly", "Run", "Happiness"], correct: 2, explanation: "Run shows action, so it is a verb." },
        { question: "What is the past tense of 'go'?", options: ["Goed", "Gone", "Went", "Going"], correct: 2, explanation: "Went is the simple past tense of go." },
        { question: "Choose the correct sentence.", options: ["She go to school.", "She goes to school.", "She going to school.", "She gone to school."], correct: 1, explanation: "'She goes to school' uses the correct simple present tense." },
        { question: "What is an adjective?", options: ["Names a thing", "Describes a noun", "Shows action", "Joins sentences"], correct: 1, explanation: "An adjective describes a noun." },
        { question: "Which sentence is grammatically correct?", options: ["She don't like mangoes.", "She doesn't likes mangoes.", "She doesn't like mangoes.", "She not like mangoes."], correct: 2, explanation: "'She doesn't like mangoes' is correct." },
      ],
    },
    "basic-science": {
      topic,
      simpleExplanation: `${topic} helps us understand the world around us. Science starts with observation, asking questions, and testing ideas through experiments.`,
      keyPoints: ["Observation is the first step.", "A hypothesis is a testable prediction.", "A fair test changes only one variable.", "Record results clearly.", "Draw conclusions based on evidence."],
      workedExample: { title: "Testing Whether Plants Need Sunlight", steps: ["Place one plant in sunlight and another in a dark cupboard.", "Water both plants the same amount.", "Observe for one week.", "The plant in sunlight stays green; the plant in darkness turns yellow.", "Conclusion: plants need sunlight."] },
      commonMistakes: ["Making conclusions without enough evidence.", "Changing more than one variable at a time.", "Ignoring unexpected results."],
      quiz: [
        { question: "What is the first step of the scientific method?", options: ["Conclusion", "Observation", "Publish", "Collect data"], correct: 1, explanation: "Science usually begins with observation." },
        { question: "What is a hypothesis?", options: ["Final answer", "Testable prediction", "Graph", "Tool"], correct: 1, explanation: "A hypothesis is an educated guess that can be tested." },
        { question: "Why should experiments be repeated?", options: ["To waste time", "To confirm results", "To use materials", "To change the hypothesis"], correct: 1, explanation: "Repeating experiments helps confirm results." },
        { question: "Which of these is living?", options: ["Stone", "Water", "Tree", "Plastic"], correct: 2, explanation: "A tree grows, reproduces, and responds to its environment." },
        { question: "What do plants need for growth?", options: ["Sunlight, water, air", "Rocks only", "Darkness", "Plastic"], correct: 0, explanation: "Plants need sunlight, water, and air to grow." },
      ],
    },
    biology: {
      topic,
      simpleExplanation: `${topic} is the study of living things. It teaches us about cells, organisms, and how life interacts in ecosystems.`,
      keyPoints: ["All living things are made of cells.", "Cells form tissues, organs, and systems.", "Living things grow, reproduce, and respond to stimuli.", "Plants and animals depend on each other.", "Conservation protects biodiversity."],
      workedExample: { title: "Characteristics of Living Things", steps: ["Movement", "Respiration", "Sensitivity", "Growth", "Reproduction", "Excretion", "Nutrition"] },
      commonMistakes: ["Confusing growth with development.", "Thinking plants do not respire.", "Forgetting that viruses are not cells."],
      quiz: [
        { question: "What is the basic unit of life?", options: ["Tissue", "Cell", "Organ", "System"], correct: 1, explanation: "The cell is the basic unit of life." },
        { question: "Which is a characteristic of living things?", options: ["Movement", "Sleeping", "Eating only", "Talking"], correct: 0, explanation: "Movement is one of the characteristics of living things." },
        { question: "How do plants make their food?", options: ["Respiration", "Photosynthesis", "Digestion", "Excretion"], correct: 1, explanation: "Plants make food through photosynthesis." },
        { question: "What gas do plants release during photosynthesis?", options: ["CO2", "Oxygen", "Nitrogen", "Hydrogen"], correct: 1, explanation: "Plants release oxygen during photosynthesis." },
        { question: "Why is conservation important?", options: ["To waste resources", "To protect biodiversity", "To build more roads", "To cut all trees"], correct: 1, explanation: "Conservation protects species and ecosystems." },
      ],
    },
    chemistry: {
      topic,
      simpleExplanation: `${topic} is the study of matter and the changes it undergoes. Atoms are the tiny building blocks of all matter.`,
      keyPoints: ["Matter has mass and occupies space.", "Atoms are the smallest particles of elements.", "Chemical reactions produce new substances.", "Acids turn blue litmus red.", "Chemical equations must be balanced."],
      workedExample: { title: "Balancing H2 + O2 -> H2O", steps: ["Count atoms: H=2, O=2 on the left; H=2, O=1 on the right.", "Balance oxygen by making 2H2O on the right.", "Now hydrogen is 4 on the right.", "Balance hydrogen by making 2H2 on the left.", "Final equation: 2H2 + O2 -> 2H2O."] },
      commonMistakes: ["Changing subscripts instead of coefficients.", "Forgetting state symbols.", "Confusing mixtures and compounds."],
      quiz: [
        { question: "What is the smallest particle of an element?", options: ["Molecule", "Atom", "Compound", "Mixture"], correct: 1, explanation: "An atom is the smallest particle of an element." },
        { question: "What does a chemical reaction produce?", options: ["Only heat", "New substances", "No change", "Only light"], correct: 1, explanation: "A chemical reaction produces new substances." },
        { question: "What colour does litmus turn in acid?", options: ["Blue", "Red", "Green", "Purple"], correct: 1, explanation: "Acids turn blue litmus red." },
        { question: "How many oxygen atoms are in 2H2O?", options: ["1", "2", "3", "4"], correct: 1, explanation: "2H2O contains 2 oxygen atoms." },
        { question: "Which of these is a compound?", options: ["Oxygen", "Salt", "Iron", "Air"], correct: 1, explanation: "Salt (NaCl) is a compound." },
      ],
    },
    physics: {
      topic,
      simpleExplanation: `${topic} explains how the physical world works, including forces, motion, and energy. Always include units in your answers.`,
      keyPoints: ["Distance is the length of the path travelled.", "Speed = Distance / Time.", "Force = mass x acceleration.", "Energy is transferred, not lost.", "Diagrams help solve physics problems."],
      workedExample: { title: "Calculating Speed", steps: ["A car travels 240 m in 20 s.", "Speed = Distance / Time", "Speed = 240 / 20", "Speed = 12 m/s"] },
      commonMistakes: ["Wrong unit conversion.", "Confusing speed with velocity.", "Forgetting to include units."],
      quiz: [
        { question: "What is the unit of force?", options: ["Watt", "Newton", "Joule", "Pascal"], correct: 1, explanation: "Force is measured in Newtons." },
        { question: "A car travels 300 km in 5 hours. What is its speed?", options: ["50 km/h", "60 km/h", "70 km/h", "80 km/h"], correct: 1, explanation: "300 / 5 = 60 km/h." },
        { question: "What does F = ma mean?", options: ["mass x acceleration", "mass / acceleration", "mass + acceleration", "motion x area"], correct: 0, explanation: "F = ma means Force equals mass times acceleration." },
        { question: "What type of energy does a moving car have?", options: ["Potential", "Kinetic", "Chemical", "Nuclear"], correct: 1, explanation: "A moving object has kinetic energy." },
        { question: "Which statement about energy is true?", options: ["Energy is destroyed.", "Energy is created.", "Energy is transferred.", "Energy is lost."], correct: 2, explanation: "Energy is transferred from one form to another." },
      ],
    },
    "computer-studies": {
      topic,
      simpleExplanation: `${topic} teaches us how computers work and how to use them safely and effectively.`,
      keyPoints: ["Hardware is the physical part of a computer.", "Software gives instructions to the computer.", "Input devices bring data in; output devices show results.", "The internet connects computers worldwide.", "Use strong passwords to stay safe online."],
      workedExample: { title: "Parts of a Computer System", steps: ["Input: keyboard, mouse", "Processing: CPU", "Memory: RAM", "Storage: hard drive", "Output: monitor, printer"] },
      commonMistakes: ["Confusing RAM with storage.", "Thinking software is physical.", "Using weak passwords."],
      quiz: [
        { question: "Which device is an input device?", options: ["Monitor", "Printer", "Keyboard", "Speaker"], correct: 2, explanation: "A keyboard enters data into the computer." },
        { question: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Personal Unit", "Central Power Unit", "Central Program Unit"], correct: 0, explanation: "CPU stands for Central Processing Unit." },
        { question: "Which of these is permanent storage?", options: ["RAM", "CPU", "Hard drive", "Monitor"], correct: 2, explanation: "A hard drive stores files permanently." },
        { question: "What is software?", options: ["Physical parts", "Instructions", "Cable", "User"], correct: 1, explanation: "Software is a set of instructions for the computer." },
        { question: "Why are strong passwords important?", options: ["They increase speed", "They protect information", "They help friends", "They improve memory"], correct: 1, explanation: "Strong passwords protect personal information." },
      ],
    },
    "civic-education": {
      topic,
      simpleExplanation: `${topic} teaches us about our rights, responsibilities, and how to be good citizens in our community and country.`,
      keyPoints: ["A citizen is a legal member of a country.", "Rights are things we are entitled to.", "Responsibilities are duties we owe to society.", "Obey laws and respect others.", "Voting is a way citizens participate in government."],
      workedExample: { title: "Rights and Responsibilities", steps: ["Right: education", "Responsibility: attend school regularly", "Right: vote", "Responsibility: vote peacefully and wisely", "Right: freedom of expression", "Responsibility: express opinions respectfully"] },
      commonMistakes: ["Wanting rights without responsibilities.", "Confusing citizenship with ethnicity.", "Thinking one person cannot make a difference."],
      quiz: [
        { question: "What is a citizen?", options: ["A visitor", "A legal member of a country", "A tourist", "A foreigner"], correct: 1, explanation: "A citizen is a legal member of a country." },
        { question: "Which of these is a civic responsibility?", options: ["Sleeping", "Obeying laws", "Littering", "Disrespecting others"], correct: 1, explanation: "Obeying laws is a key civic responsibility." },
        { question: "Why do citizens vote?", options: ["For fun", "To choose leaders", "Because it is not important", "Only adults vote"], correct: 1, explanation: "Voting allows citizens to choose their leaders." },
        { question: "Which of these is a human right?", options: ["Education", "Stealing", "Fighting", "Cheating"], correct: 0, explanation: "Education is a fundamental human right." },
        { question: "Which action shows good citizenship?", options: ["Breaking rules", "Helping others", "Spreading rumours", "Ignoring problems"], correct: 1, explanation: "Helping others is a sign of good citizenship." },
      ],
    },
    other: {
      topic,
      simpleExplanation: `${topic} is a topic worth exploring with curiosity. Read carefully, ask questions, and practice regularly to improve.`,
      keyPoints: ["Identify the key terms in the topic.", "Make short notes in your own words.", "Use examples to explain ideas.", "Teach someone else what you learned.", "Review your notes regularly."],
      workedExample: { title: "How to Study Effectively", steps: ["Set a clear goal.", "Gather your study materials.", "Study in short, focused sessions.", "Test yourself with questions.", "Reflect on mistakes and try again."] },
      commonMistakes: ["Memorising without understanding.", "Studying for very long sessions without breaks.", "Ignoring difficult topics."],
      quiz: [
        { question: "What is the first step in studying a new topic?", options: ["Memorise", "Set a goal", "Skip parts", "Study all night"], correct: 1, explanation: "Setting a goal helps you focus your study." },
        { question: "Why should you test yourself?", options: ["To waste time", "To check understanding", "To avoid reading", "To copy answers"], correct: 1, explanation: "Testing yourself shows what you know and what you need to review." },
        { question: "How can you understand a hard topic?", options: ["Ignore it", "Break it into smaller parts", "Memorise only", "Skip examples"], correct: 1, explanation: "Breaking a topic into smaller parts makes it easier to understand." },
        { question: "What should you do during study breaks?", options: ["Use your phone for hours", "Rest, stretch, and drink water", "Start a new topic", "Sleep all day"], correct: 1, explanation: "Resting helps your brain remember information." },
        { question: "Who can help you learn?", options: ["Only yourself", "Teachers, parents, and classmates", "Nobody", "The internet only"], correct: 1, explanation: "Many people can support your learning." },
      ],
    },
  };

  const result = base[data.subject];
  return {
    ...result,
    topic,
    simpleExplanation: `${topic}${topic.toLowerCase().endsWith("?") ? "" : "."} ${result.simpleExplanation.replace(/^.*?\./, "")}`,
  };
}

export default function LearningAssistant({ onNavigate }: LearningAssistantProps) {
  const [step, setStep] = useState<"form" | "loading" | "result">("form");
  const [formData, setFormData] = useState<FormData>({ classLevel: "p4-6", subject: "mathematics", topic: "", goal: "understand", difficulty: "beginner" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<StudyResult | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<Tab>("study");

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => { const next = { ...prev }; delete next[key]; return next; });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.topic.trim()) newErrors.topic = "Please enter a topic or question.";
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return false; }
    return true;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setStep("loading");
    setQuizAnswers([]);
    setQuizSubmitted(false);
    setCurrentQuizIndex(0);
    setActiveTab("study");
    setTimeout(() => { setResult(generateResult(formData)); setStep("result"); }, 1800);
  };

  const handleStartOver = () => { setStep("form"); setResult(null); setQuizAnswers([]); setQuizSubmitted(false); setCurrentQuizIndex(0); setActiveTab("study"); };

  const handleQuizOptionSelect = (optionIndex: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => { const updated = [...prev]; updated[currentQuizIndex] = optionIndex; return updated; });
  };

  const handleQuizSubmit = () => { if (quizAnswers[currentQuizIndex] === undefined) return; setQuizSubmitted(true); };

  const handleNextQuiz = () => {
    if (!result) return;
    if (currentQuizIndex < result.quiz.length - 1) { setCurrentQuizIndex((p) => p + 1); setQuizSubmitted(false); }
  };

  const handlePrevQuiz = () => { if (currentQuizIndex > 0) { setCurrentQuizIndex((p) => p - 1); setQuizSubmitted(false); } };

  const currentQuestion = result?.quiz[currentQuizIndex];
  const selectedAnswer = quizAnswers[currentQuizIndex];
  const isCorrect = currentQuestion && selectedAnswer === currentQuestion.correct;

  const quizScore = useMemo(() => {
    if (!result) return 0;
    return quizAnswers.reduce((score, answer, idx) => (answer === result.quiz[idx]?.correct ? score + 1 : score), 0);
  }, [quizAnswers, result]);

  const allQuizAnswered = useMemo(() => {
    if (!result) return false;
    return quizAnswers.length === result.quiz.length && quizAnswers.every((a) => a !== undefined);
  }, [quizAnswers, result]);

  return (
    <motion.div className="min-h-screen bg-stone-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-stone-200 px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <button onClick={() => onNavigate("home")} className="p-2 hover:bg-stone-100 rounded-lg transition-all" aria-label="Go back"><ArrowLeft className="w-5 h-5 text-stone-600" /></button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-bold text-stone-900">Learning Assistant</h1>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {step === "form" && (
            <motion.div key="form" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-stone-900">What would you like to learn today?</h2>
                <p className="text-sm text-stone-500 max-w-md mx-auto">Get a personalised study guide, worked examples, and a practice quiz tailored for Nigerian students.</p>
              </div>

              <section>
                <label className="block text-sm font-semibold text-stone-700 mb-3">Class Level</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {classLevels.map((level) => {
                    const isSelected = formData.classLevel === level.value;
                    return (
                      <button key={level.value} onClick={() => updateField("classLevel", level.value)} className={`px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all active:scale-[0.97] ${isSelected ? "border-emerald-600 bg-emerald-50 text-emerald-800" : "border-stone-200 bg-white text-stone-600 hover:border-stone-300 hover:bg-stone-50"}`}>{level.label}</button>
                    );
                  })}
                </div>
              </section>

              <section>
                <label className="block text-sm font-semibold text-stone-700 mb-3">Subject</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {subjects.map((s) => {
                    const isSelected = formData.subject === s.value;
                    return (
                      <button key={s.value} onClick={() => updateField("subject", s.value)} className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all active:scale-[0.97] ${isSelected ? "border-emerald-600 bg-emerald-50 text-emerald-800" : "border-stone-200 bg-white text-stone-600 hover:border-stone-300 hover:bg-stone-50"}`}>
                        <span className={isSelected ? "text-emerald-700" : "text-stone-400"}>{s.icon}</span>{s.label}
                      </button>
                    );
                  })}
                </div>
              </section>

              <section>
                <label htmlFor="topic" className="block text-sm font-semibold text-stone-700 mb-2">Topic or Question <span className="text-red-500">*</span></label>
                <textarea id="topic" rows={4} value={formData.topic} onChange={(e) => updateField("topic", e.target.value)} placeholder="e.g., LCM and HCF, Photosynthesis, Quadratic equations" className={`w-full rounded-xl border-2 px-4 py-3 text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:border-emerald-500 transition-all resize-none ${errors.topic ? "border-red-300 bg-red-50" : "border-stone-200 bg-white"}`} />
                {errors.topic && <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1"><CircleAlert className="w-3.5 h-3.5" /> {errors.topic}</p>}
              </section>

              <section>
                <label className="block text-sm font-semibold text-stone-700 mb-3">Learning Goal</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {goals.map((g) => {
                    const isSelected = formData.goal === g.value;
                    return (
                      <button key={g.value} onClick={() => updateField("goal", g.value)} className={`text-left px-4 py-3 rounded-xl border-2 transition-all active:scale-[0.97] ${isSelected ? "border-emerald-600 bg-emerald-50" : "border-stone-200 bg-white hover:border-stone-300"}`}>
                        <div className={`text-sm font-semibold ${isSelected ? "text-emerald-800" : "text-stone-900"}`}>{g.label}</div>
                        <div className={`text-xs mt-0.5 ${isSelected ? "text-emerald-700" : "text-stone-500"}`}>{g.description}</div>
                      </button>
                    );
                  })}
                </div>
              </section>

              <section>
                <label className="block text-sm font-semibold text-stone-700 mb-3">Difficulty</label>
                <div className="grid grid-cols-3 gap-3">
                  {difficulties.map((d) => {
                    const isSelected = formData.difficulty === d.value;
                    return (
                      <button key={d.value} onClick={() => updateField("difficulty", d.value)} className={`px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all active:scale-[0.97] ${isSelected ? "border-emerald-600 bg-emerald-50 text-emerald-800" : "border-stone-200 bg-white text-stone-600 hover:border-stone-300 hover:bg-stone-50"}`}>{d.label}</button>
                    );
                  })}
                </div>
              </section>

              <motion.button whileTap={{ scale: 0.97 }} onClick={handleSubmit} className="w-full bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-4 rounded-xl font-semibold text-base transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" /> Start Learning
              </motion.button>
            </motion.div>
          )}

          {step === "loading" && (
            <motion.div key="loading" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="flex flex-col items-center justify-center py-20">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-emerald-100 border-t-emerald-700 animate-spin" />
                <Sparkles className="w-6 h-6 text-amber-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <p className="mt-6 text-lg font-semibold text-stone-900">Preparing your study guide...</p>
              <p className="text-sm text-stone-500">This will only take a moment.</p>
            </motion.div>
          )}

          {step === "result" && result && (
            <motion.div key="result" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-6">
              <div className="bg-gradient-to-br from-emerald-700 to-emerald-900 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Your Study Guide</h2>
                    <p className="text-white/90 text-sm mt-1">Well done! Let us master this topic together.</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-medium">{subjects.find((s) => s.value === formData.subject)?.label}</span>
                      <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-medium">{classLevels.find((c) => c.value === formData.classLevel)?.label}</span>
                      <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-medium capitalize">{formData.difficulty}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-2 shadow-sm border border-stone-200">
                <div className="flex rounded-xl overflow-hidden bg-stone-100 p-1">
                  <button onClick={() => setActiveTab("study")} className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === "study" ? "bg-white text-emerald-800 shadow" : "text-stone-600 hover:text-stone-900"}`}>Study Guide</button>
                  <button onClick={() => setActiveTab("quiz")} className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === "quiz" ? "bg-white text-emerald-800 shadow" : "text-stone-600 hover:text-stone-900"}`}>Interactive Practice Quiz</button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {activeTab === "study" && (
                  <motion.div key="study" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
                      <div className="flex items-center gap-2 mb-3">
                        <Lightbulb className="w-5 h-5 text-amber-500" />
                        <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">Topic</h3>
                      </div>
                      <p className="text-lg font-semibold text-stone-900">{result.topic}</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
                      <div className="flex items-center gap-2 mb-3">
                        <BookOpen className="w-5 h-5 text-emerald-600" />
                        <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">Simple Explanation</h3>
                      </div>
                      <p className="text-sm text-stone-600 leading-relaxed">{result.simpleExplanation}</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
                      <div className="flex items-center gap-2 mb-3">
                        <Target className="w-5 h-5 text-blue-500" />
                        <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">Key Points</h3>
                      </div>
                      <ul className="space-y-2">
                        {result.keyPoints.map((point, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-stone-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />{point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
                      <div className="flex items-center gap-2 mb-3">
                        <Brain className="w-5 h-5 text-purple-500" />
                        <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">Worked Example: {result.workedExample.title}</h3>
                      </div>
                      <div className="space-y-2">
                        {result.workedExample.steps.map((s, i) => (
                          <div key={i} className="flex items-start gap-3 text-sm text-stone-600">
                            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                            <span className="pt-0.5">{s}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <CircleAlert className="w-5 h-5 text-amber-600" />
                        <h3 className="text-sm font-bold text-amber-800 uppercase tracking-wider">Common Mistakes</h3>
                      </div>
                      <ul className="space-y-2">
                        {result.commonMistakes.map((m, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-amber-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />{m}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 flex items-start gap-3">
                      <CircleAlert className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-bold text-orange-800 mb-1">AI-Generated Practice Questions</h4>
                        <p className="text-xs text-orange-700 leading-relaxed">These questions are AI-generated for practice only. They are NOT official WAEC, NECO, or JAMB exam questions. Always refer to your school teachers and official past questions for exam preparation.</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "quiz" && (
                  <motion.div key="quiz" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Star className="w-5 h-5 text-yellow-500" />
                          <h3 className="text-lg font-bold text-stone-900">Practice Quiz</h3>
                        </div>
                        <span className="text-sm font-medium text-stone-500">Score: {quizScore} / {result.quiz.length}</span>
                      </div>

                      {allQuizAnswered && (
                        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-5 bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
                          <Trophy className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold text-emerald-800">You scored {quizScore}/{result.quiz.length}!</p>
                            <p className="text-sm text-emerald-700">{nigerianPraise(quizScore, result.quiz.length)}</p>
                          </div>
                        </motion.div>
                      )}

                      {currentQuestion && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-xs text-stone-400 uppercase tracking-wider">
                            <span>Question {currentQuizIndex + 1} of {result.quiz.length}</span>
                            <span>{Math.round(((currentQuizIndex + 1) / result.quiz.length) * 100)}%</span>
                          </div>
                          <div className="w-full bg-stone-100 rounded-full h-2 mb-4">
                            <div className="bg-emerald-600 h-2 rounded-full transition-all" style={{ width: `${((currentQuizIndex + 1) / result.quiz.length) * 100}%` }} />
                          </div>
                          <h4 className="text-base font-semibold text-stone-900">{currentQuestion.question}</h4>
                          <div className="space-y-2">
                            {currentQuestion.options.map((opt, idx) => {
                              let variant = "bg-stone-50 border-stone-100 hover:border-stone-200 text-stone-700";
                              if (quizSubmitted) {
                                if (idx === currentQuestion.correct) variant = "bg-green-50 border-green-300 text-green-700";
                                else if (idx === selectedAnswer) variant = "bg-red-50 border-red-300 text-red-700";
                                else variant = "bg-stone-50 border-stone-100 text-stone-400";
                              } else if (selectedAnswer === idx) variant = "bg-emerald-50 border-emerald-300 text-emerald-800";
                              return (
                                <button key={idx} onClick={() => handleQuizOptionSelect(idx)} disabled={quizSubmitted} className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${!quizSubmitted && "active:scale-[0.98]"} ${variant}`}>
                                  <span className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-xs font-bold flex-shrink-0">{String.fromCharCode(65 + idx)}</span>
                                  {opt}
                                  {quizSubmitted && idx === currentQuestion.correct && <CircleCheck className="w-4 h-4 ml-auto text-green-500" />}
                                  {quizSubmitted && idx === selectedAnswer && idx !== currentQuestion.correct && <CircleX className="w-4 h-4 ml-auto text-red-500" />}
                                </button>
                              );
                            })}
                          </div>
                          {quizSubmitted && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`p-4 rounded-xl text-sm ${isCorrect ? "bg-green-50 border border-green-200 text-green-800" : "bg-red-50 border border-red-200 text-red-800"}`}>
                              <div className="flex items-center gap-2 font-semibold mb-1">{isCorrect ? <CircleCheck className="w-4 h-4" /> : <CircleX className="w-4 h-4" />}{isCorrect ? "Correct!" : "Not quite."}</div>
                              <p className="text-stone-700 mb-2">{currentQuestion.explanation}</p>
                              {currentQuestion.steps && currentQuestion.steps.length > 0 && (
                                <div className="bg-white/60 rounded-lg p-3 space-y-1">
                                  <p className="font-semibold text-stone-800">Step-by-step:</p>
                                  {currentQuestion.steps.map((s, i) => (
                                    <p key={i} className="text-stone-700">{i + 1}. {s}</p>
                                  ))}
                                </div>
                              )}
                            </motion.div>
                          )}
                          <div className="flex gap-3 pt-2">
                            <button onClick={handlePrevQuiz} disabled={currentQuizIndex === 0} className="flex-1 py-3 rounded-xl border-2 border-stone-200 text-stone-700 font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-50 transition-all flex items-center justify-center gap-1"><ChevronLeft className="w-4 h-4" /> Previous</button>
                            {!quizSubmitted ? (
                              <button onClick={handleQuizSubmit} disabled={selectedAnswer === undefined} className="flex-1 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:bg-stone-200 text-white font-semibold text-sm transition-all">Submit Answer</button>
                            ) : (
                              <button onClick={handleNextQuiz} disabled={currentQuizIndex === result.quiz.length - 1} className="flex-1 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:bg-stone-200 text-white font-semibold text-sm transition-all flex items-center justify-center gap-1">Next <ChevronRight className="w-4 h-4" /></button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button whileTap={{ scale: 0.97 }} onClick={handleStartOver} className="w-full bg-white hover:bg-stone-50 text-stone-700 border-2 border-stone-200 px-6 py-4 rounded-xl font-semibold text-base transition-all flex items-center justify-center gap-2">
                <RefreshCw className="w-5 h-5" /> Start Over
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}