// Module imports
require("dotenv").config();

// Function that sends the notification email
/* parameters requred:
  to: an email address string or array of email address strings
  subject: string for the email subject line
  text: plain text string for the body of the email
*/
const notify = (toUser, subjectLine, content) => {
  // This imported module needs supplied parameters
  const send = require('gmail-send')({
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    to: toUser,
    subject: subjectLine,
    text: content
  });

  // Async function that uses gmail-send module to send emails
  const sendEmail = async () => {
    try {
      // Use supplied parameters for the email contents
      const res = await send();
    }
    catch (err) { console.error('ERROR!', err); }
  }

  // Call the function
  sendEmail();
}

module.exports = notify;