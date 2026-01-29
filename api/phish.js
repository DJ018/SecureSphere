// Phishing Detection Lab API
module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            error: 'Method not allowed'
        });
    }

    const answer = req.body.answer;

    if (answer === "phish") {
        return res.status(200).json({
            result: "✅ Correct! This is a phishing attempt.",
            correct: true,
            explanation: "Good catch! The email shows classic phishing signs: urgent language, suspicious links, and requests for sensitive information."
        });
    } else {
        return res.status(200).json({
            result: "❌ Wrong. This email shows phishing signs.",
            correct: false,
            explanation: "Look for red flags: spelling errors, suspicious sender, urgent requests, and links to unfamiliar domains."
        });
    }
};
