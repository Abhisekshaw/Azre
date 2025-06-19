const express = require('express');
const app = express();
const os = require('os');
const cors = require('cors');
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const Auth = require('./routes/authRoutes');
const ratelimit = require('express-rate-limit');
const Hardware = require('./routes/hardware.route');
const gatewayRoutes = require('./routes/gatewayRoutes');
const { connectToDatabase } = require('./config/db.config');
// const timeout = require('connect-timeout');

const apilimiter = ratelimit({
    windowMS: 5*60*1000,
    max:5,
    message: 'Too many requests from this IP, please try again after 5 minutes.',
    standardHeaders: true,
    legacyHeaders: false,
});

dotenv.config();
app.use(express.json());
app.use(cors());

// Connect to the database
connectToDatabase();

app.get('/health', (req, res) => {
    try {
        const networkInterfaces = os.networkInterfaces();

        // Extract IPv4 addresses
        const ipv4Addresses = Object.values(networkInterfaces)
            .flat()
            .filter(interfaceInfo => interfaceInfo.family === 'IPv4')
            .map(interfaceInfo => interfaceInfo.address);

        if (mongoose.connection.name) {
            const message = {
                host: ipv4Addresses[0],
                message: 'Healthy',
                status: true,
                time: (new Date()).toString()
            };
            console.table(message);
            // setInterval(() => {
            // }, 10000);
            const memoryUsage = process.memoryUsage();
            console.log(`Heap Total: ${memoryUsage.heapTotal / 1024 / 1024} MB`);
            console.log(`Heap Used: ${memoryUsage.heapUsed / 1024 / 1024} MB`);
            console.log(`RSS: ${memoryUsage.rss / 1024 / 1024} MB`);

            return res.status(200).json({ response: message });
        } else {
            const message = {
                host: ipv4Addresses,
                message: 'Unhealthy.',
                status: false,
                time: (new Date()).toString()
            };
            console.table(message);
            return res.status(200).json({ response: message });
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// API Routes
app.use('/api/auth',apilimiter, Auth);
app.use('/api',apilimiter, gatewayRoutes);
app.use('/api/hardware', Hardware);


const PORT = process.env.PORT || 3030;
const HOST = process.env.HOST || `http://localhost:${PORT}`;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${HOST}`)
})