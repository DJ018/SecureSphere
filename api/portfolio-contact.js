// Portfolio Contact API - Serverless Function
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

    // Only accept POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            message: 'Method not allowed. Please use POST.'
        });
    }

    try {
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

        console.log(`📬 New portfolio inquiry from ${name} (${email}) - Project: ${projectType}`);

        return res.status(200).json({
            success: true,
            message: "Thank you for your inquiry! We'll be in touch soon.",
            ticketId: submission.id,
            estimatedResponse: "Within 24 hours"
        });

    } catch (error) {
        console.error('Portfolio contact error:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while processing your request. Please try again later.'
        });
    }
};
