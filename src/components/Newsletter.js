import { useState, useEffect } from "react";
import { Col, Row, Alert } from "react-bootstrap";

export const Newsletter = ({ status, message, onValidated }) => {
  const [email, setEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [subscriptionMessage, setSubscriptionMessage] = useState('');

  useEffect(() => {   
    if (status === 'success') clearFields();
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && email.indexOf("@") > -1) {  // Basic validation for email
      setSubscriptionStatus("sending");

      try {
        // Make a POST request to our backend server at /subscribe
        const response = await fetch('http://localhost:3001/subscribe', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email })
        });

        const data = await response.json();

        if (response.ok) {
          setSubscriptionStatus("success");
          setSubscriptionMessage(data.message);
        } else {
          setSubscriptionStatus("error");
          setSubscriptionMessage(data.message || "An error occurred.");
        }
      } catch (error) {
        setSubscriptionStatus("error");
        setSubscriptionMessage("An error occurred. Please try again.");
      }
    }
  }

  const clearFields = () => {
    setEmail('');
  }

  return (
    <Col lg={12}>
      <div className="newsletter-bx wow slideInUp">
        <Row>
          <Col lg={12} md={6} xl={5}>
            <h3>Subscribe to our Newsletter<br /> & Never miss latest updates</h3>
            {subscriptionStatus === 'sending' && <Alert>Sending...</Alert>}
            {subscriptionStatus === 'error' && <Alert variant="danger">{subscriptionMessage}</Alert>}
            {subscriptionStatus === 'success' && <Alert variant="success">{subscriptionMessage}</Alert>}
          </Col>
          <Col md={6} xl={7}>
            <form onSubmit={handleSubmit}>
              <div className="new-email-bx">
                <input
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                />
                <button type="submit">Submit</button>
              </div>
            </form>
          </Col>
        </Row>
      </div>
    </Col>
  );
};
