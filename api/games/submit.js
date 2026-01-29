// Games Submit Score API
module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            error: 'Method not allowed'
        });
    }

    const { playerName, score, gameType, answers, totalQuestions } = req.body;

    if (!playerName || score === undefined) {
        return res.status(400).json({
            success: false,
            error: 'Player name and score are required'
        });
    }

    const accuracy = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

    // Generate performance feedback
    let feedback = '';
    let badge = '';

    if (accuracy >= 90) {
        feedback = 'Outstanding! You\'re a cybersecurity expert!';
        badge = '🏆 Master';
    } else if (accuracy >= 75) {
        feedback = 'Great job! You have strong security knowledge!';
        badge = '🥇 Expert';
    } else if (accuracy >= 60) {
        feedback = 'Good work! Keep learning to improve!';
        badge = '🥈 Proficient';
    } else {
        feedback = 'Keep practicing! Review the learning modules.';
        badge = '🥉 Learner';
    }

    return res.status(200).json({
        success: true,
        score,
        accuracy,
        feedback,
        badge,
        message: 'Score submitted successfully!',
        timestamp: new Date().toISOString()
    });
};
