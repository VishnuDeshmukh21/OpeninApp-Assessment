# OpeninApp-Assessment
 A Node.js based app that is able to respond to emails sent to your Gmail mailbox while you’re out on a vacation. 

 What does the app do?
1. The app checks for new emails in a given Gmail ID.
2. The app sends reply to Emails that have no prior replies
3. The app adds a Label to the email and move the email to the label
4. The app repeats this sequence of steps 1-3 in random intervals of 45 to 120 seconds
-----------------------------------------------------------------------------------------------------------------
# 5 steps to get started
[Create a Google Cloud project](https://developers.google.com/workspace/guides/create-project) for your Google Workspace app, extension, or integration.

[Enable the APIs](https://developers.google.com/workspace/guides/enable-apis) you want to use in your Google Cloud project.

[Learn how authentication and authorization works](https://developers.google.com/workspace/guides/auth-overview) when developing for Google Workspace.

[Configure OAuth consent](https://developers.google.com/workspace/guides/configure-oauth-consent) to ensure users can understand and approve what access your app has to their data.

[Create access credentials](https://developers.google.com/workspace/guides/create-credentials) to authenticate your app's end users or service accounts.


Details:
This app has two files : app.js and credentials.js.
After successfully completion of Google Cloud Setup, we save our credentials in credetials.js file for enabling authetication and Gmail API integration.
The logical part is writtern in app.js.

