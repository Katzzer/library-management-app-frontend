import React from 'react';

const contact: React.FC = () => {
  return (
      <div className="container my-5">
        <h1 className="mb-4 text-center">Contact Us</h1>
        <p className="text-center">
          We&#39;d love to hear from you! Please fill out the form below or reach out to us using the provided contact details.
        </p>

        <div className="row mt-5">
          {/* Contact Form */}
          <div className="col-md-6">
            <h2>Send Us a Message</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter your name"
                    required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                    className="form-control"
                    id="message"
                    rows={5}
                    placeholder="Write your message here"
                    required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="col-md-6">
            <h2>Get in Touch</h2>
            <p>If you&#39;d prefer, you can contact us directly through the details below:</p>
            <ul className="list-unstyled">
              <li>
                <strong>Phone:</strong> +1 234 567 890
              </li>
              <li>
                <strong>Email:</strong> info@pavelkostal.com
              </li>
              <li>
                <strong>Address:</strong> 123 Food Street, Culinary City, USA
              </li>
            </ul>
            <h3 className="mt-4">Follow Us</h3>
            <p>Stay connected with us on social media:</p>
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="#" className="text-primary">Facebook</a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-info">Twitter</a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-danger">Instagram</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
  );
};

export default contact;