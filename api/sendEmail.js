const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { email, subject, message } = req.body; // Ambil input dari form

    // Konfigurasi SMTP
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`, // Email tetap
            to: process.env.RECEIVER_EMAIL, // Email penerima (punyamu)
            replyTo: email, // Email pengirim (user dari form)
            subject: `[New Message] ${subject}`,
            text: `From: ${email}\n\nMessage:\n${message}`,
        });

        return res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Email error:', error);
        return res.status(500).json({ message: 'Failed to send email.' });
    }
}
