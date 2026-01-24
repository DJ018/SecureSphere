// Leaderboard API - GET and POST
module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // GET - Return leaderboard
    if (req.method === 'GET') {
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

    // POST - Add to leaderboard
    if (req.method === 'POST') {
        const { username, gameType, score, totalQuestions } = req.body;
        const percentage = Math.round((score / totalQuestions) * 100);

        return res.status(200).json({
            success: true,
            message: 'Score added to leaderboard',
            entry: { username, gameType, score, totalQuestions, percentage }
        });
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' });
};
