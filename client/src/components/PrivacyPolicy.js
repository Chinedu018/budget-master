import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const PrivacyPolicy = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h2>Privacy Policy</h2>
            </Card.Header>
            <Card.Body>
              <h3>1. Introduction</h3>
              <p>
                We value your privacy and are committed to protecting your personal data. This privacy policy will inform you how we handle your personal data.
              </p>
              <h3>2. Data Collection</h3>
              <p>
                We collect personal data when you register on our site, place an order, subscribe to our newsletter, or fill out a form. The data collected may include your name, email address, phone number, and payment information.
              </p>
              <h3>3. Use of Data</h3>
              <p>
                We use your data to personalize your experience, improve our website, process transactions, and send periodic emails.
              </p>
              <h3>4. Data Protection Rights</h3>
              <p>
                Under the GDPR, you have the right to access, rectify, erase, restrict, or object to the processing of your personal data. You also have the right to data portability.
              </p>
              <h3>5. Data Security</h3>
              <p>
                We implement a variety of security measures to maintain the safety of your personal data.
              </p>
              <h3>6. Third-Party Disclosure</h3>
              <p>
                We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties without your consent, except to trusted third parties who assist us in operating our website or conducting our business.
              </p>
              <h3>7. Changes to This Policy</h3>
              <p>
                We may update this privacy policy from time to time. Any changes will be posted on this page.
              </p>
              <h3>8. Contact Us</h3>
              <p>
                If you have any questions about this privacy policy, please contact us at [your contact information].
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PrivacyPolicy;
