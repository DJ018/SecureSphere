// Games Leaderboard API
let leaderboard = [];

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

    // GET - Return leaderboard
    if (req.method === 'GET') {
        // Sort by score descending
        const sortedLeaderboard = [...leaderboard].sort((a, b) => b.score - a.score).slice(0, 10);

        return res.status(200).json({
            success: true,
            leaderboard: sortedLeaderboard
        });
    }

    // POST - Add to leaderboard
    if (req.method === 'POST') {
        const { playerName, score, gameType, accuracy, timeSpent } = req.body;

        if (!playerName || score === undefined) {
            return res.status(400).json({
                success: false,
                error: 'Player name and score are required'
            });
        }

        const entry = {
            id: Date.now(),
            playerName,
            score,
            gameType: gameType || 'quiz',
            accuracy: accuracy || 0,
            timeSpent: timeSpent || 0,
            timestamp: new Date().toISOString()
        };

        leaderboard.push(entry);

        // Keep only top 100 entries
        leaderboard = leaderboard.sort((a, b) => b.score - a.score).slice(0, 100);

        return res.status(200).json({
            success: true,
            message: 'Score added to leaderboard!',
            rank: leaderboard.findIndex(e => e.id === entry.id) + 1
        });
    }

    return res.status(405).json({
        success: false,
        error: 'Method not allowed'
    });
};
