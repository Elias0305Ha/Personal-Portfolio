const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


dotenv.config();  // Initialize dotenv to load environment variables

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(3001, () => console.log("Server Running on port 3001"));
console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);

// Nodemailer setup for contact form emails
const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS 
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

// Existing /contact route
router.post("/contact", (req, res) => {
  const name = req.body.firstName + " " + req.body.lastName;
  const email = req.body.email;
  const message = req.body.message;
  const phone = req.body.phone;
  const mail = {
    from: name,
    to: "erdunoelias@gmail.com",
    subject: "Contact Form Submission - Portfolio",
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Phone: ${phone}</p>
           <p>Message: ${message}</p>`,
  };
  
  contactEmail.sendMail(mail, (error,info) => {
    if (error) {
      console.log("Error sending email:", error);
      res.json(error);
    } else {
      console.log("Email sent successfully:", info.response);
      res.json({ code: 200, status: "Message Sent" });
    }
  });
});


// New /subscribe route for Mailchimp
router.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  try {
    const response = await fetch(`${process.env.REACT_APP_MAILCHIMP_URL}/lists/${process.env.REACT_APP_MAILCHIMP_ID}/members`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`anystring:${process.env.REACT_APP_MAILCHIMP_U}`).toString('base64')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed'
      })
    });

    const data = await response.json();

    if (data.status === 'subscribed') {
      res.status(200).json({ message: 'Successfully subscribed!' });
    } else {
      res.status(400).json({ message: data.detail || 'An error occurred.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
});



