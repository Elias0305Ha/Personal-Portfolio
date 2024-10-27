import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Contact = () => {
    
    const formInitialDetails = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      }

    const [formDetails, setFormDetails] = useState(formInitialDetails);
    const [buttonText, setButtonText] = useState('Send');
    const [status, setStatus] = useState({});

    const onFormUpdate = (category, value) => {
        setFormDetails({
          ...formDetails,
          [category]: value
        })
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("Form submitted, setting button text to 'Sending...'");
      setButtonText("Sending...");  // Set to "Sending..." immediately
  
      try {
          console.log("Sending form data to server...");
          let response = await fetch("http://localhost:3001/contact", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json;charset=utf-8",
              },
              body: JSON.stringify(formDetails),
          });
  
          console.log("Received response from server:", response);
          // Ensure response is OK before parsing JSON
          if (!response.ok) {
              throw new Error(`Server responded with status ${response.status}`);
          }
  
          let result = await response.json();
          console.log("Parsed response JSON:", result);
  
          if (result.code === 200) {
              console.log("Message sent successfully. Clearing form fields and updating status.");
              setStatus({ success: true, message: 'Message sent successfully' });
              setFormDetails(formInitialDetails);  // Clear the form fields
          } else {
              console.log("Server responded with an error:", result.status);
              setStatus({ success: false, message: 'Something went wrong, please try again later.' });
          }
      } catch (error) {
          console.log("Error sending form data:", error.message);
          setStatus({ success: false, message: 'Network error. Please try again later.' });
      } finally {
          console.log("Resetting button text to 'Send'");
          setButtonText("Send");
      }
  };
  
    

    return (
        <section className="contact" id="connect">
          <Container>
            <Row className="align-items-center">
              <Col md={6}>
                    <img src={contactImg} alt="Contact Us"/>      
              </Col>
              <Col md={6}>
                    <h2>Get In Touch</h2>
                    <form onSubmit={handleSubmit}>
                      <Row>
                        <Col size={12} sm={6} className="px-1">
                          <input type="text" value={formDetails.firstName} placeholder="First Name" onChange={(e) => onFormUpdate('firstName', e.target.value)} />
                        </Col>
                        <Col size={12} sm={6} className="px-1">
                          <input type="text" value={formDetails.lastName} placeholder="Last Name" onChange={(e) => onFormUpdate('lastName', e.target.value)}/>
                        </Col>
                        <Col size={12} sm={6} className="px-1">
                          <input type="email" value={formDetails.email} placeholder="Email Address" onChange={(e) => onFormUpdate('email', e.target.value)} />
                        </Col>
                        <Col size={12} sm={6} className="px-1">
                          <input type="tel" value={formDetails.phone} placeholder="Phone No." onChange={(e) => onFormUpdate('phone', e.target.value)}/>
                        </Col>
                        <Col size={12} className="px-1">
                          <textarea rows="6" value={formDetails.message} placeholder="Message" onChange={(e) => onFormUpdate('message', e.target.value)}></textarea>
                          <button type="submit"><span>{buttonText}</span></button>
                        </Col>
                        {
                          status.message &&
                          <Col>
                            <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                          </Col>
                        }
                      </Row>
                    </form>
              </Col>
            </Row>
          </Container>
        </section>
    )

}
