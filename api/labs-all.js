// Consolidated Labs API - All lab endpoints in one file
module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const url = req.url || '';

    // GET /api/labs-all - List all labs
    if (req.method === 'GET' && !url.includes('/sql') && !url.includes('/phish') && !url.includes('/password') && !url.includes('/network') && !url.includes('/iam') && !url.includes('/malware')) {
        return res.status(200).json({
            success: true,
            labs: [
                { id: 'sql', title: 'SQL Injection', difficulty: 'Medium', category: 'Web Security', description: 'Learn to identify and prevent SQL injection attacks', points: 100, completed: false },
                { id: 'phish', title: 'Phishing Detection', difficulty: 'Easy', category: 'Social Engineering', description: 'Identify phishing attempts and malicious emails', points: 75, completed: false },
                { id: 'password', title: 'Password Security', difficulty: 'Easy', category: 'Authentication', description: 'Understand password strength and best practices', points: 50, completed: false },
                { id: 'network', title: 'Network Scanning', difficulty: 'Hard', category: 'Network Security', description: 'Perform network reconnaissance and analysis', points: 150, completed: false },
                { id: 'iam', title: 'Access Control', difficulty: 'Medium', category: 'Identity Management', description: 'Implement proper access control mechanisms', points: 100, completed: false },
                { id: 'malware', title: 'Malware Analysis', difficulty: 'Hard', category: 'Threat Detection', description: 'Analyze and detect malicious software', points: 150, completed: false }
            ]
        });
    }

    // POST /api/labs-all/sql - SQL Injection Lab
    if (url.includes('/sql') && req.method === 'POST') {
        const { input } = req.body;
        const isSqlInjection = /(\bOR\b|\bAND\b|--|;|\/\*|\*\/|'|"|\bUNION\b|\bSELECT\b|\bDROP\b|\bINSERT\b|\bUPDATE\b|\bDELETE\b)/i.test(input);

        return res.status(200).json({
            success: true,
            vulnerable: isSqlInjection,
            message: isSqlInjection ? 'SQL Injection detected!' : 'Input appears safe',
            details: isSqlInjection ? 'Dangerous SQL keywords or patterns found' : 'No SQL injection patterns detected'
        });
    }

    // POST /api/labs-all/phish - Phishing Detection Lab
    if (url.includes('/phish') && req.method === 'POST') {
        const { email, subject, body } = req.body;
        const phishingIndicators = ['urgent', 'verify', 'suspended', 'click here', 'confirm', 'password', 'account', 'security alert'];
        const foundIndicators = phishingIndicators.filter(indicator =>
            (subject?.toLowerCase().includes(indicator) || body?.toLowerCase().includes(indicator))
        );

        return res.status(200).json({
            success: true,
            isPhishing: foundIndicators.length >= 2,
            indicators: foundIndicators,
            riskLevel: foundIndicators.length >= 3 ? 'High' : foundIndicators.length >= 2 ? 'Medium' : 'Low'
        });
    }

    // POST /api/labs-all/password - Password Strength Lab
    if (url.includes('/password') && req.method === 'POST') {
        const { password } = req.body;
        let score = 0;
        const feedback = [];

        if (password.length >= 8) score++;
        else feedback.push('Password should be at least 8 characters');

        if (password.length >= 12) score++;
        if (/[a-z]/.test(password)) score++;
        else feedback.push('Add lowercase letters');

        if (/[A-Z]/.test(password)) score++;
        else feedback.push('Add uppercase letters');

        if (/[0-9]/.test(password)) score++;
        else feedback.push('Add numbers');

        if (/[^a-zA-Z0-9]/.test(password)) score++;
        else feedback.push('Add special characters');

        const strength = score <= 2 ? 'Weak' : score <= 4 ? 'Moderate' : 'Strong';

        return res.status(200).json({
            success: true,
            strength,
            score,
            feedback: feedback.length > 0 ? feedback : ['Password is strong!']
        });
    }

    // GET /api/labs-all/network - Network Scan Lab
    if (url.includes('/network') && req.method === 'GET') {
        return res.status(200).json({
            success: true,
            scan: {
                ip: '192.168.1.1',
                openPorts: [22, 80, 443, 3306],
                services: ['SSH', 'HTTP', 'HTTPS', 'MySQL'],
                vulnerabilities: ['Outdated SSH version', 'MySQL exposed']
            }
        });
    }

    // POST /api/labs-all/iam - IAM Lab
    if (url.includes('/iam') && req.method === 'POST') {
        const { user, resource, action } = req.body;
        const allowed = (user === 'admin' && action === 'delete') ||
            (user === 'user' && action === 'read');

        return res.status(200).json({
            success: true,
            allowed,
            message: allowed ? 'Access granted' : 'Access denied',
            reason: allowed ? 'User has required permissions' : 'Insufficient permissions'
        });
    }

    // POST /api/labs-all/malware - Malware Detection Lab
    if (url.includes('/malware') && req.method === 'POST') {
        const { code } = req.body;
        const malwarePatterns = ['eval(', 'exec(', 'system(', 'shell_exec', 'base64_decode', '__import__'];
        const detected = malwarePatterns.filter(pattern => code.includes(pattern));

        return res.status(200).json({
            success: true,
            isMalicious: detected.length > 0,
            detectedPatterns: detected,
            threat: detected.length > 0 ? 'Suspicious code patterns detected' : 'No threats detected'
        });
    }

    return res.status(404).json({ success: false, error: 'Lab endpoint not found' });
};
