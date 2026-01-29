// IAM (Identity & Access Management) Lab API
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

    const role = req.body.role;

    if (role === "admin") {
        return res.status(200).json({
            result: "✅ Access Granted",
            granted: true,
            message: "Admin role has full access to all resources.",
            permissions: ["read", "write", "delete", "admin"]
        });
    } else {
        return res.status(200).json({
            result: "❌ Access Denied",
            granted: false,
            message: "Insufficient permissions. Contact administrator for access.",
            permissions: []
        });
    }
};
