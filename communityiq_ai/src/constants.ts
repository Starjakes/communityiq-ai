export const BRAND = {
  name: "CommunityIQ AI",
  tagline: "Smart Health & Learning Support for Nigerian Communities",
  email: "hello@communityiq.ng",
  website: "https://communityiq.ng",
};

export const FEATURES = [
  {
    title: "Community Health Assistant",
    description: "Get reliable health education guidance on malaria, hygiene, prenatal care, and nutrition. Designed with Nigerian healthcare context in mind.",
    icon: "Heart",
    color: "text-green-600",
  },
  {
    title: "Student Learning Tutor",
    description: "Interactive study support for Math, Science, and English. Quizzes, concept explainers, and grade-level adjustments.",
    icon: "GraduationCap",
    color: "text-blue-600",
  },
  {
    title: "Community Resources",
    description: "Emergency hotlines, public clinics, and learning modules. Save resources offline for when you need them most.",
    icon: "Users",
    color: "text-orange-500",
  },
];

export const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Choose Your Tool",
    description: "Select Health Assistant, Learning Tutor, or Resources from the menu.",
  },
  {
    step: 2,
    title: "Ask or Explore",
    description: "Type your question, take a quiz, or search for local resources.",
  },
  {
    step: 3,
    title: "Learn & Take Action",
    description: "Get clear, practical guidance you can use right away.",
  },
];

export const HEALTH_FAQ = [
  {
    id: "malaria",
    question: "What are the signs of malaria?",
    answer: "Common signs include fever, chills, headache, muscle aches, and fatigue. If you suspect malaria, visit a local clinic for a blood test. Early treatment is important. Always use mosquito nets and remove standing water around your home.",
  },
  {
    id: "hygiene",
    question: "How can I improve hygiene at home?",
    answer: "Wash your hands regularly with soap and clean water. Keep food covered. Use clean latrines or toilets. Boil drinking water if unsure of its source. Dispose of waste properly to prevent disease spread.",
  },
  {
    id: "prenatal",
    question: "What care is important during pregnancy?",
    answer: "Attend all antenatal clinic visits. Eat a balanced diet with fruits, vegetables, and protein. Take iron and folic acid as prescribed. Rest well and avoid heavy lifting. Visit a health worker if you notice unusual symptoms.",
  },
  {
    id: "nutrition",
    question: "How can I feed my family well on a budget?",
    answer: "Include locally available vegetables like ugu, spinach, and pumpkin leaves. Add proteins like beans, eggs, and fish. Use whole grains like brown rice, millet, and sorghum. Limit fried and sugary foods.",
  },
  {
    id: "ors",
    question: "How do I prepare ORS (Oral Rehydration Solution)?",
    answer: "ORS is a simple solution for dehydration. You can prepare it using a clean container, 1 liter of clean drinking water, 6 level teaspoons of sugar, and half a teaspoon of salt. Stir well and drink small amounts frequently. Visit the ORS Calculator below for step-by-step guidance.",
  },
];

export const SUBJECTS = [
  { id: "math", label: "Mathematics", color: "text-blue-600", bg: "bg-blue-100" },
  { id: "science", label: "Science", color: "text-green-600", bg: "bg-green-100" },
  { id: "english", label: "English", color: "text-orange-500", bg: "bg-orange-100" },
];

export const GRADE_LEVELS = [
  { value: "primary", label: "Primary School" },
  { value: "junior", label: "Junior Secondary" },
  { value: "senior", label: "Senior Secondary" },
];

export const TUTOR_RESPONSES: Record<string, Record<string, string[]>> = {
  math: {
    primary: [
      "Imagine you have 12 mangoes and you give 5 to your friend. How many do you have left? That's 12 - 5 = 7 mangoes!",
      "If you share 20 naira equally among 4 friends, each friend gets 20 ÷ 4 = 5 naira. Good job!",
      "A rectangle has 4 sides. The opposite sides are equal. If one side is 3 meters and the other is 5 meters, the perimeter is 3 + 5 + 3 + 5 = 16 meters.",
    ],
    junior: [
      "In a class of 40 students, 60% are girls. That means 40 × 0.6 = 24 girls and 16 boys. Percentages help us understand proportions!",
      "If a car travels 120 km in 2 hours, its speed is 120 ÷ 2 = 60 km/h. Always check your units.",
      "The area of a triangle is 1/2 × base × height. If base is 8 cm and height is 5 cm, area = 1/2 × 8 × 5 = 20 cm².",
    ],
    senior: [
      "A quadratic equation like x² - 5x + 6 = 0 can be solved by factoring: (x - 2)(x - 3) = 0, so x = 2 or x = 3.",
      "If you have 3 naira in a savings account earning 5% simple interest per year, after 2 years you earn 3 × 0.05 × 2 = 0.30 naira in interest.",
      "Probability: If you roll a fair die, the chance of getting an even number is 3/6 = 1/2. That's 50 percent!",
    ],
  },
  science: {
    primary: [
      "Water boils at 100°C. When it rains, water comes from clouds. The sun heats the ground, water evaporates, and forms clouds!",
      "Plants need sunlight, water, and soil to grow. A seed grows into a plant. Try planting a bean seed in a cup and watch it grow!",
      "The human body has 5 senses: sight, hearing, touch, taste, and smell. Your eyes help you see, ears help you hear!",
    ],
    junior: [
      "The digestive system breaks down food. It starts in the mouth, goes to the stomach, then the small intestine where nutrients are absorbed.",
      "Photosynthesis: plants use sunlight, water, and carbon dioxide to make their own food and release oxygen. That's why trees are important!",
      "Force = mass × acceleration. Pushing a lighter object requires less force than pushing a heavy one. This is Newton's Second Law.",
    ],
    senior: [
      "The human circulatory system: blood flows from the heart through arteries, delivers oxygen, and returns through veins. The heart pumps about 5 liters of blood per minute.",
      "Chemical bonding: Sodium (Na) gives one electron to Chlorine (Cl) to form NaCl (table salt). This is an ionic bond.",
      "Genetics: DNA contains genes that determine traits. If both parents carry a recessive gene, there is a 25% chance a child will express that trait.",
    ],
  },
  english: {
    primary: [
      "A noun is a naming word. 'The dog ran.' Dog is a noun. 'Lagos is a big city.' Lagos and city are nouns!",
      "Verbs are action words. Run, jump, eat, sleep, read are all verbs. 'She reads a book.' Reads is the verb.",
      "Adjectives describe nouns. 'The big red car.' Big and red are adjectives describing the car.",
    ],
    junior: [
      "A simple sentence has a subject and a verb. 'The teacher explained the lesson.' Subject: teacher, Verb: explained.",
      "Figures of speech: Simile compares using 'like' or 'as'. 'She is as brave as a lion.' Metaphor says one thing is another: 'Time is a thief.'",
      "Essay structure: Introduction (state your main idea), Body (explain with examples), Conclusion (summarize). Always plan before you write!",
    ],
    senior: [
      "In 'Things Fall Apart' by Chinua Achebe, Okonkwo's tragic flaw is his fear of weakness. The novel explores Igbo culture and colonial impact.",
      "Poetic devices: Alliteration (repetition of initial sounds) - 'Peter Piper picked.' Assonance (repetition of vowel sounds) - 'The rain in Spain.'",
      "Argumentative essays: State your position clearly, provide evidence, address counterarguments, and conclude strongly. Use formal language.",
    ],
  },
};

export const QUIZ_DATA: Record<string, { question: string; options: string[]; correct: number; explanation: string }[]> = {
  math: [
    {
      question: "What is 15 + 27?",
      options: ["32", "42", "52", "37"],
      correct: 1,
      explanation: "15 + 27 = 42. Add the tens: 10 + 20 = 30. Add the ones: 5 + 7 = 12. Total: 30 + 12 = 42.",
    },
    {
      question: "A bag of rice costs 4,500 naira. If you buy 3 bags, how much do you pay?",
      options: ["9,000 naira", "13,500 naira", "12,000 naira", "15,000 naira"],
      correct: 1,
      explanation: "4,500 × 3 = 13,500 naira. Multiply 45 × 3 = 135, then add three zeros: 13,500.",
    },
    {
      question: "What is the area of a rectangle with length 8 m and width 5 m?",
      options: ["13 m²", "40 m²", "26 m²", "45 m²"],
      correct: 1,
      explanation: "Area = length × width = 8 × 5 = 40 m².",
    },
  ],
  science: [
    {
      question: "What is the boiling point of water?",
      options: ["50°C", "100°C", "75°C", "120°C"],
      correct: 1,
      explanation: "Pure water boils at 100°C at sea level. At higher altitudes, it boils at a slightly lower temperature.",
    },
    {
      question: "Which organ pumps blood throughout the body?",
      options: ["Lungs", "Brain", "Heart", "Liver"],
      correct: 2,
      explanation: "The heart is a muscular organ that pumps blood through the circulatory system, delivering oxygen and nutrients to all parts of the body.",
    },
    {
      question: "What gas do plants absorb from the air?",
      options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
      correct: 2,
      explanation: "Plants absorb carbon dioxide from the air during photosynthesis and release oxygen as a byproduct.",
    },
  ],
  english: [
    {
      question: "Which of the following is a complete sentence?",
      options: ["Running fast", "The boy ran fast", "Fast running", "Running the boy"],
      correct: 1,
      explanation: "A complete sentence needs a subject and a verb. 'The boy ran fast' has a subject (the boy) and a verb (ran).",
    },
    {
      question: "What is the past tense of 'go'?",
      options: ["Goed", "Going", "Went", "Gone"],
      correct: 2,
      explanation: "'Go' is an irregular verb. Its past tense is 'went'. 'Gone' is the past participle (e.g., 'has gone').",
    },
    {
      question: "Identify the adjective in: 'The beautiful flowers bloomed in the garden.'",
      options: ["Flowers", "Bloomed", "Beautiful", "Garden"],
      correct: 2,
      explanation: "'Beautiful' is an adjective because it describes the noun 'flowers'.",
    },
  ],
};

export const LOCAL_EXPLAINERS = [
  {
    subject: "Physics",
    topic: "Friction",
    context: "Walking on a muddy road after rain",
    explanation: "When you walk on a muddy road, your feet slip. That's because there is less friction between your shoes and the mud. Friction is the force that resists motion between two surfaces. On dry ground, friction is high so you walk easily. On mud or wet surfaces, friction is low. In the same way, a car driving on a dusty road in northern Nigeria needs more distance to stop because of lower friction.",
  },
  {
    subject: "Mathematics",
    topic: "Simple Interest",
    context: "Saving money in a cooperative society",
    explanation: "If you save 10,000 naira in a cooperative society that pays 5% interest per year, after one year you earn 10,000 × 0.05 = 500 naira. After two years, you earn 500 + 500 = 1,000 naira. Simple interest is the same amount every year. The formula is: Interest = Principal × Rate × Time.",
  },
  {
    subject: "Biology",
    topic: "Nutrition",
    context: "Local Nigerian foods",
    explanation: "A balanced meal includes foods from different groups. Carbohydrates from garri, yam, or rice give you energy. Proteins from beans, fish, eggs, or meat help build your body. Vitamins from fruits like oranges, mangoes, and vegetables like ugu and spinach keep you healthy. Oils from palm oil or groundnut oil provide energy too, but use them in moderation.",
  },
  {
    subject: "Chemistry",
    topic: "Mixtures and Separation",
    context: "Preparing kunu (local drink)",
    explanation: "Kunu is made by mixing ground millet or sorghum with water, then straining. The straining process is called filtration. The solid particles stay in the cloth while the liquid passes through. This is similar to how we separate sand from water using a filter. In chemistry, filtration is a method to separate solid from liquid mixtures.",
  },
];

export const EMERGENCY_HOTLINES = [
  { name: "National Emergency (NEMA)", number: "112", type: "Emergency" },
  { name: "Lagos State Emergency", number: "767", type: "Emergency" },
  { name: "Nigerian Police", number: "199", type: "Emergency" },
  { name: "Fire Service", number: "112", type: "Emergency" },
  { name: "Federal Road Safety Corps (FRSC)", number: "122", type: "Road Safety" },
  { name: "NCDC (Disease Control)", number: "6232", type: "Health" },
  { name: "Child Helpline", number: "0800-800-8000", type: "Social" },
  { name: "Gender-Based Violence Hotline", number: "0800-333-3333", type: "Social" },
];

export const CLINICS = [
  { name: "Lagos University Teaching Hospital", location: "Idi-Araba, Lagos", services: "General, Emergency, Maternity", phone: "01-295-2130" },
  { name: "Aminu Kano Teaching Hospital", location: "Kano", services: "General, Pediatrics, Surgery", phone: "064-666-881" },
  { name: "University College Hospital", location: "Ibadan, Oyo", services: "General, Emergency, Research", phone: "02-241-1768" },
  { name: "Abuja National Hospital", location: "Garki, Abuja", services: "General, Cardiology, Emergency", phone: "09-523-6981" },
  { name: "Port Harcourt Teaching Hospital", location: "Port Harcourt, Rivers", services: "General, Maternity, Surgery", phone: "084-234-5678" },
  { name: "Enugu State University Teaching Hospital", location: "Enugu", services: "General, Pediatrics, Emergency", phone: "042-256-789" },
  { name: "Maitama District Hospital", location: "Maitama, Abuja", services: "General, Outpatient, Maternity", phone: "09-291-0000" },
  { name: "General Hospital Ikeja", location: "Ikeja, Lagos", services: "General, Emergency, Pharmacy", phone: "01-496-2000" },
];

export const LEARNING_MODULES = [
  { title: "Primary Math Basics", provider: "CommunityIQ", type: "Interactive", url: "#", offline: true },
  { title: "Science for Everyday Life", provider: "CommunityIQ", type: "Video", url: "#", offline: true },
  { title: "English Grammar Simplified", provider: "CommunityIQ", type: "Reading", url: "#", offline: true },
  { title: "Health & Hygiene for Kids", provider: "CommunityIQ", type: "Interactive", url: "#", offline: true },
  { title: "Understanding Malaria Prevention", provider: "WHO Africa", type: "PDF", url: "#", offline: true },
  { title: "Financial Literacy for Teens", provider: "CommunityIQ", type: "Interactive", url: "#", offline: true },
];

export const ORS_STEPS = [
  { step: 1, instruction: "Clean your hands and all equipment with soap and clean water." },
  { step: 2, instruction: "Boil 1 liter of clean drinking water and let it cool." },
  { step: 3, instruction: "Add 6 level teaspoons of sugar (about 20 grams)." },
  { step: 4, instruction: "Add half a level teaspoon of salt (about 3 grams)." },
  { step: 5, instruction: "Stir the mixture until the sugar and salt are fully dissolved." },
  { step: 6, instruction: "Taste the solution. It should be like tears or coconut water, not saltier." },
  { step: 7, instruction: "Drink small amounts frequently. Use within 24 hours or make a fresh batch." },
];