require('dotenv').config(); 
const nodemailer = require('nodemailer');
const { CronJob } = require('cron');


const job = new CronJob('* * * * *', async () => {
  try {

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

 
    const mailOptions = {
      from: process.env.EMAIL_USER, 
      to: 'recipient-email@example.com',
      subject: 'UPDATED WORKOUTS', 
      text: 'THIS MESSAGE IS FROM YOUR GYM MERN_STACK APP',
    };

 
    await transporter.sendMail(mailOptions);
    console.log('Daily email sent!');
  } catch (error) {
    console.error('Error sending email:', error);
  }
});

// Start the cron job
job.start();
