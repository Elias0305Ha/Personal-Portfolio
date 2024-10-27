import MailchimpSubscribe from "react-mailchimp-subscribe";
import { Newsletter } from "./Newsletter";

export const MailchimpForm = () => {
  // Define postUrl using the environment variables
  const postUrl = `${process.env.REACT_APP_MAILCHIMP_URL}?u=${process.env.REACT_APP_MAILCHIMP_U}&id=${process.env.REACT_APP_MAILCHIMP_ID}`;

  // Log each environment variable individually to check if they’re loading correctly
  console.log("Mailchimp URL:", process.env.REACT_APP_MAILCHIMP_URL);
  console.log("Mailchimp User ID:", process.env.REACT_APP_MAILCHIMP_U);
  console.log("Mailchimp Audience ID:", process.env.REACT_APP_MAILCHIMP_ID);

  return (
    <>
      <MailchimpSubscribe
        url={postUrl}  // Use the postUrl we defined
        render={({ subscribe, status, message }) => {
          console.log("Subscription status:", status);  // Log the subscription status
          console.log("Subscription message:", message);  // Log the subscription message
          return (
            <Newsletter
              status={status}
              message={typeof message === 'string' ? message : "An error occurred"}
              onValidated={formData => subscribe(formData)}
            />
          );
        }}
      />
    </>
  );
};
