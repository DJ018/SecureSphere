const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(__dirname)); // Serve static files from current directory

// CORS headers for API requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

/* ===== LAB APIs ===== */

// SQL Injection Lab
app.post("/api/sql", (req, res) => {
  const input = req.body.payload || "";
  if (input.includes("' OR 1=1")) {
    res.json({ result: "❌ Vulnerable Query Detected! SQL Injection possible." });
  } else {
    res.json({ result: "✅ Safe Query. No injection detected." });
  }
});

// Phishing Lab
app.post("/api/phish", (req, res) => {
  const answer = req.body.answer;
  if (answer === "phish") {
    res.json({ result: "✅ Correct! This is a phishing attempt." });
  } else {
    res.json({ result: "❌ Wrong. This email shows phishing signs." });
  }
});

// Password Lab
app.post("/api/password", (req, res) => {
  const pwd = req.body.password || "";
  let strength = "Weak ❌";
  if (pwd.length > 8 && /[A-Z]/.test(pwd) && /\d/.test(pwd)) {
    strength = "Strong ✅";
  }
  res.json({ result: `Password Strength: ${strength}` });
});

// Network Scan Lab
app.get("/api/network", (req, res) => {
  res.json({
    result: "Open Ports Found: 22 (SSH), 80 (HTTP). Reconnaissance phase complete."
  });
});

// IAM Lab
app.post("/api/iam", (req, res) => {
  const role = req.body.role;
  if (role === "admin") {
    res.json({ result: "✅ Access Granted" });
  } else {
    res.json({ result: "❌ Access Denied" });
  }
});

// Malware Lab
app.post("/api/malware", (req, res) => {
  const behavior = req.body.behavior;
  if (behavior.includes("encrypt files")) {
    res.json({ result: "⚠️ Ransomware behavior detected!" });
  } else {
    res.json({ result: "✅ No malicious behavior detected." });
  }
});

/* ===== LEARNING MODULE APIs ===== */

// In-memory storage for user progress (in production, use a database)
const userProgress = {};

// Get module content
app.get("/api/learn/module/:moduleId", (req, res) => {
  const moduleId = req.params.moduleId;

  const modules = {
    "basics": {
      title: "Cyber Security Basics",
      level: "Beginner",
      duration: "30 mins",
      content: [
        {
          type: "text",
          heading: "What is Cyber Security?",
          text: "Cyber security is the practice of protecting systems, networks, and programs from digital attacks. These attacks are usually aimed at accessing, changing, or destroying sensitive information, extorting money from users, or interrupting normal business processes."
        },
        {
          type: "text",
          heading: "Why Does It Matter?",
          text: "In today's digital age, cyber attacks can result in financial losses, data breaches, reputation damage, and legal consequences. Organizations and individuals must implement strong security measures to protect their digital assets."
        },
        {
          type: "list",
          heading: "Key Principles of Cyber Security",
          items: [
            "Confidentiality - Ensuring information is accessible only to authorized users",
            "Integrity - Maintaining accuracy and completeness of data",
            "Availability - Ensuring authorized users have access when needed"
          ]
        }
      ]
    },
    "attacks": {
      title: "Cyber Attacks & Threats",
      level: "Beginner - Intermediate",
      duration: "45 mins",
      content: [
        {
          type: "text",
          heading: "Common Cyber Attacks",
          text: "Understanding different types of cyber attacks is crucial for defense. Attackers use various techniques to exploit vulnerabilities in systems and human behavior."
        },
        {
          type: "list",
          heading: "Types of Attacks",
          items: [
            "Phishing - Fraudulent emails designed to steal credentials",
            "Malware - Malicious software including viruses, trojans, and ransomware",
            "DDoS - Overwhelming systems with traffic to cause disruption",
            "Social Engineering - Manipulating people to divulge confidential information"
          ]
        }
      ]
    },
    "iam": {
      title: "Identity & Access Management",
      level: "Intermediate",
      duration: "40 mins",
      content: [
        {
          type: "text",
          heading: "What is IAM?",
          text: "Identity and Access Management (IAM) is a framework of policies and technologies ensuring that the right users have appropriate access to technology resources."
        },
        {
          type: "list",
          heading: "Core IAM Concepts",
          items: [
            "Authentication - Verifying user identity (who you are)",
            "Authorization - Determining access rights (what you can do)",
            "RBAC - Role-Based Access Control for managing permissions",
            "Principle of Least Privilege - Users get minimum access needed"
          ]
        }
      ]
    },
    "webapp": {
      title: "Web Application Security",
      level: "Intermediate",
      duration: "50 mins",
      content: [
        {
          type: "text",
          heading: "Web Application Vulnerabilities",
          text: "Web applications are frequent targets for attackers. Understanding common vulnerabilities helps developers build more secure applications."
        },
        {
          type: "list",
          heading: "OWASP Top 10 Vulnerabilities",
          items: [
            "SQL Injection - Inserting malicious SQL code into queries",
            "Cross-Site Scripting (XSS) - Injecting malicious scripts",
            "Broken Authentication - Weak session management",
            "Security Misconfiguration - Improper security settings"
          ]
        }
      ]
    },
    "encryption": {
      title: "Data Protection & Encryption",
      level: "Intermediate",
      duration: "45 mins",
      content: [
        {
          type: "text",
          heading: "Protecting Data",
          text: "Encryption is the process of encoding information so that only authorized parties can access it. It's essential for protecting sensitive data both in transit and at rest."
        },
        {
          type: "list",
          heading: "Encryption Methods",
          items: [
            "Symmetric Encryption - Same key for encryption and decryption (AES)",
            "Asymmetric Encryption - Public/private key pairs (RSA)",
            "Hashing - One-way transformation for password storage (SHA-256)",
            "TLS/SSL - Securing data in transit over networks"
          ]
        }
      ]
    },
    "awareness": {
      title: "Cyber Awareness & Best Practices",
      level: "All Levels",
      duration: "35 mins",
      content: [
        {
          type: "text",
          heading: "Building Security Awareness",
          text: "Human error is one of the biggest security risks. Following best practices and maintaining awareness can prevent most common attacks."
        },
        {
          type: "list",
          heading: "Security Best Practices",
          items: [
            "Use strong, unique passwords for each account",
            "Enable multi-factor authentication (MFA) wherever possible",
            "Keep software and systems updated regularly",
            "Be cautious of suspicious emails and links",
            "Regular backups of important data"
          ]
        }
      ]
    }
  };

  if (modules[moduleId]) {
    res.json(modules[moduleId]);
  } else {
    res.status(404).json({ error: "Module not found" });
  }
});

// Submit quiz answers
app.post("/api/learn/quiz", (req, res) => {
  const { moduleId, answers } = req.body;

  const quizzes = {
    "basics": [
      { question: "What are the three core principles of cyber security?", correct: "CIA" },
      { question: "What does confidentiality ensure?", correct: "authorized" }
    ],
    "attacks": [
      { question: "What type of attack uses fraudulent emails?", correct: "phishing" },
      { question: "What does DDoS stand for?", correct: "distributed" }
    ],
    "iam": [
      { question: "What does IAM stand for?", correct: "identity" },
      { question: "What principle gives minimum access?", correct: "least" }
    ],
    "webapp": [
      { question: "What vulnerability involves malicious SQL?", correct: "injection" },
      { question: "What does XSS stand for?", correct: "cross" }
    ],
    "encryption": [
      { question: "What encryption uses the same key?", correct: "symmetric" },
      { question: "What is a one-way transformation?", correct: "hashing" }
    ],
    "awareness": [
      { question: "What should you enable for extra security?", correct: "mfa" },
      { question: "What is the biggest security risk?", correct: "human" }
    ]
  };

  const quiz = quizzes[moduleId] || [];
  let score = 0;
  const total = quiz.length;

  answers.forEach((answer, index) => {
    if (quiz[index] && answer.toLowerCase().includes(quiz[index].correct.toLowerCase())) {
      score++;
    }
  });

  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const passed = percentage >= 70;

  res.json({
    score,
    total,
    percentage,
    passed,
    message: passed ? "🎉 Congratulations! You passed!" : "📚 Keep learning! Try again to pass."
  });
});

// Track progress
app.post("/api/learn/progress", (req, res) => {
  const { userId, moduleId, completed } = req.body;

  if (!userProgress[userId]) {
    userProgress[userId] = {};
  }

  userProgress[userId][moduleId] = {
    completed,
    timestamp: new Date().toISOString()
  };

  res.json({ success: true, message: "Progress saved!" });
});

// Get user progress
app.get("/api/learn/progress/:userId", (req, res) => {
  const userId = req.params.userId;
  const progress = userProgress[userId] || {};

  res.json(progress);
});

// Generate certificate
app.post("/api/learn/certificate", (req, res) => {
  const { name, moduleTitle, date } = req.body;

  res.json({
    success: true,
    certificate: {
      name,
      moduleTitle,
      date: date || new Date().toLocaleDateString(),
      certificateId: `CERT-${Date.now()}`,
      message: "Certificate generated successfully!"
    }
  });
});

/* ===== SERVICES APIs ===== */

// In-memory storage for service requests
const serviceRequests = [];
const contactSubmissions = [];

// Get all services with details
app.get("/api/services", (req, res) => {
  const services = [
    {
      id: "security-audit",
      name: "Security Audit",
      icon: "🔍",
      description: "In-depth analysis of applications and systems to detect vulnerabilities and security misconfigurations.",
      features: [
        "Comprehensive vulnerability scanning",
        "Configuration review",
        "Security best practices assessment",
        "Detailed report with recommendations"
      ],
      pricing: {
        basic: 500,
        standard: 1000,
        premium: 2000
      },
      duration: "1-2 weeks"
    },
    {
      id: "penetration-testing",
      name: "Penetration Testing",
      icon: "🛡️",
      description: "Ethical hacking simulations that test real-world attack scenarios and defense readiness.",
      features: [
        "Network penetration testing",
        "Web application testing",
        "Social engineering assessment",
        "Executive summary and technical report"
      ],
      pricing: {
        basic: 1500,
        standard: 3000,
        premium: 5000
      },
      duration: "2-4 weeks"
    },
    {
      id: "risk-assessment",
      name: "Risk Assessment",
      icon: "📊",
      description: "Identification, evaluation, and prioritization of cyber risks with mitigation strategies.",
      features: [
        "Asset identification",
        "Threat modeling",
        "Risk prioritization matrix",
        "Mitigation roadmap"
      ],
      pricing: {
        basic: 800,
        standard: 1500,
        premium: 3000
      },
      duration: "1-3 weeks"
    },
    {
      id: "security-awareness",
      name: "Security Awareness Training",
      icon: "📚",
      description: "Training on phishing, malware, password hygiene, and social engineering attacks.",
      features: [
        "Interactive training modules",
        "Phishing simulation campaigns",
        "Security awareness materials",
        "Progress tracking and reporting"
      ],
      pricing: {
        basic: 300,
        standard: 600,
        premium: 1200
      },
      duration: "Ongoing"
    },
    {
      id: "cyber-consulting",
      name: "Cyber Consulting",
      icon: "🧠",
      description: "Professional guidance for startups and individuals on building secure digital systems.",
      features: [
        "Security architecture review",
        "Compliance guidance",
        "Incident response planning",
        "Ongoing advisory support"
      ],
      pricing: {
        basic: 1000,
        standard: 2500,
        premium: 5000
      },
      duration: "Flexible"
    },
    {
      id: "compliance-support",
      name: "Compliance Support",
      icon: "⚙️",
      description: "Assistance with security best practices and compliance frameworks like ISO 27001.",
      features: [
        "Gap analysis",
        "Policy development",
        "Audit preparation",
        "Certification support"
      ],
      pricing: {
        basic: 1200,
        standard: 2500,
        premium: 5000
      },
      duration: "3-6 months"
    }
  ];

  res.json(services);
});

// Submit service request
app.post("/api/services/request", (req, res) => {
  const { serviceId, name, email, company, package, message } = req.body;

  if (!serviceId || !name || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const request = {
    id: `REQ-${Date.now()}`,
    serviceId,
    name,
    email,
    company: company || "N/A",
    package: package || "standard",
    message: message || "",
    timestamp: new Date().toISOString(),
    status: "pending"
  };

  serviceRequests.push(request);

  res.json({
    success: true,
    message: "Service request submitted successfully!",
    requestId: request.id,
    estimatedResponse: "24-48 hours"
  });
});

// Submit contact form
app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const submission = {
    id: `CONTACT-${Date.now()}`,
    name,
    email,
    subject: subject || "General Inquiry",
    message,
    timestamp: new Date().toISOString()
  };

  contactSubmissions.push(submission);

  res.json({
    success: true,
    message: "Thank you for contacting us! We'll get back to you soon.",
    ticketId: submission.id
  });
});

// Calculate service pricing
app.post("/api/services/calculate-price", (req, res) => {
  const { serviceId, package, addons } = req.body;

  const servicePricing = {
    "security-audit": { basic: 500, standard: 1000, premium: 2000 },
    "penetration-testing": { basic: 1500, standard: 3000, premium: 5000 },
    "risk-assessment": { basic: 800, standard: 1500, premium: 3000 },
    "security-awareness": { basic: 300, standard: 600, premium: 1200 },
    "cyber-consulting": { basic: 1000, standard: 2500, premium: 5000 },
    "compliance-support": { basic: 1200, standard: 2500, premium: 5000 }
  };

  const addonPricing = {
    "priority-support": 200,
    "extended-warranty": 300,
    "training-materials": 150,
    "ongoing-monitoring": 500
  };

  let basePrice = servicePricing[serviceId]?.[package] || 0;
  let addonTotal = 0;

  if (addons && Array.isArray(addons)) {
    addons.forEach(addon => {
      addonTotal += addonPricing[addon] || 0;
    });
  }

  const total = basePrice + addonTotal;
  const discount = package === "premium" ? 0.1 : 0;
  const finalPrice = total * (1 - discount);

  res.json({
    basePrice,
    addonTotal,
    discount: discount * 100,
    total: finalPrice,
    currency: "USD"
  });
});

// Portfolio contact form
app.post("/api/portfolio-contact", (req, res) => {
  const { name, email, projectType, message, source } = req.body;

  if (!name || !email || !projectType || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  const submission = {
    id: `PORTFOLIO-${Date.now()}`,
    name,
    email,
    projectType,
    message,
    source: source || "portfolio",
    timestamp: new Date().toISOString(),
    status: "new"
  };

  contactSubmissions.push(submission);

  console.log(`📬 New portfolio inquiry from ${name} (${email}) - Project: ${projectType}`);

  res.json({
    success: true,
    message: "Thank you for your inquiry! We'll be in touch soon.",
    ticketId: submission.id,
    estimatedResponse: "Within 24 hours"
  });
});

// Get testimonials
app.get("/api/testimonials", (req, res) => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      company: "TechStart Inc.",
      role: "CTO",
      rating: 5,
      text: "SecureSphere's penetration testing service helped us identify critical vulnerabilities before launch. Highly professional team!",
      service: "Penetration Testing",
      date: "2025-12-15"
    },
    {
      id: 2,
      name: "Michael Chen",
      company: "DataFlow Solutions",
      role: "Security Manager",
      rating: 5,
      text: "The security audit was thorough and the recommendations were actionable. Our security posture improved significantly.",
      service: "Security Audit",
      date: "2025-11-20"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      company: "CloudVentures",
      role: "CEO",
      rating: 5,
      text: "Excellent compliance support! They guided us through ISO 27001 certification smoothly.",
      service: "Compliance Support",
      date: "2025-10-10"
    },
    {
      id: 4,
      name: "David Park",
      company: "FinSecure",
      role: "IT Director",
      rating: 4,
      text: "Great security awareness training. Our employees are now much more vigilant about phishing attempts.",
      service: "Security Awareness Training",
      date: "2026-01-05"
    }
  ];

  res.json(testimonials);
});

/* ===== GAME APIs ===== */

// In-memory storage for leaderboard
let leaderboard = [];

// Cybersecurity question bank
const questionBank = {
  quiz: [
    {
      question: "What does 'phishing' refer to in cybersecurity?",
      options: ["A type of firewall", "Fraudulent attempt to obtain sensitive information", "A network protocol", "An encryption method"],
      correct: 1,
      explanation: "Phishing is a fraudulent attempt to obtain sensitive information such as usernames, passwords, and credit card details by disguising as a trustworthy entity in electronic communication."
    },
    {
      question: "What is the primary purpose of two-factor authentication (2FA)?",
      options: ["Speed up login process", "Add an extra layer of security", "Reduce password complexity", "Encrypt data"],
      correct: 1,
      explanation: "Two-factor authentication adds an extra layer of security by requiring not just a password, but also something that only the user has access to (like a phone or security token)."
    },
    {
      question: "Which of the following is considered a strong password?",
      options: ["password123", "P@ssw0rd!2024#Secure", "12345678", "admin"],
      correct: 1,
      explanation: "A strong password should be at least 12 characters long and include uppercase letters, lowercase letters, numbers, and special characters."
    },
    {
      question: "What does HTTPS stand for?",
      options: ["Hyper Text Transfer Protocol Secure", "High Transfer Protocol System", "Hyper Transfer Protocol Standard", "High Text Protocol Secure"],
      correct: 0,
      explanation: "HTTPS stands for Hyper Text Transfer Protocol Secure. It's the secure version of HTTP, using encryption to protect data in transit."
    },
    {
      question: "What is malware?",
      options: ["A type of hardware", "Malicious software designed to harm systems", "A security protocol", "A firewall setting"],
      correct: 1,
      explanation: "Malware is malicious software designed to damage, disrupt, or gain unauthorized access to computer systems."
    },
    {
      question: "What is the purpose of a firewall?",
      options: ["Speed up internet", "Monitor and control network traffic", "Store passwords", "Encrypt files"],
      correct: 1,
      explanation: "A firewall monitors and controls incoming and outgoing network traffic based on predetermined security rules, acting as a barrier between trusted and untrusted networks."
    },
    {
      question: "What does VPN stand for?",
      options: ["Virtual Private Network", "Very Private Network", "Verified Protocol Network", "Virtual Protection Node"],
      correct: 0,
      explanation: "VPN stands for Virtual Private Network. It creates a secure, encrypted connection over a less secure network, such as the internet."
    },
    {
      question: "What is social engineering in cybersecurity?",
      options: ["Building social networks", "Manipulating people to divulge confidential information", "Engineering social media apps", "Creating user profiles"],
      correct: 1,
      explanation: "Social engineering is the psychological manipulation of people into performing actions or divulging confidential information."
    },
    {
      question: "What is ransomware?",
      options: ["Free software", "Malware that encrypts files and demands payment", "A type of antivirus", "A backup system"],
      correct: 1,
      explanation: "Ransomware is a type of malware that encrypts a victim's files and demands payment (ransom) to restore access."
    },
    {
      question: "Why should you avoid using public WiFi for sensitive transactions?",
      options: ["It's too slow", "It's unencrypted and can be intercepted", "It's illegal", "It costs money"],
      correct: 1,
      explanation: "Public WiFi networks are often unencrypted, making it easy for attackers to intercept data transmitted over the network, including sensitive information."
    },
    {
      question: "What is the principle of 'least privilege'?",
      options: ["Give everyone admin access", "Users get only the minimum access needed", "Restrict all access", "Share passwords freely"],
      correct: 1,
      explanation: "The principle of least privilege means giving users only the minimum levels of access needed to perform their job functions."
    },
    {
      question: "What is a DDoS attack?",
      options: ["Data Download Service", "Distributed Denial of Service", "Direct Data Storage", "Digital Defense System"],
      correct: 1,
      explanation: "A DDoS (Distributed Denial of Service) attack attempts to overwhelm a system with traffic from multiple sources, making it unavailable to legitimate users."
    }
  ],
  scenario: [
    {
      question: "You receive an email from your 'bank' asking you to verify your account by clicking a link. What should you do?",
      options: ["Click the link immediately", "Delete the email and contact your bank directly", "Reply with your account details", "Forward it to friends"],
      correct: 1,
      explanation: "Never click links in unsolicited emails. Always contact your bank directly through official channels to verify any requests."
    },
    {
      question: "You find a USB drive in the parking lot. What's the safest action?",
      options: ["Plug it into your work computer to find the owner", "Take it to IT/security department", "Throw it away", "Keep it for personal use"],
      correct: 1,
      explanation: "Unknown USB drives can contain malware. Always report found devices to your IT or security department."
    },
    {
      question: "Someone calls claiming to be from IT support and asks for your password. What do you do?",
      options: ["Give them your password", "Hang up and verify through official IT channels", "Give a fake password", "Ask them to call back later"],
      correct: 1,
      explanation: "Legitimate IT staff will never ask for your password. This is a social engineering attempt. Always verify through official channels."
    },
    {
      question: "You receive a suspicious login alert for your account from an unknown location. What's your first step?",
      options: ["Ignore it", "Change your password immediately", "Reply to the email", "Wait and see"],
      correct: 1,
      explanation: "Immediately change your password and enable two-factor authentication if not already active. Then review recent account activity."
    },
    {
      question: "You're about to use a public computer at a library. What should you avoid?",
      options: ["Checking the weather", "Logging into your bank account", "Reading news", "Searching for information"],
      correct: 1,
      explanation: "Never access sensitive accounts on public computers as they may have keyloggers or other malware installed."
    },
    {
      question: "A pop-up appears saying your computer has a virus and to call a number. What do you do?",
      options: ["Call the number immediately", "Close the pop-up and run your own antivirus scan", "Click 'OK'", "Restart your computer"],
      correct: 1,
      explanation: "This is a common scam. Close the pop-up and run a scan with your legitimate antivirus software. Never call numbers from pop-ups."
    },
    {
      question: "A colleague asks to borrow your login credentials to access a file. What should you do?",
      options: ["Share your credentials", "Decline and help them get proper access", "Write it down for them", "Share but change password later"],
      correct: 1,
      explanation: "Never share your credentials. Help them request proper access through official channels instead."
    },
    {
      question: "You're asked to install an app from an unknown source for work. What's the best approach?",
      options: ["Install it immediately", "Verify with IT department first", "Install from a different source", "Ask a colleague"],
      correct: 1,
      explanation: "Always verify software installations with your IT department to ensure they're legitimate and approved."
    },
    {
      question: "You haven't backed up your important files in 6 months. What should you do?",
      options: ["Wait another 6 months", "Back up your files immediately", "Delete old files instead", "Ignore it"],
      correct: 1,
      explanation: "Regular backups are crucial for data protection. Back up important files immediately and set up automatic backups."
    },
    {
      question: "You notice a website URL starts with 'http://' instead of 'https://'. Should you enter payment information?",
      options: ["Yes, it's fine", "No, the connection is not secure", "Only if it's a known site", "Yes, but use a VPN"],
      correct: 1,
      explanation: "Never enter sensitive information on non-HTTPS sites. The 'S' in HTTPS means the connection is encrypted and secure."
    }
  ],
  password: [
    { password: "password", strength: "Very Weak", score: 0, feedback: "This is one of the most common passwords. Never use it!" },
    { password: "12345678", strength: "Very Weak", score: 0, feedback: "Sequential numbers are extremely easy to crack." },
    { password: "qwerty", strength: "Very Weak", score: 0, feedback: "Keyboard patterns are predictable and insecure." },
    { password: "Password1", strength: "Weak", score: 1, feedback: "Adding a number to a common word isn't enough. Needs more complexity." },
    { password: "MyDog2024", strength: "Weak", score: 1, feedback: "Personal information is easy to guess. Add special characters and length." },
    { password: "Summer2024!", strength: "Medium", score: 2, feedback: "Better, but still predictable. Avoid common words and dates." },
    { password: "Tr0ub4dor&3", strength: "Medium", score: 2, feedback: "Good mix, but could be longer for better security." },
    { password: "C0rrect-H0rse-Battery!", strength: "Strong", score: 3, feedback: "Excellent! Long passphrase with numbers and special characters." },
    { password: "xK9#mP2$vL8@qR5", strength: "Very Strong", score: 4, feedback: "Perfect! Random characters, numbers, and symbols make this very secure." },
    { password: "MyS3cur3P@ssw0rd!2024#", strength: "Very Strong", score: 4, feedback: "Excellent! Long, complex, and includes all character types." }
  ]
};

// Get random questions for a game type
app.get("/api/games/questions/:gameType", (req, res) => {
  const gameType = req.params.gameType;
  const count = parseInt(req.query.count) || 10;

  if (!questionBank[gameType]) {
    return res.status(400).json({ error: "Invalid game type" });
  }

  let questions = [...questionBank[gameType]];

  // Shuffle and select questions
  questions = questions.sort(() => Math.random() - 0.5).slice(0, Math.min(count, questions.length));

  res.json({ questions, total: questions.length });
});

// Submit game results and get analysis
app.post("/api/games/submit", (req, res) => {
  const { username, gameType, score, totalQuestions, answers, timeTaken } = req.body;

  if (!username || !gameType || score === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const percentage = Math.round((score / totalQuestions) * 100);

  // Generate analysis based on performance
  let analysis = {
    score,
    totalQuestions,
    percentage,
    timeTaken: timeTaken || "N/A",
    performance: "",
    recommendations: [],
    strengths: [],
    weaknesses: []
  };

  // Performance rating
  if (percentage >= 90) {
    analysis.performance = "Excellent! 🌟";
    analysis.strengths.push("Outstanding cybersecurity knowledge");
    analysis.recommendations.push("Consider taking advanced security courses");
    analysis.recommendations.push("Share your knowledge by mentoring others");
  } else if (percentage >= 70) {
    analysis.performance = "Good! 👍";
    analysis.strengths.push("Solid understanding of core concepts");
    analysis.recommendations.push("Review areas where you missed questions");
    analysis.recommendations.push("Practice with more advanced scenarios");
  } else if (percentage >= 50) {
    analysis.performance = "Fair 📚";
    analysis.weaknesses.push("Need to strengthen fundamental concepts");
    analysis.recommendations.push("Review the learning modules");
    analysis.recommendations.push("Take the quiz again after studying");
  } else {
    analysis.performance = "Needs Improvement 📖";
    analysis.weaknesses.push("Requires significant study in cybersecurity basics");
    analysis.recommendations.push("Start with beginner learning modules");
    analysis.recommendations.push("Focus on understanding core security principles");
  }

  // Game-specific analysis
  if (gameType === "quiz") {
    analysis.gameInsights = "Quiz tests your theoretical knowledge of cybersecurity concepts.";
  } else if (gameType === "scenario") {
    analysis.gameInsights = "Scenario-based questions test your practical decision-making skills.";
  } else if (gameType === "password") {
    analysis.gameInsights = "Password strength evaluation helps you create more secure passwords.";
  }

  res.json({
    success: true,
    analysis
  });
});

// Get leaderboard
app.get("/api/games/leaderboard", (req, res) => {
  const sortedLeaderboard = leaderboard
    .sort((a, b) => b.score - a.score)
    .slice(0, 10); // Top 10

  res.json({ leaderboard: sortedLeaderboard });
});

// Add score to leaderboard
app.post("/api/games/leaderboard", (req, res) => {
  const { username, gameType, score, totalQuestions } = req.body;

  if (!username || !gameType || score === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const entry = {
    username,
    gameType,
    score,
    totalQuestions,
    percentage: Math.round((score / totalQuestions) * 100),
    timestamp: new Date().toISOString()
  };

  leaderboard.push(entry);

  // Keep only top 50 entries
  leaderboard = leaderboard
    .sort((a, b) => b.score - a.score)
    .slice(0, 50);

  res.json({
    success: true,
    message: "Score added to leaderboard",
    rank: leaderboard.findIndex(e => e.username === username && e.timestamp === entry.timestamp) + 1
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`SecureSphere Labs running at http://localhost:${PORT}`);
  });
}

module.exports = app;
