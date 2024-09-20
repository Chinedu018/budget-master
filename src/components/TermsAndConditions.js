import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const TermsAndConditions = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h2>Terms and Conditions</h2>
            </Card.Header>
            <Card.Body>
              <h3>1. Introduction</h3>
              <p>
                Welcome to our application. These terms and conditions outline the rules and regulations for the use of our service.
              </p>
              <h3>2. Consent</h3>
              <p>
                By accessing this application, we assume you accept these terms and conditions. Do not continue to use the application if you do not agree to all the terms and conditions stated on this page.
              </p>
              <h3>3. Personal Data</h3>
              <p>
                We are committed to protecting your personal data. We will only process personal data in accordance with applicable data protection laws, including the GDPR. Our privacy policy, which explains how we handle your data, is available <a href="/privacy-policy">here</a>.
              </p>
              <h3>4. User Responsibilities</h3>
              <p>
                As a user, you are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer or device. You agree to accept responsibility for all activities that occur under your account or password.
              </p>
              <h3>5. Prohibited Activities</h3>
              <p>
                You are prohibited from using the application for any unlawful purpose or to solicit others to perform or participate in any unlawful acts.
              </p>
              <h3>6. Intellectual Property</h3>
              <p>
                All content included in this application, such as text, graphics, logos, images, and software, is the property of our company or its content suppliers and is protected by copyright laws.
              </p>
              <h3>7. Limitation of Liability</h3>
              <p>
                We will not be liable for any damages that may occur to you as a result of your misuse of our service.
              </p>
              <h3>8. Changes to These Terms</h3>
              <p>
                We reserve the right to amend these terms and conditions at any time. Any changes will be posted on this page.
              </p>
              <h3>9. Contact Information</h3>
              <p>
                If you have any questions about these Terms and Conditions, please contact us at [your contact information].
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TermsAndConditions;
