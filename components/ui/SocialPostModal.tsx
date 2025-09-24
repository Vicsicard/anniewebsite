import React from 'react';
import Modal from './Modal';
import Image from 'next/image';

interface SocialPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: {
    title: string;
    content: string;
    platform: string;
    publishedAt: string;
    image?: string;
  };
}

const SocialPostModal: React.FC<SocialPostModalProps> = ({ isOpen, onClose, post }) => {
  // Format date
  const formattedDate = post.publishedAt ? 
    new Date(post.publishedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : '';

  // Platform-specific styling
  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin': return 'text-[#0077B5]';
      case 'twitter': return 'text-[#1DA1F2]';
      case 'instagram': return 'text-[#E1306C]';
      case 'facebook': return 'text-[#1877F2]';
      default: return 'text-gray-700';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={post.title || 'Social Media Post'}>
      <div className="space-y-4">
        {post.image && (
          <div className="relative h-64 w-full mb-4">
            <Image 
              src={post.image} 
              alt={post.title || 'Social media post image'} 
              layout="fill" 
              objectFit="cover" 
              className="rounded-lg"
            />
          </div>
        )}
        
        <div className="flex items-center">
          <span className={`font-medium ${getPlatformColor(post.platform)} mr-2`}>
            {post.platform.charAt(0).toUpperCase() + post.platform.slice(1)}
          </span>
          <span className="text-sm text-gray-500">{formattedDate}</span>
        </div>
        
        <div className="prose max-w-none">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default SocialPostModal;
