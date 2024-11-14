const cron = require('node-cron');
const nodemailer = require('nodemailer');

// Create a reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',  // You can use other services like 'hotmail', 'yahoo', etc.
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS  // Your email password or an app password
  }
});

// Function to send email
function sendEmail() {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'gymbuddy@gmail.com',  // Replace with the recipient's email address
    subject: 'UPDATED WORKOUTS',
    text: 'MESSAGE FROM YOUR MERN STACK APP!'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('Error sending email:', error);
    }
    console.log('Email sent: ' + info.response);
  });
}

// Set up the cron job to run daily (every 24 hours)
cron.schedule('0 * * * *', () => {
  console.log('Cron job running to send daily email...');
  sendEmail();
});

