import { useState } from 'react';
import { generateInvitation, publishInvitation } from '../services/api';
import Header from '../components/layout/Header';
import StepProgress from '../components/layout/StepProgress';
import EventForm from '../components/form/EventForm';
import VariationPicker from '../components/form/VariationPicker';
import GuestListInput from '../components/form/GuestListInput';
import InvitationPreview from '../components/form/InvitationPreview';
import GallerySection from '../components/GallerySection';
import ErrorBanner from '../components/ui/ErrorBanner';
import { InlineSpinner } from '../components/ui/LoadingSpinner';

export function Home({ onPublished, showToast }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});

  // Form data
  const [formData, setFormData] = useState({
    eventType: 'Wedding',
    theme: 'elegant',
    hostNames: '',
    dateTime: '',
    tone: 'formal',
    venueName: '',
    venueAddress: '',
    mapsLink: '',
    dressCode: '',
    language: 'en',
    music: 'wedding1',
  });

  // AI variations
  const [variations, setVariations] = useState([]);
  const [selectedVariation, setSelectedVariation] = useState(0);

  // Guest list
  const [guestList, setGuestList] = useState('');

  // Gallery images
  const [galleryImages, setGalleryImages] = useState([]);

  const updateForm = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    // Clear field error when user types
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const required = ['hostNames', 'dateTime', 'venueName', 'venueAddress', 'dressCode'];

    for (const field of required) {
      if (!formData[field]?.trim()) {
        const labels = {
          hostNames: 'Host Names',
          dateTime: 'Date & Time',
          venueName: 'Venue Name',
          venueAddress: 'Venue Address',
          dressCode: 'Dress Code',
        };
        newErrors[field] = `${labels[field]} is required`;
      }
    }

    // URL validation for mapsLink
    if (formData.mapsLink && !formData.mapsLink.startsWith('http')) {
      newErrors.mapsLink = 'Please enter a valid URL starting with http';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGenerateAI = async () => {
    if (!validateForm()) {
      setError('Please fill in all required fields');
      showToast?.('Please fill in all required fields', 'error');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await generateInvitation(formData);
      setVariations(response.variations);
      setSelectedVariation(0);
      setCurrentStep(2);
      showToast?.('AI generated 3 invitation styles!', 'success');
    } catch (err) {
      setError(err.message || 'Failed to generate invitation');
      showToast?.(err.message || 'Failed to generate invitation', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    const guests = guestList.split('\n').filter(line => line.trim());

    if (guests.length === 0) {
      setError('Please enter at least one guest name');
      showToast?.('Please enter at least one guest name', 'error');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await publishInvitation(
        formData,
        variations,
        selectedVariation,
        guests
      );
      showToast?.('Invitation published successfully!', 'success');
      onPublished?.(response);
    } catch (err) {
      setError(err.message || 'Failed to publish invitation');
      showToast?.(err.message || 'Failed to publish invitation', 'error');
    } finally {
      setLoading(false);
    }
  };

  const goToStep1 = () => {
    setCurrentStep(1);
    setError('');
  };

  return (
    <div className="gradient-bg min-h-screen">
      <Header />

      <main className="max-w-3xl mx-auto px-5 py-10 md:py-14">
        {/* Hero Text */}
        <div className="text-center mb-10 animate-fade-in-up">
          <p className="text-primary font-medium tracking-[0.2em] text-xs uppercase mb-3">
            Create Something Beautiful
          </p>
          <h2 className="text-3xl md:text-5xl font-elegant text-gray-800 mb-3 leading-tight">
            Elegant Invitations,<br className="hidden md:block" /> Crafted by AI
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-lg mx-auto">
            Fill in your event details and let our AI generate a personalized, stunning invitation with shareable links for every guest.
          </p>
        </div>

        <StepProgress currentStep={currentStep} />

        <ErrorBanner message={error} onDismiss={() => setError('')} />

        {/* Step 1: Event Form */}
        {currentStep === 1 && (
          <EventForm
            formData={formData}
            onChange={updateForm}
            onSubmit={handleGenerateAI}
            loading={loading}
            errors={errors}
          />
        )}

        {/* Step 2: Preview & Guest List */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in-up">
            <VariationPicker
              variations={variations}
              selectedIndex={selectedVariation}
              onSelect={setSelectedVariation}
            />

            <GallerySection
              images={galleryImages}
              editable={true}
              onChange={setGalleryImages}
              language={formData.language}
            />

            <GuestListInput
              value={guestList}
              onChange={setGuestList}
            />

            <InvitationPreview
              variation={variations[selectedVariation]}
              formData={formData}
            />

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={goToStep1}
                className="btn-outline flex-1 py-3.5 rounded-xl text-sm flex items-center justify-center gap-2"
              >
                <i className="fas fa-arrow-left text-xs"></i> Back
              </button>
              <button
                onClick={handlePublish}
                disabled={loading}
                className="btn-primary flex-1 py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <InlineSpinner />
                    <span>Publishing...</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane text-xs"></i>
                    <span>Publish Invitation</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;
