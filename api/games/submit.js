// Game Submission API - Analyzes game results
module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

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
};
