const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Nodemailer transporter setup (you can use Gmail or any SMTP service)
const transporter = nodemailer.createTransport({
    service: 'gmail', // or use SMTP config
    auth: {
        user: 'vivomadhukumar@gmail.com',
        pass: 'chittirobo'
    }
});

// Route to handle form submission and email sending
app.post('/submit-payment', (req, res) => {
    const { email, dishName, restaurant, total } = req.body;
 
    const mailOptions = {
        from: 'naakuteluguraadhu21@gmail.com',
        to: email,
        subject: 'Payment Confirmation',
        text: `Thank you for your order! \n\nDetails:\nDish Name: ${dishName}\nRestaurant: ${restaurant}\nTotal Cost: ₹${total}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Email not sent');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Payment Successful and Email Sent');
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
