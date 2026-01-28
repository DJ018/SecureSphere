// Learning Module API - Serverless Function
module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const url = req.url || '';

    // In-memory storage for user progress (in production, use a database)
    const userProgress = {};

    // Module content data
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

    // Quiz data
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

    // GET /api/learn/module/:moduleId
    if (url.match(/\/module\/[^/]+$/) && req.method === 'GET') {
        const moduleId = url.split('/module/')[1];

        if (modules[moduleId]) {
            return res.status(200).json(modules[moduleId]);
        } else {
            return res.status(404).json({ error: "Module not found" });
        }
    }

    // POST /api/learn/quiz
    if (url.includes('/quiz') && req.method === 'POST') {
        const { moduleId, answers } = req.body;

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

        return res.status(200).json({
            score,
            total,
            percentage,
            passed,
            message: passed ? "🎉 Congratulations! You passed!" : "📚 Keep learning! Try again to pass."
        });
    }

    // POST /api/learn/progress
    if (url.includes('/progress') && req.method === 'POST') {
        const { userId, moduleId, completed } = req.body;

        if (!userProgress[userId]) {
            userProgress[userId] = {};
        }

        userProgress[userId][moduleId] = {
            completed,
            timestamp: new Date().toISOString()
        };

        return res.status(200).json({ success: true, message: "Progress saved!" });
    }

    // GET /api/learn/progress/:userId
    if (url.match(/\/progress\/[^/]+$/) && req.method === 'GET') {
        const userId = url.split('/progress/')[1];
        const progress = userProgress[userId] || {};

        return res.status(200).json(progress);
    }

    // POST /api/learn/certificate
    if (url.includes('/certificate') && req.method === 'POST') {
        const { name, moduleTitle, date } = req.body;

        return res.status(200).json({
            success: true,
            certificate: {
                name,
                moduleTitle,
                date: date || new Date().toLocaleDateString(),
                certificateId: `CERT-${Date.now()}`,
                message: "Certificate generated successfully!"
            }
        });
    }

    // Default response
    return res.status(404).json({
        success: false,
        error: 'Learning API endpoint not found'
    });
};
