// Lab Challenges API - Serverless Function
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

    // SQL Injection Lab - POST /api/sql
    if (url.includes('/sql') && req.method === 'POST') {
        const input = req.body.payload || "";
        if (input.includes("' OR 1=1")) {
            return res.status(200).json({ result: "❌ Vulnerable Query Detected! SQL Injection possible." });
        } else {
            return res.status(200).json({ result: "✅ Safe Query. No injection detected." });
        }
    }

    // Phishing Lab - POST /api/phish
    if (url.includes('/phish') && req.method === 'POST') {
        const answer = req.body.answer;
        if (answer === "phish") {
            return res.status(200).json({ result: "✅ Correct! This is a phishing attempt." });
        } else {
            return res.status(200).json({ result: "❌ Wrong. This email shows phishing signs." });
        }
    }

    // Password Lab - POST /api/password
    if (url.includes('/password') && req.method === 'POST') {
        const pwd = req.body.password || "";
        let strength = "Weak ❌";
        if (pwd.length > 8 && /[A-Z]/.test(pwd) && /\d/.test(pwd)) {
            strength = "Strong ✅";
        }
        return res.status(200).json({ result: `Password Strength: ${strength}` });
    }

    // Network Scan Lab - GET /api/network
    if (url.includes('/network') && req.method === 'GET') {
        return res.status(200).json({
            result: "Open Ports Found: 22 (SSH), 80 (HTTP). Reconnaissance phase complete."
        });
    }

    // IAM Lab - POST /api/iam
    if (url.includes('/iam') && req.method === 'POST') {
        const role = req.body.role;
        if (role === "admin") {
            return res.status(200).json({ result: "✅ Access Granted" });
        } else {
            return res.status(200).json({ result: "❌ Access Denied" });
        }
    }

    // Malware Lab - POST /api/malware
    if (url.includes('/malware') && req.method === 'POST') {
        const behavior = req.body.behavior;
        if (behavior.includes("encrypt files")) {
            return res.status(200).json({ result: "⚠️ Ransomware behavior detected!" });
        } else {
            return res.status(200).json({ result: "✅ No malicious behavior detected." });
        }
    }

    // Default response
    return res.status(404).json({
        success: false,
        error: 'Lab challenge endpoint not found'
    });
};
