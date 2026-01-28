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

    // In-memory storage (in production, use a database)
    const serviceRequests = [];

    // Services catalog
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

    // Testimonials data
    const testimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            company: "TechStart Inc.",
            role: "CTO",
            rating: 5,
            text: "SecureSphere's penetration testing service helped us identify critical vulnerabilities before launch. Highly professional team!",
            service: "Penetration Testing",
            date: "2025-12-15"
        },
        {
            id: 2,
            name: "Michael Chen",
            company: "DataFlow Solutions",
            role: "Security Manager",
            rating: 5,
            text: "The security audit was thorough and the recommendations were actionable. Our security posture improved significantly.",
            service: "Security Audit",
            date: "2025-11-20"
        },
        {
            id: 3,
            name: "Emily Rodriguez",
            company: "CloudVentures",
            role: "CEO",
            rating: 5,
            text: "Excellent compliance support! They guided us through ISO 27001 certification smoothly.",
            service: "Compliance Support",
            date: "2025-10-10"
        },
        {
            id: 4,
            name: "David Park",
            company: "FinSecure",
            role: "IT Director",
            rating: 4,
            text: "Great security awareness training. Our employees are now much more vigilant about phishing attempts.",
            service: "Security Awareness Training",
            date: "2026-01-05"
        }
    ];

    // GET /api/services - Return services catalog
    if (req.method === 'GET') {
        return res.status(200).json(services);
    }

    // POST /api/services/request
    if (url.includes('/request') && req.method === 'POST') {
        const { serviceId, name, email, company, package, message } = req.body;

        if (!serviceId || !name || !email) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const request = {
            id: `REQ-${Date.now()}`,
            serviceId,
            name,
            email,
            company: company || "N/A",
            package: package || "standard",
            message: message || "",
            timestamp: new Date().toISOString(),
            status: "pending"
        };

        serviceRequests.push(request);

        return res.status(200).json({
            success: true,
            message: "Service request submitted successfully!",
            requestId: request.id,
            estimatedResponse: "24-48 hours"
        });
    }

    // POST /api/services/calculate-price
    if (url.includes('/calculate-price') && req.method === 'POST') {
        const { serviceId, package, addons } = req.body;

        const servicePricing = {
            "security-audit": { basic: 500, standard: 1000, premium: 2000 },
            "penetration-testing": { basic: 1500, standard: 3000, premium: 5000 },
            "risk-assessment": { basic: 800, standard: 1500, premium: 3000 },
            "security-awareness": { basic: 300, standard: 600, premium: 1200 },
            "cyber-consulting": { basic: 1000, standard: 2500, premium: 5000 },
            "compliance-support": { basic: 1200, standard: 2500, premium: 5000 }
        };

        const addonPricing = {
            "priority-support": 200,
            "extended-warranty": 300,
            "training-materials": 150,
            "ongoing-monitoring": 500
        };

        let basePrice = servicePricing[serviceId]?.[package] || 0;
        let addonTotal = 0;

        if (addons && Array.isArray(addons)) {
            addons.forEach(addon => {
                addonTotal += addonPricing[addon] || 0;
            });
        }

        const total = basePrice + addonTotal;
        const discount = package === "premium" ? 0.1 : 0;
        const finalPrice = total * (1 - discount);

        return res.status(200).json({
            basePrice,
            addonTotal,
            discount: discount * 100,
            total: finalPrice,
            currency: "USD"
        });
    }

    // GET /api/testimonials
    if (url.includes('/testimonials') && req.method === 'GET') {
        return res.status(200).json(testimonials);
    }

    // Default response
    return res.status(404).json({
        success: false,
        error: 'Services API endpoint not found'
    });
};
