// Import required modules from the 'googleapis' library.
const { google } = require("googleapis");

// Import credentials from a separate file.
const {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  REFRESH_TOKEN,
} = require("./credentials");

// Create an OAuth2 client instance.
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// Set OAuth2 client credentials using the refresh token.
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// Set to keep track of users who have already received a reply.
const repliedUsers = new Set();

// Function to check emails and send replies.
async function checkEmailsAndSendReplies() {
  try {
    // Create a Gmail instance using the OAuth2 client.
    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

    // Get the list of unread messages.
    const res = await gmail.users.messages.list({
      userId: "me",
      q: "is:unread",
    });
    const messages = res.data.messages;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (messages && messages.length > 0) {
      for (const message of messages) {
        // Get the details of the current email.
        const email = await gmail.users.messages.get({
          userId: "me",
          id: message.id,
        });

        // Extract the date the email was sent.
        const sentDateHeader = email.data.payload.headers.find(
          (header) => header.name === 'Date'
        );
        const sentDate = sentDateHeader ? new Date(sentDateHeader.value) : null;

        // Check if the email was sent today.
        const isSentToday =
          sentDate && sentDate.toDateString() === today.toDateString();

        if (!isSentToday) {
          console.log('No new mails today :).');
          break;
        }

        console.log('This email was sent today.');

        // Extract relevant information from the email headers.
        const from = email.data.payload.headers.find(
          (header) => header.name === "From"
        );
        const toHeader = email.data.payload.headers.find(
          (header) => header.name === "To"
        );
        const Subject = email.data.payload.headers.find(
          (header) => header.name === "Subject"
        );

        const From = from.value;
        const toEmail = toHeader.value;
        const subject = Subject.value;
        console.log("email come From", From);
        console.log("to Email", toEmail);

        // Check if the user has already been replied to.
        if (repliedUsers.has(From)) {
          console.log("Already replied to : ", From);
          continue;
        }

        // Get the email thread.
        const thread = await gmail.users.threads.get({
          userId: "me",
          id: message.threadId,
        });

        // Get the replies in the thread.
        const replies = thread.data.messages.slice(1);

        // If no replies, send a new reply.
        if (replies.length === 0) {
          // Send a reply.
          await gmail.users.messages.send({
            userId: "me",
            requestBody: {
              raw: await createReplyRaw(toEmail, From, subject),
            },
          });

          // Add a label to the original email.
          const labelName = "onVacation";
          await gmail.users.messages.modify({
            userId: "me",
            id: message.id,
            requestBody: {
              addLabelIds: [await createLabelIfNeeded(labelName)],
            },
          });

          console.log("Sent reply to email:", From);

          // Add the user to the replied set to avoid duplicate replies.
          repliedUsers.add(From);
        }
      }
    }
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

// Function to create a raw email reply.
async function createReplyRaw(from, to, subject) {
  const emailContent = `From: ${from}\nTo: ${to}\nSubject: ${subject}\n\nThank you for your message. I am unavailable right now, but will respond as soon as possible...`;
  const base64EncodedEmail = Buffer.from(emailContent)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return base64EncodedEmail;
}

// Function to create a label if it does not exist.
async function createLabelIfNeeded(labelName) {
  const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

  // Check if the label already exists.
  const res = await gmail.users.labels.list({ userId: "me" });
  const labels = res.data.labels;

  const existingLabel = labels.find((label) => label.name === labelName);
  if (existingLabel) {
    return existingLabel.id;
  }

  // Create a new label.
  const newLabel = await gmail.users.labels.create({
    userId: "me",
    requestBody: {
      name: labelName,
      labelListVisibility: "labelShow",
      messageListVisibility: "show",
    },
  });

  return newLabel.data.id;
}

// Function to generate a random interval.
function getRandomInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set up an interval to periodically check emails and send replies.
setInterval(checkEmailsAndSendReplies, getRandomInterval(10, 20) * 1000);
