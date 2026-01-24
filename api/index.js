// API Status Endpoint
module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    return res.status(200).json({
        success: true,
        message: 'SecureSphere API is running',
        version: '1.0.0',
        endpoints: {
            contact: '/api/contact - POST - Submit contact form',
            labs: '/api/labs - GET - Retrieve lab challenges',
            status: '/api - GET - API status (this endpoint)'
        },
        timestamp: new Date().toISOString()
    });
};
