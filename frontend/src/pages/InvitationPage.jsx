import { useRef, useState } from 'react';
import { useCountdown } from '../hooks/useCountdown';
import HeroSection from '../components/HeroSection';
import EventDetails from '../components/EventDetails';
import GallerySection from '../components/GallerySection';
import RSVPForm from '../components/RSVPForm';
import Footer from '../components/Footer';
import OrnamentDivider from '../components/ui/OrnamentDivider';

export function InvitationPage({ data, showMain, onOpen, showToast }) {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(null);
  const countdown = useCountdown(data?.date_time);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  const handleOpen = () => {
    onOpen?.();
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(() => {});
      setIsMuted(false);
    }
  };

  const shareInvitation = () => {
    if (navigator.share) {
      navigator.share({
        title: "You're Invited!",
        text: `${data?.guest_name || 'You'}, you're invited!`,
        url: window.location.href,
      }).catch(() => {
        navigator.clipboard.writeText(window.location.href);
        showToast?.('Link copied!', 'success');
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast?.('Link copied!', 'success');
    }
  };

  const v = data?.variation;
  const language = data?.language || 'en';

  // Opening Page
  if (!showMain) {
    return (
      <div className="min-h-screen gradient-bg flex flex-col items-center justify-center p-6 text-center relative overflow-hidden pattern-overlay">
        {/* Decorative Corners */}
        <svg className="deco-corner-tl" viewBox="0 0 120 120" fill="none">
          <path d="M0 0 C60 0, 120 60, 120 120 L100 120 C100 70, 50 0, 0 0Z" fill="currentColor" className="text-primary" />
        </svg>
        <svg className="deco-corner-br" viewBox="0 0 120 120" fill="none">
          <path d="M0 0 C60 0, 120 60, 120 120 L100 120 C100 70, 50 0, 0 0Z" fill="currentColor" className="text-primary" />
        </svg>

        <div className="relative z-10">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-primary-light to-primary flex items-center justify-center shadow-2xl animate-float mx-auto mb-8">
            <i className="fas fa-heart text-white text-3xl md:text-4xl"></i>
          </div>

          <p className="text-primary font-semibold tracking-[0.3em] text-[11px] uppercase mb-4 animate-fade-in-up">
            {language === 'id' ? 'Anda Diundang' : "You're Invited"}
          </p>

          <h1 className="text-5xl md:text-7xl font-script text-gray-800 animate-fade-in-up delay-100">
            {v?.hero?.headline || data?.host_names || 'The Couple'}
          </h1>

          <OrnamentDivider className="my-6 animate-fade-in-up delay-200" />

          <div className="animate-fade-in-up delay-300">
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">
              {language === 'id' ? 'Kepada' : 'Dear'}
            </p>
            <p className="text-xl md:text-2xl font-elegant font-semibold text-gray-700">
              {data?.guest_name || 'Guest'}
            </p>
          </div>

          <button
            onClick={handleOpen}
            className="mt-10 px-8 py-3.5 btn-primary rounded-full text-sm flex items-center gap-2 mx-auto animate-fade-in-up delay-400"
          >
            <i className="fas fa-envelope-open text-xs"></i>
            {language === 'id' ? 'Buka Undangan' : 'Open Invitation'}
          </button>

          <p className="text-[10px] text-gray-400 mt-8 tracking-wider animate-fade-in-up delay-500">
            AI-Powered Invitation
          </p>
        </div>

        <audio ref={audioRef} loop>
          <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
        </audio>
      </div>
    );
  }

  // Main Invitation Content
  return (
    <div className="invitation-bg min-h-screen">
      {/* Floating Controls */}
      <button
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-50 w-10 h-10 bg-white/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all"
        title="Toggle music"
      >
        <i className={`fas ${isMuted ? 'fa-volume-mute text-gray-400' : 'fa-volume-up text-primary'} text-sm`}></i>
      </button>

      <button
        onClick={shareInvitation}
        className="fixed top-4 left-4 z-50 w-10 h-10 bg-white/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all"
        title="Share invitation"
      >
        <i className="fas fa-share-nodes text-primary text-sm"></i>
      </button>

      {/* Hero Section */}
      <HeroSection
        names={data?.host_names}
        variation={v}
        eventType={data?.event_type}
      />

      {/* Quote Section */}
      <section className="inv-section py-16 px-6 bg-white/60 text-center">
        <div className="max-w-2xl mx-auto reveal visible">
          <i className="fas fa-quote-left text-primary/15 text-4xl mb-4"></i>
          <p className="text-xl md:text-2xl font-arabic text-gray-700 leading-loose">
            And of everything We have created pairs, that you may remember.
          </p>
          <p className="text-gray-500 italic text-sm mt-4">"And We created you in pairs."</p>
          <p className="text-primary font-medium text-xs mt-2 tracking-wider">(Quran 51:49)</p>
        </div>
      </section>

      {/* Couple Section */}
      <section className="inv-section py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            {/* Groom */}
            <div className="text-center reveal visible">
              <div className="photo-frame w-56 h-56 mx-auto mb-6">
                <div className="photo-frame-inner">
                  <i className="fas fa-user text-5xl text-primary/40"></i>
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-elegant font-semibold text-gray-800 mb-2">
                {data?.host_names?.split('&')[0]?.trim() || 'The Groom'}
              </h3>
              <OrnamentDivider className="my-3" />
              <p className="text-gray-500 text-sm">Son of</p>
              <p className="text-gray-700 font-medium text-sm">Mr. & Mrs. Smith</p>
            </div>

            {/* Bride */}
            <div className="text-center reveal visible delay-200">
              <div className="photo-frame bride w-56 h-56 mx-auto mb-6">
                <div className="photo-frame-inner">
                  <i className="fas fa-user text-5xl text-secondary/40"></i>
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-elegant font-semibold text-gray-800 mb-2">
                {data?.host_names?.split('&')[1]?.trim() || 'The Bride'}
              </h3>
              <OrnamentDivider className="my-3" />
              <p className="text-gray-500 text-sm">Daughter of</p>
              <p className="text-gray-700 font-medium text-sm">Mr. & Mrs. Johnson</p>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <EventDetails
        variation={v}
        mapsLink={data?.maps_link}
        dateTime={data?.date_time}
        dressCode={data?.dress_code}
        language={language}
      />

      {/* Countdown */}
      <section className="inv-section py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto reveal visible">
          <p className="text-primary font-semibold tracking-[0.25em] text-[11px] uppercase mb-3">
            {language === 'id' ? 'Menghitung Mundur' : 'Counting Down'}
          </p>
          <h3 className="text-2xl md:text-3xl font-elegant font-semibold text-gray-800 mb-10">
            {language === 'id' ? 'Menuju Hari Bahagia' : 'Until The Big Day'}
          </h3>

          <div className="grid grid-cols-4 gap-3 md:gap-5">
            <div className="countdown-item rounded-2xl p-4 md:p-6 shadow-md">
              <p className="text-2xl md:text-4xl font-bold number">
                {String(countdown.days).padStart(2, '0')}
              </p>
              <p className="text-gray-400 text-[10px] md:text-xs font-semibold uppercase tracking-wider mt-1">
                {language === 'id' ? 'Hari' : 'Days'}
              </p>
            </div>
            <div className="countdown-item rounded-2xl p-4 md:p-6 shadow-md">
              <p className="text-2xl md:text-4xl font-bold number">
                {String(countdown.hours).padStart(2, '0')}
              </p>
              <p className="text-gray-400 text-[10px] md:text-xs font-semibold uppercase tracking-wider mt-1">
                {language === 'id' ? 'Jam' : 'Hours'}
              </p>
            </div>
            <div className="countdown-item rounded-2xl p-4 md:p-6 shadow-md">
              <p className="text-2xl md:text-4xl font-bold number">
                {String(countdown.minutes).padStart(2, '0')}
              </p>
              <p className="text-gray-400 text-[10px] md:text-xs font-semibold uppercase tracking-wider mt-1">
                {language === 'id' ? 'Menit' : 'Mins'}
              </p>
            </div>
            <div className="countdown-item rounded-2xl p-4 md:p-6 shadow-md">
              <p className="text-2xl md:text-4xl font-bold number">
                {String(countdown.seconds).padStart(2, '0')}
              </p>
              <p className="text-gray-400 text-[10px] md:text-xs font-semibold uppercase tracking-wider mt-1">
                {language === 'id' ? 'Detik' : 'Secs'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <GallerySection images={[]} editable={false} language={language} />

      {/* Gift Section */}
      <section className="inv-section py-20 px-6 text-center">
        <div className="max-w-md mx-auto reveal visible">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
            <i className="fas fa-gift text-primary text-2xl"></i>
          </div>
          <h2 className="text-2xl md:text-3xl font-elegant font-semibold text-gray-800 mb-2">
            {language === 'id' ? 'Kado Pernikahan' : 'Wedding Gift'}
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            {language === 'id' 
              ? 'Kehadiran Anda adalah hadiah terbaik. Namun, jika Anda ingin memberikan hadiah, silakan gunakan detail di bawah.'
              : 'Your presence is the greatest gift. However, if you wish to honor us with a gift, you may use the details below.'}
          </p>
          <div className="card-elevated rounded-2xl p-6 space-y-4">
            <p className="font-semibold text-gray-700 text-sm">Bank Account</p>
            <div className="flex items-center justify-center gap-2">
              <p className="text-xl font-bold text-primary font-mono tracking-wider">1234567890</p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText('1234567890');
                  showToast?.('Account number copied!', 'success');
                }}
                className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition"
                title="Copy"
              >
                <i className="fas fa-copy text-gray-400 text-xs"></i>
              </button>
            </div>
            <p className="text-gray-500 text-xs">Account Holder Name</p>
          </div>
        </div>
      </section>

      {/* RSVP */}
      <RSVPForm
        language={language}
        guestName={data?.guest_name}
        invitationSlug={data?.slug}
      />

      {/* Footer */}
      <Footer
        variation={v}
        onShare={shareInvitation}
        language={language}
      />

      {/* Background Music */}
      <audio ref={audioRef} loop>
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default InvitationPage;
