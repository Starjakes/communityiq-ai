import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  MapPin,
  Search,
  Bookmark,
  BookmarkCheck,
  BookmarkMinus,
  ArrowLeft,
  ExternalLink,
  Globe,
  FileText,
  Download,
  Shield,
  Info,
  Users,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";
import {
  EMERGENCY_HOTLINES,
  CLINICS,
  LEARNING_MODULES,
  BRAND,
} from "../constants";

interface ResourcesAndAboutProps {
  onNavigate: (view: string) => void;
}

export default function ResourcesAndAbout({ onNavigate }: ResourcesAndAboutProps) {
  const [activeTab, setActiveTab] = useState<"resources" | "about">("resources");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedBookmarks, setSavedBookmarks] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem("communityiq_bookmarks");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [resourceFilter, setResourceFilter] = useState<"all" | "hotlines" | "clinics" | "modules">("all");

  useEffect(() => {
    try {
      localStorage.setItem("communityiq_bookmarks", JSON.stringify(savedBookmarks));
    } catch {
      // localStorage may be unavailable
    }
  }, [savedBookmarks]);

  const toggleBookmark = (id: string) => {
    setSavedBookmarks((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const filteredHotlines = useMemo(
    () =>
      EMERGENCY_HOTLINES.filter(
        (h) =>
          h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          h.number.includes(searchQuery) ||
          h.type.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery]
  );

  const filteredClinics = useMemo(
    () =>
      CLINICS.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.services.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery]
  );

  const filteredModules = useMemo(
    () =>
      LEARNING_MODULES.filter(
        (m) =>
          m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.provider.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery]
  );

  return (
    <motion.div
      className="min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate("home")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-500" />
                <h1 className="text-lg font-bold text-gray-900">Resources & About</h1>
              </div>
              <p className="text-xs text-gray-400">Community directory and safety info</p>
            </div>
          </div>
        </div>
      </header>

      {/* Tab bar */}
      <div className="bg-white border-b border-gray-100 px-4">
        <div className="max-w-3xl mx-auto flex gap-4">
          <button
            onClick={() => setActiveTab("resources")}
            className={`pb-3 pt-2 text-sm font-medium border-b-2 transition-all ${
              activeTab === "resources"
                ? "border-orange-500 text-orange-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <span className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Resources
            </span>
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`pb-3 pt-2 text-sm font-medium border-b-2 transition-all ${
              activeTab === "about"
                ? "border-orange-500 text-orange-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              About & Safety
            </span>
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {activeTab === "resources" ? (
            <motion.div
              key="resources"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {/* Search & Filter */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="relative mb-4">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search hotlines, clinics, or modules..."
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:border-orange-300 focus:ring-1 focus:ring-orange-300 transition-all"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {[
                    { id: "all" as const, label: "All" },
                    { id: "hotlines" as const, label: "Hotlines" },
                    { id: "clinics" as const, label: "Clinics" },
                    { id: "modules" as const, label: "Learning" },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setResourceFilter(f.id)}
                      className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                        resourceFilter === f.id
                          ? "bg-orange-100 text-orange-700"
                          : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bookmarked items */}
              {savedBookmarks.length > 0 && (
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <BookmarkCheck className="w-4 h-4 text-green-600" />
                    <h3 className="text-sm font-semibold text-gray-700">
                      Saved Offline ({savedBookmarks.length})
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {savedBookmarks.map((id) => (
                      <span
                        key={id}
                        className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs px-3 py-1.5 rounded-full"
                      >
                        {id}
                        <button
                          onClick={() => toggleBookmark(id)}
                          className="ml-1 hover:text-red-500 transition-all"
                        >
                          <BookmarkMinus className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Emergency Hotlines */}
              {(resourceFilter === "all" || resourceFilter === "hotlines") && (
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                    Emergency Hotlines
                  </h3>
                  <div className="space-y-2">
                    {filteredHotlines.length === 0 ? (
                      <p className="text-sm text-gray-400 text-center py-4">No hotlines found.</p>
                    ) : (
                      filteredHotlines.map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.03 }}
                          className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-orange-50 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                              <Phone className="w-4 h-4 text-red-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{h.name}</p>
                              <p className="text-xs text-gray-400">{h.type}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-gray-900">{h.number}</span>
                            <button
                              onClick={() => toggleBookmark(`hotline-${h.name}`)}
                              className={`p-1.5 rounded-lg transition-all ${
                                savedBookmarks.includes(`hotline-${h.name}`)
                                  ? "text-green-600 bg-green-50"
                                  : "text-gray-300 hover:text-gray-500"
                              }`}
                            >
                              {savedBookmarks.includes(`hotline-${h.name}`) ? (
                                <BookmarkCheck className="w-4 h-4" />
                              ) : (
                                <Bookmark className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Clinics */}
              {(resourceFilter === "all" || resourceFilter === "clinics") && (
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                    Public Clinics
                  </h3>
                  <div className="space-y-2">
                    {filteredClinics.length === 0 ? (
                      <p className="text-sm text-gray-400 text-center py-4">No clinics found.</p>
                    ) : (
                      filteredClinics.map((c, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.03 }}
                          className="p-3 rounded-xl bg-gray-50 hover:bg-blue-50 transition-all"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <MapPin className="w-4 h-4 text-blue-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{c.name}</p>
                                <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                  <MapPin className="w-3 h-3" />
                                  {c.location}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">{c.services}</p>
                                <p className="text-xs text-gray-400 mt-0.5">{c.phone}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => toggleBookmark(`clinic-${c.name}`)}
                              className={`p-1.5 rounded-lg transition-all flex-shrink-0 ${
                                savedBookmarks.includes(`clinic-${c.name}`)
                                  ? "text-green-600 bg-green-50"
                                  : "text-gray-300 hover:text-gray-500"
                              }`}
                            >
                              {savedBookmarks.includes(`clinic-${c.name}`) ? (
                                <BookmarkCheck className="w-4 h-4" />
                              ) : (
                                <Bookmark className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Learning Modules */}
              {(resourceFilter === "all" || resourceFilter === "modules") && (
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                    Learning Modules
                  </h3>
                  <div className="space-y-2">
                    {filteredModules.length === 0 ? (
                      <p className="text-sm text-gray-400 text-center py-4">No modules found.</p>
                    ) : (
                      filteredModules.map((m, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.03 }}
                          className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-purple-50 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                              <FileText className="w-4 h-4 text-purple-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{m.title}</p>
                              <p className="text-xs text-gray-400">
                                {m.provider} &middot; {m.type}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Download className="w-3 h-3" />
                              {m.offline ? "Offline" : "Online"}
                            </span>
                            <button
                              onClick={() => toggleBookmark(`module-${m.title}`)}
                              className={`p-1.5 rounded-lg transition-all ${
                                savedBookmarks.includes(`module-${m.title}`)
                                  ? "text-green-600 bg-green-50"
                                  : "text-gray-300 hover:text-gray-500"
                              }`}
                            >
                              {savedBookmarks.includes(`module-${m.title}`) ? (
                                <BookmarkCheck className="w-4 h-4" />
                              ) : (
                                <Bookmark className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="about"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* About Section */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <Info className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">
                    About {BRAND.name}
                  </h2>
                </div>
                <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                  <p>
                    CommunityIQ AI is an educational tool designed to provide accessible health guidance and learning support for Nigerian communities. Our mission is to bridge the gap between underserved communities and reliable, practical information.
                  </p>
                  <p>
                    We focus on Nigeria-first content that respects local contexts, languages, and challenges. All features are designed to work offline and on low-bandwidth connections.
                  </p>
                </div>
              </div>

              {/* AI Principles */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="w-6 h-6 text-purple-600" />
                  <h2 className="text-xl font-bold text-gray-900">
                    AI Principles
                  </h2>
                </div>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                    <p><strong>Educational only.</strong> Our AI provides general information and learning support. It does not offer medical diagnoses or professional advice.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                    <p><strong>Transparent.</strong> We clearly label AI-generated content and explain how our tools work.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                    <p><strong>Inclusive.</strong> Our content is designed for diverse Nigerian communities, with local examples and contexts.</p>
                  </div>
                </div>
              </div>

              {/* Privacy & Data */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                  <h2 className="text-xl font-bold text-gray-900">
                    Privacy & Data Safety
                  </h2>
                </div>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <p className="flex items-center gap-2 text-green-800 font-medium mb-2">
                      <Download className="w-4 h-4" />
                      100% On-Device Processing
                    </p>
                    <p className="text-green-700">
                      Your data never leaves your device. All information, bookmarks, and chat history are stored locally in your browser. No accounts, no tracking, no data collection.
                    </p>
                  </div>
                  <p className="text-gray-500 mt-3">
                    Bookmarks are saved in your browser's local storage and can be cleared at any time. We do not use cookies, analytics, or third-party trackers.
                  </p>
                </div>
              </div>

              {/* Medical Disclaimer */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-amber-600" />
                  <h2 className="text-xl font-bold text-gray-900">
                    Medical Disclaimer
                  </h2>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                  <p className="mb-3">
                    CommunityIQ AI provides general health education information only. It is not a medical device, does not provide diagnoses, and does not replace professional medical advice.
                  </p>
                  <p className="mb-3">
                    If you have a medical emergency, call NEMA at <strong>112</strong> or visit your nearest hospital immediately.
                  </p>
                  <p>
                    Always consult a qualified healthcare professional for any health concerns or before making any decisions about your health.
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="w-6 h-6 text-gray-600" />
                  <h2 className="text-xl font-bold text-gray-900">
                    Contact
                  </h2>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Questions or feedback? Reach out to us.
                </p>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  {BRAND.email}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function Brain({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 4a4 4 0 0 1 3.5 2.1 6 6 0 0 1 4.5 5.9 4 4 0 0 1-2 7.5 4 4 0 0 1-6 0 4 4 0 0 1-2-7.5 6 6 0 0 1 4.5-5.9A4 4 0 0 1 12 4Z" />
      <path d="M9 12h6" />
      <path d="M12 9v6" />
    </svg>
  );
}