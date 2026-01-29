// Services API - Serverless Function
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

    // GET /api/services - Return all services
    if (req.method === 'GET' && !url.includes('/request')) {
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

        return res.status(200).json(services);
    }

    // POST /api/services/request - Submit service request
    if (url.includes('/request') && req.method === 'POST') {
        const { serviceId, name, email, company, package: pkg, message } = req.body;

        if (!serviceId || !name || !email) {
            return res.status(400).json({
                success: false,
                error: "Missing required fields"
            });
        }

        const request = {
            id: `REQ-${Date.now()}`,
            serviceId,
            name,
            email,
            company: company || "N/A",
            package: pkg || "standard",
            message: message || "",
            timestamp: new Date().toISOString(),
            status: "pending"
        };

        console.log('Service Request:', request);

        return res.status(200).json({
            success: true,
            message: "Service request submitted successfully!",
            requestId: request.id,
            estimatedResponse: "24-48 hours"
        });
    }

    // Default response
    return res.status(404).json({
        success: false,
        error: 'Services API endpoint not found'
    });
};
