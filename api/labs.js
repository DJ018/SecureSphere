// Labs API Endpoint
module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    // Sample lab data
    const labs = [
        {
            id: 1,
            title: 'SQL Injection Basics',
            difficulty: 'Beginner',
            category: 'Web Security',
            description: 'Learn to identify and exploit SQL injection vulnerabilities',
            points: 100,
            completed: false
        },
        {
            id: 2,
            title: 'XSS Attack Vectors',
            difficulty: 'Intermediate',
            category: 'Web Security',
            description: 'Master cross-site scripting attack techniques',
            points: 150,
            completed: false
        },
        {
            id: 3,
            title: 'Network Reconnaissance',
            difficulty: 'Beginner',
            category: 'Network Security',
            description: 'Perform network scanning and enumeration',
            points: 120,
            completed: false
        },
        {
            id: 4,
            title: 'Password Cracking',
            difficulty: 'Intermediate',
            category: 'Cryptography',
            description: 'Learn password cracking techniques and tools',
            points: 180,
            completed: false
        },
        {
            id: 5,
            title: 'Privilege Escalation',
            difficulty: 'Advanced',
            category: 'System Security',
            description: 'Exploit misconfigurations to gain elevated privileges',
            points: 250,
            completed: false
        }
    ];

    return res.status(200).json({
        success: true,
        labs: labs,
        total: labs.length
    });
};
