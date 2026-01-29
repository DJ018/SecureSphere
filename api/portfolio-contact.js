// Portfolio Contact Form API
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

    // Only accept POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            error: 'Method not allowed'
        });
    }

    const { name, email, projectType, message, source } = req.body;

    if (!name || !email || !projectType || !message) {
        return res.status(400).json({
            success: false,
            error: "All fields are required"
        });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            error: "Invalid email format"
        });
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
};
