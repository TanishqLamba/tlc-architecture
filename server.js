/**
 * TLC ARCHITECTURE CORETAPE SERVER BACKEND RUNTIME - COMPATIBLE WITH NODE v24
 */
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serves your HTML, CSS, and JS assets natively with zero string-matching parsing
app.use(express.static(path.join(__dirname, './')));

// Handle direct incoming POST payloads emitted from index form interface
app.post('/api/inquiry', async (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: 'tanishqlamba11@gmail.com', 
            pass: 'odbeyadtjguypbub' // Active 16-character App Password
        }
    });

    const mailOptions = {
        from: email,
        to: 'tanishqlamba11@gmail.com', 
        subject: `URGENT PROJECT CONSULTATION RFP: ${name}`,
        text: `TLC ARCHITECTURE DIGITAL WORKSPACE TRANSMISSION:\n\nClient Identity Name: ${name}\nClient Routing Vector: ${email}\n\nProject Scope Parameters:\n${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'RFP Matrix Dispatched.' });
    } catch (error) {
        console.error('Mail Transmission Failure:', error);
        res.status(500).json({ success: false, message: 'Server Transport Error Allocation.' });
    }
});

// FIXED FOR NODE v24: Static directory routing fallback mapping
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`TLC Secure Network Core routing cleanly on port ${PORT}`);
});
