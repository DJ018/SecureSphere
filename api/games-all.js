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
            { question: 'What does HTTPS stand for?', options: ['HyperText Transfer Protocol Secure', 'High Transfer Protocol System', 'HyperText Transmission Protocol Safe', 'Hyper Transfer Protection Service'], correct: 0, explanation: 'HTTPS stands for HyperText Transfer Protocol Secure.' },
            { question: 'What is phishing?', options: ['A type of malware', 'A social engineering attack to steal credentials', 'A network scanning technique', 'A password cracking method'], correct: 1, explanation: 'Phishing is a social engineering attack.' }
        ];

        const scenarioQuestions = [
            { question: 'You receive an email from your "bank" asking you to verify your account by clicking a link.', correct: 2, explanation: 'This is a classic phishing attempt. Banks never ask for credentials via email.' },
            { question: 'A USB drive labeled "Salary Information 2024" is found in the parking lot.', correct: 2, explanation: 'Never plug unknown USB drives into your computer.' }
        ];

        const passwordQuestions = [
            { password: 'password', strength: 'Very Weak', score: 0, feedback: 'Common password, easily guessable' },
            { password: 'P@ssw0rd', strength: 'Weak', score: 1, feedback: 'Predictable substitutions, too short' }
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
