// Games API - Leaderboard, Questions, and Submissions
module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Parse the URL to determine which endpoint is being called
    const url = req.url || '';

    // GET /api/games/leaderboard
    if (url.includes('/leaderboard') && req.method === 'GET') {
        return res.status(200).json({
            success: true,
            leaderboard: [
                { username: 'CyberPro', score: 10, totalQuestions: 10, percentage: 100 },
                { username: 'SecurityGuru', score: 9, totalQuestions: 10, percentage: 90 },
                { username: 'HackerHunter', score: 8, totalQuestions: 10, percentage: 80 },
                { username: 'PenTester', score: 7, totalQuestions: 10, percentage: 70 },
                { username: 'WhiteHat', score: 6, totalQuestions: 10, percentage: 60 }
            ]
        });
    }

    // POST /api/games/leaderboard
    if (url.includes('/leaderboard') && req.method === 'POST') {
        const { username, gameType, score, totalQuestions } = req.body;
        const percentage = Math.round((score / totalQuestions) * 100);

        return res.status(200).json({
            success: true,
            message: 'Score added to leaderboard',
            entry: { username, gameType, score, totalQuestions, percentage }
        });
    }

    // GET /api/games/questions/:gameType
    if (url.includes('/questions/') && req.method === 'GET') {
        const gameType = url.split('/questions/')[1]?.split('?')[0];

        let questions = [];

        if (gameType === 'quiz') {
            questions = [
                {
                    question: 'What does HTTPS stand for?',
                    options: [
                        'HyperText Transfer Protocol Secure',
                        'High Transfer Protocol System',
                        'HyperText Transmission Protocol Safe',
                        'Hyper Transfer Protection Service'
                    ],
                    correct: 0,
                    explanation: 'HTTPS stands for HyperText Transfer Protocol Secure. It encrypts data between your browser and the website.'
                },
                {
                    question: 'Which of the following is the strongest password?',
                    options: [
                        'password123',
                        'P@ssw0rd!2024',
                        'Tr0ub4dor&3',
                        'correct horse battery staple'
                    ],
                    correct: 3,
                    explanation: 'Longer passphrases with random words are stronger than complex but short passwords.'
                },
                {
                    question: 'What is phishing?',
                    options: [
                        'A type of malware',
                        'A social engineering attack to steal credentials',
                        'A network scanning technique',
                        'A password cracking method'
                    ],
                    correct: 1,
                    explanation: 'Phishing is a social engineering attack where attackers impersonate legitimate entities to steal sensitive information.'
                },
                {
                    question: 'What does VPN stand for?',
                    options: [
                        'Virtual Private Network',
                        'Very Protected Network',
                        'Verified Personal Network',
                        'Virtual Protection Node'
                    ],
                    correct: 0,
                    explanation: 'VPN stands for Virtual Private Network. It creates a secure, encrypted connection over the internet.'
                },
                {
                    question: 'What is two-factor authentication (2FA)?',
                    options: [
                        'Using two passwords',
                        'Logging in from two devices',
                        'Using password + additional verification method',
                        'Having two user accounts'
                    ],
                    correct: 2,
                    explanation: '2FA requires two different forms of identification: something you know (password) and something you have (phone, token).'
                },
                {
                    question: 'What is ransomware?',
                    options: [
                        'Software that encrypts your files and demands payment',
                        'A tool to protect against hackers',
                        'A type of firewall',
                        'An antivirus program'
                    ],
                    correct: 0,
                    explanation: 'Ransomware is malicious software that encrypts your files and demands payment for the decryption key.'
                },
                {
                    question: 'What port does HTTPS typically use?',
                    options: ['80', '443', '8080', '22'],
                    correct: 1,
                    explanation: 'HTTPS typically uses port 443, while HTTP uses port 80.'
                },
                {
                    question: 'What is SQL injection?',
                    options: [
                        'A database backup method',
                        'An attack that inserts malicious SQL code',
                        'A way to optimize databases',
                        'A programming language'
                    ],
                    correct: 1,
                    explanation: 'SQL injection is an attack where malicious SQL code is inserted into application queries to manipulate the database.'
                },
                {
                    question: 'What does DDoS stand for?',
                    options: [
                        'Direct Denial of Service',
                        'Distributed Denial of Service',
                        'Data Denial of Security',
                        'Digital Defense of Systems'
                    ],
                    correct: 1,
                    explanation: 'DDoS stands for Distributed Denial of Service, an attack that overwhelms a system with traffic from multiple sources.'
                },
                {
                    question: 'What is the purpose of a firewall?',
                    options: [
                        'To encrypt data',
                        'To block unauthorized network access',
                        'To scan for viruses',
                        'To backup files'
                    ],
                    correct: 1,
                    explanation: 'A firewall monitors and controls incoming and outgoing network traffic based on security rules.'
                }
            ];
        } else if (gameType === 'scenario') {
            questions = [
                {
                    question: 'You receive an email from your "bank" asking you to verify your account by clicking a link and entering your credentials. The email looks legitimate with the bank logo.',
                    correct: 2,
                    explanation: 'This is a classic phishing attempt. Banks never ask for credentials via email. Always navigate to the bank website directly.'
                },
                {
                    question: 'A USB drive labeled "Salary Information 2024" is found in the parking lot. What should you do?',
                    correct: 2,
                    explanation: 'Never plug unknown USB drives into your computer. This is a common attack vector for malware. Report it to security.'
                },
                {
                    question: 'You receive a call from "IT Support" asking for your password to fix an urgent issue with your account.',
                    correct: 2,
                    explanation: 'Legitimate IT support will never ask for your password. This is a social engineering attack. Hang up and contact IT directly.'
                },
                {
                    question: 'A colleague sends you a document via email, but the file extension is .exe instead of .pdf as mentioned in the email.',
                    correct: 2,
                    explanation: '.exe files are executable programs and could contain malware. Do not open it. Verify with your colleague through another channel.'
                },
                {
                    question: 'Your antivirus software pops up a warning about a potentially malicious website you just visited.',
                    correct: 1,
                    explanation: 'Close the browser immediately and run a full system scan. Report the incident to your IT security team.'
                },
                {
                    question: 'You notice unusual activity on your account - logins from a foreign country you have never visited.',
                    correct: 2,
                    explanation: 'This indicates your account may be compromised. Change your password immediately and enable 2FA. Report to security.'
                },
                {
                    question: 'A website offers a free download of expensive software. The site looks professional and has good reviews.',
                    correct: 2,
                    explanation: 'This is likely pirated software that could contain malware. Only download from official sources.'
                },
                {
                    question: 'You receive a message on social media from a friend with just a link and no context. The message seems out of character.',
                    correct: 1,
                    explanation: 'Your friend account may be compromised. Contact them through another method before clicking any links.'
                },
                {
                    question: 'Your computer starts running very slowly and you notice new programs you did not install.',
                    correct: 2,
                    explanation: 'Your system may be infected with malware. Disconnect from the network and run antivirus scans immediately.'
                },
                {
                    question: 'A pop-up claims you have won a prize and asks for your personal information to claim it.',
                    correct: 2,
                    explanation: 'This is a scam. Close the pop-up immediately. Legitimate prizes do not ask for sensitive information via pop-ups.'
                }
            ];
        } else if (gameType === 'password') {
            questions = [
                { password: 'password', strength: 'Very Weak', score: 0, feedback: 'Common password, easily guessable' },
                { password: 'P@ssw0rd', strength: 'Weak', score: 1, feedback: 'Predictable substitutions, too short' },
                { password: 'MyDog2024!', strength: 'Moderate', score: 2, feedback: 'Personal information, moderate length' },
                { password: 'Tr0ub4dor&3', strength: 'Good', score: 3, feedback: 'Good mix of characters, decent length' },
                { password: 'correct-horse-battery-staple', strength: 'Very Strong', score: 4, feedback: 'Long passphrase, very secure' },
                { password: '123456', strength: 'Very Weak', score: 0, feedback: 'Most common password, never use' },
                { password: 'qwerty', strength: 'Very Weak', score: 0, feedback: 'Keyboard pattern, easily guessed' },
                { password: 'Summer2024!', strength: 'Moderate', score: 2, feedback: 'Seasonal + year, somewhat predictable' },
                { password: 'aB3$xY9#mK2@', strength: 'Very Strong', score: 4, feedback: 'Random characters, excellent strength' },
                { password: 'iloveyou', strength: 'Very Weak', score: 0, feedback: 'Common phrase, no complexity' }
            ];
        }

        return res.status(200).json({
            success: true,
            questions: questions
        });
    }

    // POST /api/games/submit
    if (url.includes('/submit') && req.method === 'POST') {
        const { username, gameType, score, totalQuestions, timeTaken } = req.body;
        const percentage = Math.round((score / totalQuestions) * 100);

        let performance = 'Needs Improvement';
        if (percentage >= 90) performance = 'Excellent';
        else if (percentage >= 70) performance = 'Good';
        else if (percentage >= 50) performance = 'Fair';

        return res.status(200).json({
            success: true,
            analysis: {
                username,
                gameType,
                score,
                totalQuestions,
                percentage,
                timeTaken,
                performance,
                message: `Great job, ${username}! You scored ${score}/${totalQuestions} (${percentage}%) in ${timeTaken} seconds.`
            }
        });
    }

    // Default response
    return res.status(404).json({
        success: false,
        error: 'Endpoint not found'
    });
};
