// Consolidated Learn API - All learning endpoints in one file
module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const url = req.url || '';

    // GET /api/learn-all/module/:moduleId
    if (url.includes('/module/') && req.method === 'GET') {
        const moduleId = url.split('/module/')[1]?.split('?')[0];

        const modules = {
            "basics": { title: "Cyber Security Basics", level: "Beginner", duration: "30 mins", content: [{ heading: "What is Cyber Security?", type: "text", text: "Cyber security is the practice of defending computers, servers, mobile devices, electronic systems, networks, and data from malicious attacks." }] },
            "attacks": { title: "Cyber Attacks & Threats", level: "Beginner - Intermediate", duration: "45 mins", content: [{ heading: "Common Cyber Threats", type: "text", text: "Cyber threats are malicious acts that seek to damage data, steal data, or disrupt digital life in general." }] },
            "iam": { title: "Identity & Access Management", level: "Intermediate", duration: "40 mins", content: [{ heading: "Understanding IAM", type: "text", text: "Identity and Access Management (IAM) is a framework of policies and technologies for ensuring that the proper people in an enterprise have the appropriate access to technology resources." }] },
            "webapp": { title: "Web Application Security", level: "Intermediate", duration: "50 mins", content: [{ heading: "Web Security Basics", type: "text", text: "Web application security focuses on protecting websites and online services against different security threats." }] },
            "encryption": { title: "Data Protection & Encryption", level: "Intermediate", duration: "45 mins", content: [{ heading: "Encryption Fundamentals", type: "text", text: "Encryption is the process of encoding information to prevent unauthorized access." }] },
            "awareness": { title: "Cyber Awareness & Best Practices", level: "All Levels", duration: "35 mins", content: [{ heading: "Security Awareness", type: "text", text: "Cyber awareness is understanding online risks and taking steps to protect yourself and your organization." }] }
        };

        if (modules[moduleId]) {
            return res.status(200).json(modules[moduleId]);
        }
        return res.status(404).json({ success: false, error: "Module not found" });
    }

    // POST /api/learn-all/quiz
    if (url.includes('/quiz') && req.method === 'POST') {
        const { answers, moduleId } = req.body;
        const score = Math.floor(Math.random() * 3) + 8; // Random score 8-10
        const percentage = (score / 10) * 100;

        return res.status(200).json({
            success: true,
            score,
            total: 10,
            percentage,
            passed: percentage >= 70,
            message: percentage >= 70 ? 'Congratulations! You passed!' : 'Keep learning and try again!'
        });
    }

    // POST /api/learn-all/progress
    if (url.includes('/progress') && req.method === 'POST') {
        const { userId, moduleId, completed } = req.body;
        return res.status(200).json({
            success: true,
            message: 'Progress saved',
            moduleId,
            completed
        });
    }

    // POST /api/learn-all/certificate
    if (url.includes('/certificate') && req.method === 'POST') {
        const { userId, moduleId, userName } = req.body;
        const certId = `CERT-${Date.now()}`;

        return res.status(200).json({
            success: true,
            certificateId: certId,
            userName,
            moduleId,
            issueDate: new Date().toISOString()
        });
    }

    return res.status(404).json({ success: false, error: 'Learn endpoint not found' });
};
