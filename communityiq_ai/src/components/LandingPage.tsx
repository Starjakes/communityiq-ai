import { motion } from "framer-motion";
import {
  Heart,
  GraduationCap,
  Users,
  ChevronRight,
  Sparkles,
  Shield,
  ArrowRight,
  TriangleAlert,
  BookOpen,
  MessageCircle,
  Search,
  CheckCircle,
} from "lucide-react";

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 18 } },
} as const;

const fadeIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 80, damping: 16 } },
} as const;

const features = [
  {
    title: "AI Health Guidance",
    description:
      "Receive structured general health information and understand when professional attention may be appropriate.",
    icon: <Heart className="w-6 h-6" />,
    color: "text-green-600",
    bg: "bg-green-100",
    border: "hover:border-green-200",
    shadow: "shadow-green-100",
  },
  {
    title: "Personalized Learning",
    description:
      "Get simple explanations, revision support and practice quizzes for important school subjects.",
    icon: <GraduationCap className="w-6 h-6" />,
    color: "text-blue-600",
    bg: "bg-blue-100",
    border: "hover:border-blue-200",
    shadow: "shadow-blue-100",
  },
  {
    title: "Community Resources",
    description:
      "Access useful educational and public-health awareness information.",
    icon: <Users className="w-6 h-6" />,
    color: "text-orange-500",
    bg: "bg-orange-100",
    border: "hover:border-orange-200",
    shadow: "shadow-orange-100",
  },
];

const steps = [
  {
    step: 1,
    title: "Select Your Support",
    description: "Choose the type of support you need - health guidance or learning assistance.",
    icon: <MessageCircle className="w-6 h-6" />,
    color: "bg-green-100 text-green-700",
  },
  {
    step: 2,
    title: "Describe Your Question",
    description: "Tell us about your question or concern in your own words.",
    icon: <Search className="w-6 h-6" />,
    color: "bg-blue-100 text-blue-700",
  },
  {
    step: 3,
    title: "Receive AI Guidance",
    description: "Get structured, easy-to-understand AI-generated guidance tailored to your needs.",
    icon: <BookOpen className="w-6 h-6" />,
    color: "bg-orange-100 text-orange-700",
  },
  {
    step: 4,
    title: "Review Next Steps",
    description: "Review the recommended next step and take informed action.",
    icon: <CheckCircle className="w-6 h-6" />,
    color: "bg-green-100 text-green-700",
  },
];

interface LandingPageProps {
  onNavigate: (view: string) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <motion.div
      className="min-h-screen"
      initial="hidden"
      animate="visible"
      variants={stagger}
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-200/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 pt-16 pb-20 sm:pt-24 sm:pb-28">
          <motion.div variants={fadeUp} className="text-center">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Nigeria-first health & education support
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
              Smarter Health Guidance and Learning Support for Every Community
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-4 leading-relaxed">
              CommunityIQ AI provides accessible health education and personalized learning assistance for underserved African communities, beginning in Nigeria.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate("health")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg shadow-green-200 transition-all"
              >
                <Heart className="w-5 h-5" />
                Get Health Guidance
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate("learning")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg shadow-blue-200 transition-all"
              >
                <GraduationCap className="w-5 h-5" />
                Start Learning
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <motion.div variants={fadeUp} className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How CommunityIQ AI Helps You
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Three powerful tools designed to support your health and learning journey.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={fadeIn}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 200, damping: 15 } }}
              className={`group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg ${feature.border} ${feature.shadow} transition-all cursor-default`}
            >
              <div
                className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center ${feature.color} mb-5`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How CommunityIQ AI Works */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div variants={fadeUp} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How CommunityIQ AI Works
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Simple steps to get the guidance you need.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((item, i) => (
              <motion.div
                key={item.step}
                variants={fadeUp}
                className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center"
              >
                <div className="relative mb-5">
                  <div
                    className={`w-14 h-14 rounded-full ${item.color} flex items-center justify-center text-xl font-bold mx-auto`}
                  >
                    {item.icon}
                  </div>
                  {i < steps.length - 1 && (
                    <ChevronRight className="hidden md:block absolute top-4 -right-4 w-6 h-6 text-gray-300 z-10" />
                  )}
                </div>
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-500 text-sm font-bold mb-3">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Notice / Disclaimer */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <motion.div
          variants={fadeIn}
          className="border-2 border-amber-200 bg-amber-50 rounded-2xl p-6 sm:p-8 flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <TriangleAlert className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-amber-800 mb-2">
              Important Notice
            </h3>
            <p className="text-amber-700 leading-relaxed">
              CommunityIQ AI provides educational information only. It does not diagnose medical conditions, prescribe treatment or replace qualified professionals.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Safety & Value Section */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <motion.div variants={fadeUp} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 sm:p-12">
          <div className="flex items-start gap-4 mb-6">
            <Shield className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Responsible AI, Real Community Value
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                CommunityIQ AI is an educational tool designed to provide health guidance and learning support. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for medical concerns.
              </p>
              <p className="text-gray-500 leading-relaxed">
                Your data stays on your device. We do not collect, store, or share your personal information. Built for low-bandwidth environments, our app works offline so you can access support anytime, anywhere.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="bg-white/80 text-gray-600 text-sm px-4 py-2 rounded-full">
              100% offline capable
            </span>
            <span className="bg-white/80 text-gray-600 text-sm px-4 py-2 rounded-full">
              Low data usage
            </span>
            <span className="bg-white/80 text-gray-600 text-sm px-4 py-2 rounded-full">
              No account required
            </span>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="bg-green-600 py-16">
        <motion.div variants={fadeUp} className="text-center px-4">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-green-100 max-w-lg mx-auto mb-8 text-lg">
            Choose a tool below to begin learning and exploring.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate("health")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-green-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-50 transition-all"
            >
              <Heart className="w-5 h-5" />
              Get Health Guidance
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate("learning")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all"
            >
              <GraduationCap className="w-5 h-5" />
              Start Learning
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-8 text-center text-sm text-gray-400">
        <p className="mb-2">CommunityIQ AI provides educational information only. It does not diagnose medical conditions, prescribe treatment or replace qualified professionals.</p>
        <p>CommunityIQ AI &middot; Nigeria</p>
      </footer>
    </motion.div>
  );
}