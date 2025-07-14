"use client"
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createContact } from '@/redux/slices/contactSlice';
import { toast } from 'react-toastify';


const ContactForm = () => {

  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleForm = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.message) {
      toast.error("All fields are required");
      return;
    }

    try {
      const result = await dispatch(createContact({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message
      }));

      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Thanks for your message! We Will Contact You Shortly");
        setForm({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
      } else {
        toast.error(result.payload || "Something went wrong");
      }
    } catch (err) {
      toast.error("Error sending message");
    }
  };

  return (
    <form className="contact-form" onSubmit={handleForm}>
      <div className="row">
        <div className="col-lg-12">
          <div className="form-group">
            <input
              className="form-control"
              name="name"
              placeholder="Name"
              type="text"
              autoComplete="off"
              required
              value={form.name}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <div className="form-group">
            <input
              className="form-control"
              name="email"
              placeholder="Email*"
              type="email"
              autoComplete="off"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group">
            <input
              className="form-control"
              name="phone"
              placeholder="Phone"
              type="text"
              autoComplete="off"
              required
              value={form.phone}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="form-group comments">
            <textarea
              className="form-control"
              name="message"
              placeholder="Your Message *"
              autoComplete="off"
              required
              value={form.message}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <button type="submit" name="submit" id="submit">
            <i className="fa fa-paper-plane"></i> Get in Touch
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
