// Consolidated Games API - All game endpoints in one file  
module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const url = req.url || '';

    // In-memory storage
    let leaderboard = [];

    // GET /api/games-all/questions/:gameType
    if (url.includes('/questions/') && req.method === 'GET') {
        const gameType = url.split('/questions/')[1]?.split('?')[0];

        const quizQuestions = [
            { question: 'What does HTTPS stand for?', options: ['HyperText Transfer Protocol Secure', 'High Transfer Protocol System', 'HyperText Transmission Protocol Safe', 'Hyper Transfer Protection Service'], correct: 0, explanation: 'HTTPS stands for HyperText Transfer Protocol Secure, which encrypts data between your browser and the website.' },
            { question: 'What is phishing?', options: ['A type of malware', 'A social engineering attack to steal credentials', 'A network scanning technique', 'A password cracking method'], correct: 1, explanation: 'Phishing is a social engineering attack where attackers impersonate legitimate organizations to steal sensitive information like passwords and credit card numbers.' },
            { question: 'What is the primary purpose of a firewall?', options: ['To speed up internet connection', 'To monitor and control network traffic', 'To encrypt files on your computer', 'To backup data automatically'], correct: 1, explanation: 'A firewall monitors and controls incoming and outgoing network traffic based on predetermined security rules, acting as a barrier between trusted and untrusted networks.' },
            { question: 'What does VPN stand for?', options: ['Virtual Private Network', 'Verified Protection Network', 'Visual Privacy Node', 'Virtual Protection Network'], correct: 0, explanation: 'VPN stands for Virtual Private Network. It creates a secure, encrypted connection over a less secure network, like the internet.' },
            { question: 'What is two-factor authentication (2FA)?', options: ['Using two different passwords', 'Requiring two forms of verification to access an account', 'Having two user accounts', 'Logging in from two devices'], correct: 1, explanation: 'Two-factor authentication requires two different forms of verification (like password + SMS code) to access an account, significantly improving security.' },
            { question: 'What is ransomware?', options: ['Software that speeds up your computer', 'Malware that encrypts files and demands payment', 'A type of antivirus program', 'A network monitoring tool'], correct: 1, explanation: 'Ransomware is malicious software that encrypts your files and demands payment (usually in cryptocurrency) to restore access.' },
            { question: 'What is the safest way to share sensitive information?', options: ['Via email', 'Through encrypted messaging apps', 'On social media with privacy settings', 'Via text message'], correct: 1, explanation: 'Encrypted messaging apps provide end-to-end encryption, ensuring only the sender and recipient can read the messages.' },
            { question: 'What is a zero-day vulnerability?', options: ['A bug that takes zero days to fix', 'A security flaw unknown to the software vendor', 'A vulnerability that expires in one day', 'A minor security issue'], correct: 1, explanation: 'A zero-day vulnerability is a security flaw that is unknown to the software vendor and has no patch available, making it extremely dangerous.' },
            { question: 'What does SSL/TLS do?', options: ['Speeds up website loading', 'Encrypts data transmitted between browser and server', 'Blocks malicious websites', 'Compresses images'], correct: 1, explanation: 'SSL/TLS protocols encrypt data transmitted between your browser and web servers, protecting sensitive information from interception.' },
            { question: 'What is social engineering?', options: ['Building social media platforms', 'Manipulating people to divulge confidential information', 'Networking at tech conferences', 'Creating user-friendly interfaces'], correct: 1, explanation: 'Social engineering is the psychological manipulation of people into performing actions or divulging confidential information, often the weakest link in security.' },
            { question: 'What is the purpose of antivirus software?', options: ['To speed up computer performance', 'To detect, prevent, and remove malware', 'To manage passwords', 'To backup files'], correct: 1, explanation: 'Antivirus software detects, prevents, and removes malicious software (malware) from your computer, protecting against viruses, trojans, worms, and other threats.' },
            { question: 'What is a DDoS attack?', options: ['A type of password attack', 'Overwhelming a server with traffic to make it unavailable', 'Stealing data from databases', 'Installing malware on devices'], correct: 1, explanation: 'A Distributed Denial of Service (DDoS) attack overwhelms a target server, service, or network with massive amounts of traffic from multiple sources, making it unavailable to legitimate users.' }
        ];

        const scenarioQuestions = [
            { question: 'You receive an email from your "bank" asking you to verify your account by clicking a link. The email looks professional with the bank\'s logo.', correct: 2, explanation: 'This is a classic phishing attempt. Banks never ask for credentials via email. Always navigate to the bank\'s website directly through your browser, not through email links.' },
            { question: 'A USB drive labeled "Salary Information 2024" is found in the parking lot outside your office building.', correct: 2, explanation: 'Never plug unknown USB drives into your computer. This is a common attack vector called "USB baiting" where attackers leave infected drives hoping someone will plug them in.' },
            { question: 'You receive a call from "IT Support" asking for your password to fix a critical security issue on your account.', correct: 2, explanation: 'This is a social engineering attack. Legitimate IT departments never ask for passwords. Report this immediately to your real IT security team.' },
            { question: 'A colleague sends you a document via email, but the file extension is .exe instead of the expected .pdf.', correct: 2, explanation: 'This is highly suspicious. .exe files are executables that can contain malware. Even if it appears to be from a colleague, their account may be compromised. Verify through another channel before opening.' },
            { question: 'You notice an unfamiliar device connected to your company\'s Wi-Fi network during a routine check.', correct: 1, explanation: 'This needs investigation. Report it to IT security immediately. It could be an unauthorized device or a potential security breach. Don\'t ignore it, but don\'t disconnect it yourself as it might be legitimate.' },
            { question: 'A website you frequently visit suddenly shows a certificate error warning in your browser.', correct: 1, explanation: 'This warrants caution and investigation. It could indicate a man-in-the-middle attack or an expired certificate. Don\'t proceed without verifying the issue. Contact the website administrator or check from a different network.' },
            { question: 'You receive a LinkedIn message from a recruiter offering an amazing job opportunity, asking you to download and fill out an application form.', correct: 1, explanation: 'Be cautious and verify. While it could be legitimate, this is also a common phishing tactic. Verify the recruiter\'s identity through LinkedIn\'s official channels and check if the company is hiring through their official website.' },
            { question: 'Your antivirus software detects and quarantines a file you just downloaded from a trusted software vendor\'s official website.', correct: 1, explanation: 'Investigate before proceeding. While false positives happen, the file could be genuinely malicious if the vendor\'s website was compromised. Verify the file hash with the vendor and scan with multiple antivirus tools.' },
            { question: 'You receive an email from your CEO urgently requesting a wire transfer to a new vendor, marked as confidential.', correct: 2, explanation: 'This is a classic "CEO fraud" or business email compromise attack. Always verify such requests through a separate communication channel (phone call to a known number). Attackers often spoof executive emails.' },
            { question: 'A pop-up appears claiming your computer is infected and provides a phone number to call for immediate support.', correct: 2, explanation: 'This is a tech support scam. Never call numbers from pop-ups. Legitimate antivirus software doesn\'t work this way. Close the browser and run a scan with your actual antivirus software.' }
        ];

        const passwordQuestions = [
            { password: 'password', strength: 'Very Weak', score: 0, feedback: 'This is one of the most common passwords. It would be cracked instantly. Never use dictionary words as passwords.' },
            { password: 'P@ssw0rd', strength: 'Very Weak', score: 0, feedback: 'Predictable letter substitutions (@ for a, 0 for o) don\'t add real security. This is still easily cracked by modern tools.' },
            { password: '12345678', strength: 'Very Weak', score: 0, feedback: 'Sequential numbers are extremely weak. This would be cracked in milliseconds. Always use a mix of character types.' },
            { password: 'qwerty123', strength: 'Very Weak', score: 0, feedback: 'Keyboard patterns combined with numbers are very common and easily guessed. Avoid any keyboard patterns.' },
            { password: 'Welcome2024!', strength: 'Weak', score: 1, feedback: 'While it has uppercase, numbers, and symbols, it follows a predictable pattern (word + year + symbol). Attackers know these patterns.' },
            { password: 'Summer@2024', strength: 'Weak', score: 1, feedback: 'Seasonal words with years are commonly used and easily guessed. Avoid using dates, seasons, or personal information.' },
            { password: 'MyDog123!', strength: 'Weak', score: 1, feedback: 'Personal information (pet names) with simple numbers is predictable. Avoid anything related to your personal life.' },
            { password: 'Tr0ub4dor&3', strength: 'Medium', score: 2, feedback: 'This has good length and character variety, but still uses a base dictionary word. It\'s better but not ideal for sensitive accounts.' },
            { password: 'C0mpl3x!P@ssw0rd', strength: 'Medium', score: 2, feedback: 'Good length and character variety, but still based on the word "password". For high-security accounts, use completely random combinations.' },
            { password: 'Xk9#mP2$vL5@nQ8!', strength: 'Very Strong', score: 4, feedback: 'Excellent! This is a truly random combination of uppercase, lowercase, numbers, and symbols with good length (16+ characters). This would take centuries to crack.' },
            { password: 'correct-horse-battery-staple', strength: 'Strong', score: 3, feedback: 'This passphrase approach (random words) is strong due to length and unpredictability. Easy to remember, hard to crack. Consider adding numbers/symbols for extra security.' },
            { password: 'J7$mK9#pL2@nQ5!vR8', strength: 'Very Strong', score: 4, feedback: 'Perfect! Random characters with excellent length (18 characters), mixing all character types. This is extremely secure and would be virtually impossible to crack.' }
        ];

        const questions = gameType === 'quiz' ? quizQuestions : gameType === 'scenario' ? scenarioQuestions : passwordQuestions;

        return res.status(200).json({ success: true, questions });
    }

    // GET /api/games-all/leaderboard
    if (url.includes('/leaderboard') && req.method === 'GET') {
        return res.status(200).json({
            success: true,
            leaderboard: leaderboard.slice(0, 10)
        });
    }

    // POST /api/games-all/leaderboard
    if (url.includes('/leaderboard') && req.method === 'POST') {
        const { playerName, score, totalQuestions, gameType, accuracy, timeSpent } = req.body;

        leaderboard.push({
            playerName,
            score,
            totalQuestions,
            gameType,
            accuracy: accuracy || Math.round((score / totalQuestions) * 100),
            timeSpent: timeSpent || 0,
            timestamp: new Date().toISOString()
        });

        leaderboard.sort((a, b) => b.score - a.score);
        leaderboard = leaderboard.slice(0, 100);

        return res.status(200).json({
            success: true,
            message: 'Score added to leaderboard!'
        });
    }

    // POST /api/games-all/submit
    if (url.includes('/submit') && req.method === 'POST') {
        const { playerName, score, totalQuestions } = req.body;
        const accuracy = Math.round((score / totalQuestions) * 100);

        return res.status(200).json({
            success: true,
            score,
            accuracy,
            feedback: accuracy >= 90 ? 'Excellent!' : accuracy >= 70 ? 'Good job!' : 'Keep practicing!',
            badge: accuracy >= 90 ? '🏆' : accuracy >= 70 ? '🥇' : '🥉'
        });
    }

    return res.status(404).json({ success: false, error: 'Game endpoint not found' });
};
