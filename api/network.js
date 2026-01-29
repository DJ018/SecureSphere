// Network Scan Lab API
module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    return res.status(200).json({
        result: "Open Ports Found: 22 (SSH), 80 (HTTP), 443 (HTTPS). Reconnaissance phase complete.",
        ports: [
            { port: 22, service: "SSH", status: "open", risk: "medium" },
            { port: 80, service: "HTTP", status: "open", risk: "low" },
            { port: 443, service: "HTTPS", status: "open", risk: "low" }
        ],
        recommendation: "Close unnecessary ports and ensure SSH uses key-based authentication."
    });
};
