import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Droplets,
  Apple,
  Baby,
  Stethoscope,
  BookOpen,
  Clock,
  Brain,
  Lightbulb,
  Shield,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  TriangleAlert,
  FlaskConical,
  Leaf,
  Info,
  Search,
  ArrowLeft,
  Target,
} from "lucide-react";

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 18 },
  },
} as const;

const cardVariants = {
  collapsed: {
    height: "auto",
    transition: { type: "spring" as const, stiffness: 300, damping: 28 },
  },
  expanded: {
    height: "auto",
    transition: { type: "spring" as const, stiffness: 300, damping: 28 },
  },
};

interface ResourceGuide {
  id: string;
  icon: React.ReactNode;
  title: string;
  teaser: string;
  overview: string;
  guidelines: string[];
  reminders: string[];
  disclaimer: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

const healthGuides: ResourceGuide[] = [
  {
    id: "personal-hygiene",
    icon: <Heart className="w-5 h-5" />,
    title: "Personal Hygiene",
    teaser: "Daily habits for staying clean and preventing infections.",
    overview:
      "Good personal hygiene is one of the most effective ways to protect yourself and your family from illnesses. Simple daily practices like regular handwashing, proper dental care, and maintaining clean surroundings can prevent the spread of germs and keep you healthy.",
    guidelines: [
      "Wash your hands with soap and clean water before eating, after using the toilet, and after touching animals or waste.",
      "Brush your teeth at least twice a day with fluoride toothpaste to prevent cavities and gum disease.",
      "Bathe or shower daily using clean water and soap. Pay attention to areas like armpits, feet, and groin.",
      "Keep your fingernails short and clean. Avoid biting your nails.",
      "Wear clean clothes and change undergarments daily. Wash clothes regularly with soap.",
      "Cover your mouth and nose with your elbow or a tissue when coughing or sneezing.",
    ],
    reminders: [
      "Handwashing with soap reduces the risk of diarrheal diseases by up to 40 percent.",
      "Shared items like towels, razors, and toothbrushes can spread germs. Use your own.",
      "If clean water is scarce, use a few drops of bleach or water purification tablets as a temporary measure.",
    ],
    disclaimer:
      "This information is for educational purposes only. Consult a healthcare professional for personal medical advice.",
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200",
  },
  {
    id: "safe-drinking-water",
    icon: <Droplets className="w-5 h-5" />,
    title: "Safe Drinking Water",
    teaser: "How to ensure your water is clean and safe for drinking.",
    overview:
      "Access to safe drinking water is essential for good health. Contaminated water can carry diseases like cholera, typhoid, and dysentery. Knowing how to treat and store water properly can protect you and your family from waterborne illnesses.",
    guidelines: [
      "Boil water for at least one minute (three minutes at high altitudes) and let it cool before drinking.",
      "Use a clean, fine cloth or a water filter to remove sediment and particles before boiling.",
      "Store treated water in clean, covered containers to prevent recontamination.",
      "Add 2 drops of household bleach (5 percent chlorine) per liter of water, stir, and let it sit for 30 minutes before drinking.",
      "Use water purification tablets according to the package instructions when boiling is not possible.",
      "Keep drinking water containers off the ground and away from animals and children.",
    ],
    reminders: [
      "Cloudy or dirty water should be filtered or settled before boiling or treating.",
      "Water that has been treated can still get contaminated if stored in dirty containers.",
      "Always wash your hands before handling drinking water containers.",
    ],
    disclaimer:
      "This information is for educational purposes only. Always follow local water safety guidelines from health authorities.",
    color: "text-sky-600",
    bgColor: "bg-sky-50",
    borderColor: "border-sky-200",
  },
  {
    id: "nutrition-basics",
    icon: <Apple className="w-5 h-5" />,
    title: "Nutrition Basics",
    teaser: "Understanding balanced diets, portions, and hydration.",
    overview:
      "Good nutrition is the foundation of a healthy life. A balanced diet provides the energy, vitamins, and minerals your body needs to grow, fight infections, and function properly. Learning about food groups and portion sizes can help you make healthier choices every day.",
    guidelines: [
      "Eat a variety of foods from all food groups: fruits, vegetables, grains, proteins, and dairy or alternatives.",
      "Fill half your plate with fruits and vegetables at each meal. Choose locally available options like spinach, ugu, carrots, and oranges.",
      "Include protein sources such as beans, eggs, fish, chicken, or groundnuts in your daily meals.",
      "Choose whole grains like brown rice, millet, sorghum, and oats over refined grains.",
      "Drink at least 6 to 8 glasses of clean water each day. More if you are active or in hot weather.",
      "Limit added sugars, salt, and fried foods. Use natural flavors like herbs, onions, and peppers instead.",
    ],
    reminders: [
      "A balanced meal does not need to be expensive. Use local, seasonal ingredients for better value.",
      "Eating too much salt can raise blood pressure. Try using less salt in cooking and at the table.",
      "Children and pregnant women need extra nutrients. Ensure they get enough iron, folate, and protein.",
    ],
    disclaimer:
      "This information is for educational purposes only. Consult a qualified nutritionist or healthcare provider for personalized dietary advice.",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
  },
  {
    id: "maternal-child-health",
    icon: <Baby className="w-5 h-5" />,
    title: "Maternal & Child Health",
    teaser: "Key awareness for antenatal care, immunization, and safe feeding.",
    overview:
      "Maternal and child health focuses on the well-being of mothers during pregnancy, childbirth, and the postpartum period, as well as the healthy growth and development of children. Proper care during these critical stages can prevent complications and give every child a healthy start in life.",
    guidelines: [
      "Attend all antenatal care visits as recommended by your health worker, ideally starting in the first trimester.",
      "Take iron and folic acid supplements as prescribed during pregnancy to prevent anemia and birth defects.",
      "Ensure your child receives all recommended vaccinations according to the national immunization schedule.",
      "Breastfeed exclusively for the first six months. Continue breastfeeding alongside complementary foods up to two years or beyond.",
      "Monitor your child's growth regularly by checking weight, height, and developmental milestones.",
      "Seek immediate care if you or your child show signs of illness: fever, difficulty breathing, persistent vomiting, or unusual tiredness.",
    ],
    reminders: [
      "A pregnant woman needs extra rest, good nutrition, and support from family and community.",
      "Immunizations protect children from dangerous diseases like measles, polio, and tuberculosis.",
      "Family planning services are available at most health centers. Speak to a health worker about your options.",
    ],
    disclaimer:
      "This information is for educational purposes only. Always consult a qualified healthcare professional for pregnancy and child health advice.",
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
  },
  {
    id: "when-to-seek-care",
    icon: <Stethoscope className="w-5 h-5" />,
    title: "When to Seek Professional Care",
    teaser: "Understanding warning signs that need medical attention.",
    overview:
      "Knowing when to seek professional medical care can save lives. While many minor illnesses can be managed at home with rest and basic care, certain warning signs require immediate attention from a qualified healthcare professional. This guide helps you recognize those signs.",
    guidelines: [
      "Seek medical care if you or a family member has a persistent fever lasting more than three days.",
      "Difficulty breathing, chest pain, or severe headache that does not improve with rest requires urgent evaluation.",
      "Persistent vomiting, diarrhea, or inability to keep fluids down can lead to dehydration. Seek help if symptoms continue.",
      "Unusual bleeding, severe pain anywhere in the body, or sudden changes in vision or speech need immediate attention.",
      "For infants: seek care if your baby has a fever, is feeding poorly, has a rash, or is unusually sleepy or irritable.",
      "If you are unsure about the severity of a symptom, it is better to visit a health center for a professional opinion.",
    ],
    reminders: [
      "Trust your instincts. If you feel something is seriously wrong, seek help even if you cannot name the problem.",
      "In an emergency, call for help or go to the nearest hospital. Do not wait for symptoms to become severe.",
      "Keep a list of emergency contact numbers and the nearest health facility location accessible at home.",
    ],
    disclaimer:
      "This information is for educational purposes only. It does not replace professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for medical concerns.",
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
];

const learningGuides: ResourceGuide[] = [
  {
    id: "effective-study-habits",
    icon: <BookOpen className="w-5 h-5" />,
    title: "Effective Study Habits",
    teaser: "Techniques to learn better and retain more.",
    overview:
      "Studying effectively is not about how many hours you spend with your books. It is about using proven techniques that help your brain understand, remember, and apply what you have learned. Developing good study habits early can make a big difference in your academic success.",
    guidelines: [
      "Use active recall: after reading a topic, close your book and try to explain the key points from memory.",
      "Practice spaced repetition: review material after 1 day, 3 days, 1 week, and 1 month to strengthen long-term memory.",
      "Create a quiet, organized study space free from distractions like phones and television.",
      "Take short breaks every 25 to 30 minutes using the Pomodoro technique to maintain focus.",
      "Write notes in your own words instead of copying text. Use diagrams, mind maps, or flashcards for complex topics.",
      "Study at the same time each day to build a routine. Morning hours are often best for concentration.",
    ],
    reminders: [
      "Reading the same passage multiple times without active recall is one of the least effective study methods.",
      "Teaching what you have learned to someone else is a powerful way to reinforce your understanding.",
      "Get enough sleep. Your brain consolidates memories during sleep, making it essential for learning.",
    ],
    disclaimer:
      "This information is for educational purposes only. Adapt study techniques to your personal learning style and needs.",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
  },
  {
    id: "examination-preparation",
    icon: <Target className="w-5 h-5" />,
    title: "Examination Preparation",
    teaser: "Strategies to prepare and perform well in exams.",
    overview:
      "Exams can be stressful, but good preparation can help you feel confident and perform at your best. Planning ahead, practicing under test conditions, and taking care of your health during exam periods are all important parts of successful exam preparation.",
    guidelines: [
      "Create a revision timetable at least 4 to 6 weeks before your exam. Spread your subjects across the available days.",
      "Focus on understanding concepts rather than memorizing facts. Use past exam papers to practice applying your knowledge.",
      "Take practice tests under timed conditions to get used to the exam format and improve your speed.",
      "Review your mistakes after each practice test. Identify weak areas and spend extra time improving them.",
      "On the day before the exam, do a light review and rest early. Avoid cramming new material.",
      "On exam day, eat a light meal, arrive early, read all instructions carefully, and allocate time per question.",
    ],
    reminders: [
      "Anxiety is normal. Take deep breaths, remind yourself of your preparation, and stay focused on the present question.",
      "Do not compare yourself with others during the exam. Focus on your own paper and pace.",
      "If you get stuck on a question, move on and come back to it later. Do not let one question waste your time.",
    ],
    disclaimer:
      "This information is for educational purposes only. Always follow the specific guidelines and instructions provided by your school or examination board.",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
  },
  {
    id: "time-management",
    icon: <Clock className="w-5 h-5" />,
    title: "Time Management",
    teaser: "Tools and techniques to make the most of your time.",
    overview:
      "Time is a limited resource, and learning to manage it well is one of the most valuable skills you can develop. Good time management helps you get more done in less time, reduces stress, and creates space for both work and rest. It is especially important for students balancing school, home, and personal activities.",
    guidelines: [
      "Use the Pomodoro Technique: work for 25 minutes, take a 5-minute break, and repeat. After four cycles, take a longer 15-30 minute break.",
      "Prioritize your tasks using the Eisenhower Matrix: urgent and important first, then important but not urgent.",
      "Use a daily planner or simple notebook to write down tasks, deadlines, and appointments each morning.",
      "Break large tasks into smaller, manageable steps. Instead of 'study biology,' write 'review chapter 3 on cells.'",
      "Set realistic goals for each day. Overloading your schedule leads to burnout and poor quality work.",
      "Identify your biggest time wasters (social media, TV, unnecessary chatting) and set boundaries for them.",
    ],
    reminders: [
      "The best time to start a task is now. Waiting for the 'perfect time' often leads to procrastination.",
      "It is okay to say no to activities that do not align with your priorities or goals.",
      "Review your week every Sunday. Celebrate what you accomplished and plan for the week ahead.",
    ],
    disclaimer:
      "This information is for educational purposes only. Experiment with different techniques to find what works best for you.",
    color: "text-violet-600",
    bgColor: "bg-violet-50",
    borderColor: "border-violet-200",
  },
  {
    id: "digital-literacy",
    icon: <FlaskConical className="w-5 h-5" />,
    title: "Digital Literacy",
    teaser: "Safe browsing, smart searching, and verifying online sources.",
    overview:
      "Digital literacy is the ability to use digital tools and the internet safely, effectively, and responsibly. As more of our learning and daily activities move online, understanding how to navigate the digital world is essential for safety, privacy, and making informed decisions.",
    guidelines: [
      "Use strong passwords with a mix of letters, numbers, and symbols. Use a different password for each account.",
      "Verify information before sharing it. Cross-check facts with at least two reliable sources.",
      "Use search strategies like using quotation marks for exact phrases, and site: to limit results to specific websites.",
      "Be cautious of phishing: do not click on suspicious links or download attachments from unknown senders.",
      "Keep your devices and apps updated to protect against security vulnerabilities.",
      "Log out of accounts on shared or public computers. Clear your browsing history after use on shared devices.",
    ],
    reminders: [
      "Not everything on the internet is true. Check the source, date, and author of any information you find.",
      "Never share personal information like your address, phone number, or bank details with strangers online.",
      "If something online seems too good to be true, it probably is. Trust your instincts and verify before acting.",
    ],
    disclaimer:
      "This information is for educational purposes only. Always follow your school or organization's digital safety policies.",
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-200",
  },
  {
    id: "responsible-ai-use",
    icon: <Brain className="w-5 h-5" />,
    title: "Responsible Use of AI",
    teaser: "Using AI as a study aid while avoiding plagiarism.",
    overview:
      "Artificial intelligence tools can be powerful study companions. They can help explain concepts, generate practice questions, and provide feedback. However, using AI responsibly means understanding its limitations, being honest about your work, and maintaining your own critical thinking skills.",
    guidelines: [
      "Use AI as a learning partner, not a shortcut. Ask it to explain concepts, suggest examples, or quiz you on topics.",
      "Always verify AI-generated information. AI can make mistakes or present outdated information confidently.",
      "Do not copy AI-generated text and submit it as your own work. This is plagiarism and undermines your learning.",
      "Use AI to help structure your ideas, but write your own sentences, arguments, and conclusions.",
      "Be specific in your prompts. Instead of 'tell me about photosynthesis,' try 'explain photosynthesis at a primary school level with an example.'",
      "Critically analyze AI responses. Ask yourself: does this make sense? Is there evidence for this claim?",
    ],
    reminders: [
      "AI does not have personal experience or common sense. It cannot replace a teacher, mentor, or your own judgment.",
      "Your school may have specific rules about using AI tools. Always check your institution's academic integrity policy.",
      "The goal of using AI is to learn more effectively, not to do the work for you. Stay curious and engaged.",
    ],
    disclaimer:
      "This information is for educational purposes only. Always follow your school's academic integrity policies and guidelines for AI tool usage.",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
];

interface CommunityResourcesProps {
  onNavigate: (view: string) => void;
}

export default function CommunityResources({
  onNavigate,
}: CommunityResourcesProps) {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState<
    "all" | "health" | "learning"
  >("all");

  const allGuides =
    activeSection === "all"
      ? [...healthGuides, ...learningGuides]
      : activeSection === "health"
        ? healthGuides
        : learningGuides;

  const filteredGuides = allGuides.filter(
    (g) =>
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.teaser.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const toggleCard = (id: string) => {
    setExpandedCard((prev) => (prev === id ? null : id));
  };

  return (
    <motion.div
      className="min-h-screen bg-stone-50 dark:bg-stone-950"
      initial="hidden"
      animate="visible"
      variants={stagger}
    >
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/90 dark:bg-stone-900/90 backdrop-blur-lg border-b border-stone-200 dark:border-stone-800 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate("home")}
              className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-all active:scale-90"
            >
              <ArrowLeft className="w-5 h-5 text-stone-600 dark:text-stone-400" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h1 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                  Community Resources
                </h1>
              </div>
              <p className="text-xs text-stone-400 dark:text-stone-500">
                Educational guides for health and learning
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Notice Banner */}
      <motion.div variants={fadeUp} className="max-w-4xl mx-auto px-4 pt-4">
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center flex-shrink-0 mt-0.5">
            <TriangleAlert className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
            <strong className="font-semibold">Important Notice:</strong> This
            information is for educational purposes only. Always confirm
            guidance with local authorities or qualified professionals. In an
            emergency, contact your local emergency services or visit the
            nearest health facility.
          </div>
        </div>
      </motion.div>

      {/* Search & Filter */}
      <motion.div variants={fadeUp} className="max-w-4xl mx-auto px-4 py-4">
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides..."
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-sm text-stone-700 dark:text-stone-300 placeholder:text-stone-400 outline-none focus:border-emerald-300 dark:focus:border-emerald-700 focus:ring-1 focus:ring-emerald-300 dark:focus:ring-emerald-700 transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {[
            { id: "all" as const, label: "All Guides" },
            { id: "health" as const, label: "Health Awareness" },
            { id: "learning" as const, label: "Learning Resources" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => {
                setActiveSection(f.id);
                setExpandedCard(null);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all active:scale-90 ${
                activeSection === f.id
                  ? "bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300"
                  : "bg-white dark:bg-stone-800 text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Section: Health Awareness */}
      {(activeSection === "all" || activeSection === "health") && (
        <motion.div
          variants={fadeUp}
          className="max-w-4xl mx-auto px-4 pb-2"
        >
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-sm font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
              Health Awareness Resources
            </h2>
          </div>
        </motion.div>
      )}

      {/* Health Guides */}
      {(activeSection === "all" || activeSection === "health") && (
        <div className="max-w-4xl mx-auto px-4 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {healthGuides.map((guide, i) => (
              <ResourceCard
                key={guide.id}
                guide={guide}
                index={i}
                isExpanded={expandedCard === guide.id}
                onToggle={() => toggleCard(guide.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Section: Learning Resources */}
      {(activeSection === "all" || activeSection === "learning") && (
        <motion.div
          variants={fadeUp}
          className="max-w-4xl mx-auto px-4 pb-2"
        >
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-sm font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
              Learning Resources
            </h2>
          </div>
        </motion.div>
      )}

      {/* Learning Guides */}
      {(activeSection === "all" || activeSection === "learning") && (
        <div className="max-w-4xl mx-auto px-4 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {learningGuides.map((guide, i) => (
              <ResourceCard
                key={guide.id}
                guide={guide}
                index={i}
                isExpanded={expandedCard === guide.id}
                onToggle={() => toggleCard(guide.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {searchQuery &&
        filteredGuides.length === 0 &&
        activeSection === "all" && (
          <motion.div
            variants={fadeUp}
            className="max-w-4xl mx-auto px-4 pb-20 text-center"
          >
            <div className="bg-white dark:bg-stone-800 rounded-2xl p-8 border border-stone-200 dark:border-stone-700">
              <Search className="w-10 h-10 text-stone-300 dark:text-stone-600 mx-auto mb-3" />
              <p className="text-stone-500 dark:text-stone-400 font-medium">
                No guides found for "{searchQuery}"
              </p>
              <p className="text-stone-400 dark:text-stone-500 text-sm mt-1">
                Try a different search term or browse all guides.
              </p>
            </div>
          </motion.div>
        )}

      {/* Footer Disclaimer */}
      <motion.div
        variants={fadeUp}
        className="max-w-4xl mx-auto px-4 pb-24"
      >
        <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-5 flex items-start gap-3">
          <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-emerald-800 dark:text-emerald-200 leading-relaxed">
            <strong className="font-semibold">Educational Purpose Only.</strong>{" "}
            CommunityIQ AI provides general health and learning information. It
            does not offer medical diagnoses, prescribe treatment, or replace
            qualified professionals. Always consult a healthcare provider for
            medical concerns and follow your school's policies for academic
            matters.
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ResourceCard({
  guide,
  index,
  isExpanded,
  onToggle,
}: {
  guide: ResourceGuide;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      layout
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.04 }}
      className={`bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 overflow-hidden transition-all hover:shadow-md ${
        isExpanded ? "shadow-lg" : "shadow-sm"
      }`}
    >
      {/* Card Header - always visible */}
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-4 p-5 text-left transition-all active:scale-[0.99]"
      >
        <div
          className={`w-10 h-10 rounded-xl ${guide.bgColor} dark:opacity-80 flex items-center justify-center ${guide.color} flex-shrink-0 mt-0.5`}
        >
          {guide.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
            {guide.title}
          </h3>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-2">
            {guide.teaser}
          </p>
        </div>
        <div className="flex-shrink-0 mt-1">
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-stone-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-stone-400" />
          )}
        </div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring" as const, stiffness: 200, damping: 24 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-5 border-t border-stone-100 dark:border-stone-700 pt-4">
              {/* Overview */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <h4 className="text-sm font-semibold text-stone-700 dark:text-stone-300">
                    Overview
                  </h4>
                </div>
                <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                  {guide.overview}
                </p>
              </div>

              {/* Key Guidelines */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <h4 className="text-sm font-semibold text-stone-700 dark:text-stone-300">
                    Key Guidelines
                  </h4>
                </div>
                <ul className="space-y-2">
                  {guide.guidelines.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="flex items-start gap-2 text-sm text-stone-600 dark:text-stone-400"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 mt-2" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Important Reminders */}
              <div className="bg-stone-50 dark:bg-stone-900 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <h4 className="text-sm font-semibold text-stone-700 dark:text-stone-300">
                    Important Reminders
                  </h4>
                </div>
                <ul className="space-y-2">
                  {guide.reminders.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-stone-600 dark:text-stone-400"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 mt-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Disclaimer */}
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                <div className="flex items-start gap-2">
                  <ExternalLink className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
                    {guide.disclaimer}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}