import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";
import { Snackbar } from "@mui/material";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1350px;
  padding: 0px 0px 80px 0px;
  gap: 12px;
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: white; /* Title in white */
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: white; /* Description text in white */
`;

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: black; /* Form background black */
  padding: 32px;
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;

const ContactInput = styled.input`
  flex: 1;
  border: 1px solid #555;
  outline: none;
  font-size: 18px;
  padding: 12px 16px;
  border-radius: 12px;
  background: black;
  color: white; /* White text */
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  border: 1px solid #555;
  outline: none;
  font-size: 18px;
  padding: 12px 16px;
  border-radius: 12px;
  background: black;
  color: white; /* White text */
`;

const ContactButton = styled.button`
  width: 100%;
  background: ${(props) => (props.disabled ? "#ccc" : "linear-gradient(225deg, #6a11cb 0%, #2575fc 100%)")};
  padding: 13px 16px;
  border-radius: 12px;
  border: none;
  color: white;
  font-size: 18px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-weight: 600;
`;

const Contact = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    from_email: "",
    from_name: "",
    subject: "",
    message: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const { from_email, from_name, subject, message } = formData;
    setIsFormValid(from_email !== "" && from_name !== "" && subject !== "" && message !== "");
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value.trim() }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid) {
      alert("All fields are required!");
      return;
    }

    emailjs
      .sendForm("service_j87md9s", "template_ml8qcqe", form.current, "Ku_ulZFzp_8mCFnAx")
      .then(() => {
        setOpen(true);
        form.current.reset();
        setFormData({ from_email: "", from_name: "", subject: "", message: "" });
      })
      .catch((error) => console.log(error.text));
  };

  return (
    <Container>
      <Wrapper>
        <Title>Contact</Title>
        <Desc>Got questions? Let’s talk!</Desc>
        <ContactForm ref={form} onSubmit={handleSubmit}>
          <ContactInput placeholder="Your Email" name="from_email" value={formData.from_email} onChange={handleChange} />
          <ContactInput placeholder="Your Name" name="from_name" value={formData.from_name} onChange={handleChange} />
          <ContactInput placeholder="Subject" name="subject" value={formData.subject} onChange={handleChange} />
          <ContactInputMessage placeholder="Message" rows="4" name="message" value={formData.message} onChange={handleChange} />
          <ContactButton type="submit" disabled={!isFormValid}>
            Send
          </ContactButton>
        </ContactForm>
        <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)} message="Email sent successfully!" />
      </Wrapper>
    </Container>
  );
};

export default Contact;
