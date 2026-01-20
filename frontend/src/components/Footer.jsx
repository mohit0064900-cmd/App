import { useEffect, useState } from 'react';
import { Linkedin, Github, Instagram, Youtube, Twitter } from 'lucide-react';
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

  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-6">
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
                  className="hover:text-primary-400 transition transform hover:scale-110"
                >
                  <Icon className="w-6 h-6" />
                </a>
              );
            })}
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Learning Platform by Mohit Dwivedi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
