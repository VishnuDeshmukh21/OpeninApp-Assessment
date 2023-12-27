# OpeninApp-Assessment
 A Node.js based app that is able to respond to emails sent to your Gmail mailbox while you’re out on a vacation. 

 What does the app do?
1. The app checks for new emails in a given Gmail ID.
2. The app sends reply to Emails that have no prior replies
3. The app adds a Label to the email and move the email to the label
4. The app repeats this sequence of steps 1-3 in random intervals of 45 to 120 seconds

## Detailed Spec of Libraries and Technologies Used

**Programming Language:**

* **JavaScript:** The primary language used for scripting and interacting with Gmail APIs.

**Libraries:**

* **googleapis (v54.0.0):** Provides a Node.js client library for accessing Google APIs, including the Gmail API.
    * Used for:
        * Fetching unread messages (`users.messages.list`)
        * Sending replies (`users.messages.send`)
        * Managing labels (`users.labels.create`, `users.labels.list`, `users.messages.modify`)
        * Accessing email details (`users.messages.get`)
        * Accessing thread information (`users.threads.get`)

**Key Technologies:**

* **OAuth 2.0:** An authorization framework used for secure access to user data with Gmail.
    * Employed to authenticate the application with Gmail and obtain necessary permissions (`new google.auth.OAuth2`).
* **Gmail API v1:** A RESTful API that allows programmatic access to Gmail data and actions.
    * Used for:
        * Listing unread messages with specific query (`q: "is:unread"`)
        * Getting complete message details (`payload.headers`)
        * Sending email replies with base64-encoded content
        * Creating and managing labels for categorization
* **Base64 Encoding:** Used to encode the email content into a format suitable for transmission via the Gmail API (`Buffer.from(emailContent) ... `).
* **Intervals:** `setInterval` is used to repeatedly check for new emails at random intervals between 45 and 120 seconds, aiding in managing API rate limits.
* **Error Handling:** Basic error handling with `try-catch` blocks to log errors during API interactions.

**Additional Considerations:**

* **Credentials:** Stored in a separate `credentials.js` file to protect sensitive information like OAuth client ID, client secret, redirect URI, and refresh token.
* **Rate Limits:** The Gmail API has usage quotas and rate limits. The random intervals between checks help ensure the application operates within these limits.
* **Node.js:** This code is designed to run within the Node.js runtime environment, providing the necessary platform for executing the JavaScript code and interacting with the Gmail API.


Areas where your code can be improved:
1. Credential Storage: Move credentials to environment variables: Achieved by using .env and dotenv.
2. OAuth 2.0 Best Practices: Implement refresh token rotation: Enhance security by periodically obtaining new refresh tokens.
3. Modularization: Break down large functions: Improve readability and maintainability.
4. Filtering Options: Filter emails based on criteria: Target responses more effectively.
5. Whenever we add a new feature, we'll have to make sure it has strong error handling built in. This means the code will be able to catch problems and explain them clearly.


-----------------------------------------------------------------------------------------------------------------
# 6 steps to get started
[Create a Google Cloud project](https://developers.google.com/workspace/guides/create-project) for your Google Workspace app, extension, or integration.

[Enable the APIs](https://developers.google.com/workspace/guides/enable-apis) you want to use in your Google Cloud project.

[Learn how authentication and authorization works](https://developers.google.com/workspace/guides/auth-overview) when developing for Google Workspace.

[Configure OAuth consent](https://developers.google.com/workspace/guides/configure-oauth-consent) to ensure users can understand and approve what access your app has to their data.

[Create access credentials](https://developers.google.com/workspace/guides/create-credentials) to authenticate your app's end users or service accounts.

Clone the repo , update credentials and run : node app.js

