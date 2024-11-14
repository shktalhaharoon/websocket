// backend/cron.js
require('dotenv').config(); // Load environment variables
const nodemailer = require('nodemailer');
const { CronJob } = require('cron');

// Create a cron job that runs daily at 8:00 AM
const job = new CronJob('* * * * *', async () => {
  try {
    // Configure the email transporter using nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Using Gmail for this example, change if necessary
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Set up the email details
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender's email address
      to: 'recipient-email@example.com', // Receiver's email address
      subject: 'Daily Email', // Subject of the email
      text: 'This is your daily email from your MERN app!', // Body content
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Daily email sent!');
  } catch (error) {
    console.error('Error sending email:', error);
  }
});

// Start the cron job
job.start();
