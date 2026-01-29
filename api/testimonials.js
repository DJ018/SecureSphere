// Testimonials API
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

    return res.status(200).json(testimonials);
};
