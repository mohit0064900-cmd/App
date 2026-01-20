import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Mail, MessageCircle, Phone, MapPin, Clock, Send, Github, Linkedin, Twitter } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help via email',
      contact: 'support@polo.dev',
      action: 'mailto:support@polo.dev'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our team',
      contact: 'Available 24/7',
      action: '#'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with us',
      contact: '+1 (555) 123-4567',
      action: 'tel:+15551234567'
    }
  ];

  const officeLocations = [
    {
      city: 'San Francisco',
      address: '123 Tech Street, Suite 456',
      zipCode: 'San Francisco, CA 94105',
      timezone: 'PST (UTC-8)'
    },
    {
      city: 'New York',
      address: '789 Developer Ave, Floor 10',
      zipCode: 'New York, NY 10001',
      timezone: 'EST (UTC-5)'
    },
    {
      city: 'London',
      address: '456 Code Lane, Building 12',
      zipCode: 'London, UK EC1A 1BB',
      timezone: 'GMT (UTC+0)'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      name: 'GitHub',
      url: 'https://github.com/polo-dev',
      color: 'hover:text-gray-900'
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/polo-dev',
      color: 'hover:text-blue-600'
    },
    {
      icon: Twitter,
      name: 'Twitter',
      url: 'https://twitter.com/polo_dev',
      color: 'hover:text-blue-400'
    }
  ];

  const faqItems = [
    {
      question: 'How do I get started with POLO?',
      answer: 'Simply visit our compiler page and start coding! No registration required for basic use.'
    },
    {
      question: 'What programming languages are supported?',
      answer: 'We support C, C++, Java, Python, JavaScript, and C# with more languages coming soon.'
    },
    {
      question: 'Is there a limit on code execution?',
      answer: 'Free users have execution limits. Pro users get higher limits and priority execution.'
    },
    {
      question: 'Can I save my code?',
      answer: 'Yes! Create a free account to save your code snippets and access them from anywhere.'
    },
    {
      question: 'How secure is the code execution?',
      answer: 'All code runs in secure, isolated Docker containers with strict resource limits.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl mb-8">
              Have questions about POLO? Need support? Want to share feedback? We'd love to hear from you.
            </p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              How Can We Help?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.action}
                  className="card hover:shadow-xl transition transform hover:-translate-y-1 text-center"
                >
                  <method.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {method.description}
                  </p>
                  <p className="text-blue-600 font-medium">
                    {method.contact}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Send us a Message
                </h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="What's this about?"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows="6"
                      value={formData.message}
                      onChange={handleChange}
                      className="input-field resize-none"
                      placeholder="Tell us more about your question or feedback..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Other Ways to Reach Us
                </h2>
                
                {/* Response Time */}
                <div className="card mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-semibold text-gray-900">Response Time</h3>
                  </div>
                  <ul className="space-y-2 text-gray-600">
                    <li><strong>Email:</strong> Usually within 24 hours</li>
                    <li><strong>Live Chat:</strong> Immediate response</li>
                    <li><strong>Phone:</strong> During business hours</li>
                    <li><strong>Critical Issues:</strong> Priority support</li>
                  </ul>
                </div>

                {/* Social Media */}
                <div className="card mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-gray-600 ${social.color} transition`}
                        title={social.name}
                      >
                        <social.icon className="w-6 h-6" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Support Hours */}
                <div className="card">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Support Hours</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM PST</li>
                    <li><strong>Saturday:</strong> 10:00 AM - 4:00 PM PST</li>
                    <li><strong>Sunday:</strong> Emergency support only</li>
                    <li><strong>Email Support:</strong> 24/7</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Office Locations */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Our Locations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {officeLocations.map((office, index) => (
                <div key={index} className="card text-center">
                  <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {office.city}
                  </h3>
                  <p className="text-gray-600 mb-1">{office.address}</p>
                  <p className="text-gray-600 mb-2">{office.zipCode}</p>
                  <p className="text-sm text-blue-600">{office.timezone}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <div key={index} className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.question}
                  </h3>
                  <p className="text-gray-600">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">
                Still have questions? We're here to help!
              </p>
              <a href="mailto:support@polo.dev" className="btn-primary">
                Contact Support
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Coding?
            </h2>
            <p className="text-xl mb-8">
              Don't let questions hold you back - try POLO now and see the difference
            </p>
            <a href="/compiler" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block">
              Launch Compiler
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;