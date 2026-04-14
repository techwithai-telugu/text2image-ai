import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import MobileHeader from './MobileHeader';

const HelpContact = () => {
  const [activeTab, setActiveTab] = useState<'help' | 'report' | 'contact'>('help');
  const [reportText, setReportText] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    { q: 'How do I generate an image?', a: 'Go to the Create tab, type a prompt describing what you want, choose a style and aspect ratio, then tap "Generate".' },
    { q: 'Why is my image not generating?', a: 'Check your internet connection. The AI service may be temporarily unavailable. Try again in a few moments.' },
    { q: 'How do I save my images?', a: 'Images are saved automatically to your gallery. You can also download them using the download button in the image viewer.' },
    { q: 'What does Safe Mode do?', a: 'Safe Mode filters out inappropriate or adult content. It is enabled by default. Disabling requires a special passcode.' },
    { q: 'Can I delete my images?', a: 'Yes — open the Gallery, tap the select icon, choose images, and delete. Or use the delete button in the image viewer.' },
    { q: 'How do I change the theme?', a: 'Go to Settings → Theme to switch between Dark, Light, and Auto modes.' },
    { q: 'How do I change the accent color?', a: 'Go to Settings → Accent Color and tap any color to apply it instantly.' },
    { q: 'Is my data private?', a: 'Absolutely. All your images and settings are stored locally on your device only. We do not collect any personal data.' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setReportText('');
    setContactName('');
    setContactEmail('');
    setContactMsg('');
  };

  return (
    <div className="legal-page">
      <Navigation />
      <MobileHeader title="Help & Contact" showLogo />


      <div className="legal-content">
        <div className="legal-hero">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <h1 className="legal-title">Help &amp; Support</h1>
          <p className="legal-updated">We're here to help you</p>
        </div>

        {/* Tabs */}
        <div className="help-tabs">
          {(['help', 'report', 'contact'] as const).map((tab) => (
            <button
              key={tab}
              className={`help-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'help' ? 'FAQ' : tab === 'report' ? 'Report' : 'Contact'}
            </button>
          ))}
        </div>

        {/* FAQ */}
        {activeTab === 'help' && (
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.q} className="faq-item">
                <summary className="faq-question">{faq.q}</summary>
                <p className="faq-answer">{faq.a}</p>
              </details>
            ))}
          </div>
        )}

        {/* Report */}
        {activeTab === 'report' && (
          <form className="help-form" onSubmit={handleSubmit}>
            <h2 className="help-form-title">Report an Issue</h2>
            <p className="help-form-desc">Found a bug or have a concern? Tell us and we'll look into it.</p>
            <textarea
              className="help-textarea"
              placeholder="Describe the issue in detail..."
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
              rows={6}
              required
            />
            <button className="help-submit-btn" type="submit">
              {submitted ? '✓ Submitted!' : 'Submit Report'}
            </button>
          </form>
        )}

        {/* Contact */}
        {activeTab === 'contact' && (
          <form className="help-form" onSubmit={handleSubmit}>
            <h2 className="help-form-title">Contact Us</h2>
            <p className="help-form-desc">Have a question or suggestion? We'd love to hear from you.</p>
            <input
              className="help-input"
              placeholder="Your Name"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              required
            />
            <input
              className="help-input"
              placeholder="Your Email"
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              required
            />
            <textarea
              className="help-textarea"
              placeholder="Your message..."
              value={contactMsg}
              onChange={(e) => setContactMsg(e.target.value)}
              rows={5}
              required
            />
            <button className="help-submit-btn" type="submit">
              {submitted ? '✓ Sent!' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default HelpContact;
