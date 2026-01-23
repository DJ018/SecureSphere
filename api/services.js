// Serverless function for services API
module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Sample services data
    const services = [
        {
            id: 'penetration-testing',
            name: 'Penetration Testing',
            icon: '🎯',
            description: 'Comprehensive security testing to identify vulnerabilities before attackers do.',
            features: [
                'OWASP Top 10 Testing',
                'Network Penetration Testing',
                'Web Application Testing',
                'API Security Testing',
                'Detailed Vulnerability Report'
            ],
            pricing: {
                basic: 2500,
                standard: 5000,
                premium: 10000
            }
        },
        {
            id: 'security-audit',
            name: 'Security Audit',
            icon: '🔍',
            description: 'In-depth analysis of your security posture with actionable recommendations.',
            features: [
                'Infrastructure Review',
                'Code Security Analysis',
                'Compliance Assessment',
                'Risk Analysis',
                'Remediation Roadmap'
            ],
            pricing: {
                basic: 3000,
                standard: 6000,
                premium: 12000
            }
        },
        {
            id: 'compliance-support',
            name: 'Compliance Support',
            icon: '📋',
            description: 'Expert guidance for ISO 27001, SOC 2, GDPR, and other compliance frameworks.',
            features: [
                'Gap Analysis',
                'Policy Development',
                'Audit Preparation',
                'Documentation Support',
                'Ongoing Compliance'
            ],
            pricing: {
                basic: 4000,
                standard: 8000,
                premium: 15000
            }
        }
    ];

    res.status(200).json(services);
};
