import { useEffect, useState } from 'react';
import { Linkedin, Github, Instagram, Youtube, Twitter, Code } from 'lucide-react';
import { Link } from 'react-router-dom';
import { socialService } from '../services/socialService';

const Footer = () => {
  const [socialLinks, setSocialLinks] = useState({});

  useEffect(() => {
    loadSocialLinks();
  }, []);

  const loadSocialLinks = async () => {
    try {
      const response = await socialService.getAllLinks();
      setSocialLinks(response.links);
    } catch (error) {
      console.error('Failed to load social links');
    }
  };

  const socialIcons = {
    linkedin: { Icon: Linkedin, color: '#0077b5' },
    github: { Icon: Github, color: '#333' },
    instagram: { Icon: Instagram, color: '#E4405F' },
    youtube: { Icon: Youtube, color: '#FF0000' },
    twitter: { Icon: Twitter, color: '#1DA1F2' }
  };

  const footerLinks = [
    { label: 'Home', to: '/' },
    { label: 'Compiler', to: '/compiler' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                POLO
              </span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              Programming Online Language Organizer - Your modern, secure, and high-performance online compiler for students, educators, and developers.
            </p>
            <div className="flex space-x-4">
              {Object.entries(socialLinks).map(([platform, data]) => {
                const iconData = socialIcons[platform];
                if (!iconData) return null;
                const { Icon } = iconData;
                
                return (
                  <a
                    key={platform}
                    href={data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-400 transition transform hover:scale-110"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-blue-400 transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Multi-Language Support</li>
              <li>Secure Execution</li>
              <li>VS Code Editor</li>
              <li>Real-time Results</li>
              <li>Cloud-based</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} POLO. All rights reserved. Built with modern web technologies.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link to="/about" className="text-gray-400 hover:text-blue-400 transition">
              About
            </Link>
            <Link to="/contact" className="text-gray-400 hover:text-blue-400 transition">
              Contact
            </Link>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
