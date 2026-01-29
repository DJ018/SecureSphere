// SQL Injection Lab API
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

    const input = req.body.payload || "";

    if (input.includes("' OR 1=1") || input.includes("' or 1=1")) {
        return res.status(200).json({
            result: "❌ Vulnerable Query Detected! SQL Injection possible.",
            vulnerable: true,
            explanation: "The input contains SQL injection patterns that could bypass authentication or access unauthorized data."
        });
    } else {
        return res.status(200).json({
            result: "✅ Safe Query. No injection detected.",
            vulnerable: false,
            explanation: "The input appears safe, but always use parameterized queries in production."
        });
    }
};
