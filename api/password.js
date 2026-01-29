// Password Strength Checker Lab API
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

    const pwd = req.body.password || "";
    let strength = "Weak ❌";
    let score = 0;
    let feedback = [];

    // Check length
    if (pwd.length >= 12) {
        score += 2;
        feedback.push("Good length");
    } else if (pwd.length >= 8) {
        score += 1;
        feedback.push("Acceptable length, but longer is better");
    } else {
        feedback.push("Too short - use at least 8 characters");
    }

    // Check for uppercase
    if (/[A-Z]/.test(pwd)) {
        score += 1;
        feedback.push("Contains uppercase");
    } else {
        feedback.push("Add uppercase letters");
    }

    // Check for lowercase
    if (/[a-z]/.test(pwd)) {
        score += 1;
    } else {
        feedback.push("Add lowercase letters");
    }

    // Check for numbers
    if (/\d/.test(pwd)) {
        score += 1;
        feedback.push("Contains numbers");
    } else {
        feedback.push("Add numbers");
    }

    // Check for special characters
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) {
        score += 1;
        feedback.push("Contains special characters");
    } else {
        feedback.push("Add special characters");
    }

    // Determine strength
    if (score >= 5) {
        strength = "Strong ✅";
    } else if (score >= 3) {
        strength = "Medium ⚠️";
    }

    return res.status(200).json({
        result: `Password Strength: ${strength}`,
        score,
        maxScore: 6,
        feedback: feedback.join(", "),
        tips: "Use a mix of uppercase, lowercase, numbers, and special characters. Avoid common words and personal information."
    });
};
