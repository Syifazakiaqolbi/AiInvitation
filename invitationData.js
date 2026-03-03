/* ============================================================
   AI Invitation Generator - Default Content Data
   ============================================================
   All invitation text content is sourced from this file.
   Change values here to update every label and paragraph
   across the entire invitation without touching HTML.
   ============================================================ */

const InvitationDefaults = {
  /* ---- Couple / Host ---- */
  groomFullName: 'The Groom',
  brideFullName: 'The Bride',
  groomParents: 'Mr. & Mrs. Smith',
  brideParents: 'Mr. & Mrs. Johnson',
  groomParentLabel: 'Son of',
  brideParentLabel: 'Daughter of',

  /* ---- Event ---- */
  eventLabel: 'The Wedding Of',
  eventTitle: 'Wedding Ceremony & Reception',
  eventDate: 'Saturday, July 5, 2025',
  eventTime: '10:00 AM - End',
  venueName: 'Grand Ballroom Hotel',
  venueAddress: '123 Main Street, City',
  dressCode: 'Formal Attire',
  dressCodeLabel: 'Dress Code',

  /* ---- Hero / Opening ---- */
  greeting: 'Peace be upon you',
  heroSubheadline: 'With immense joy and gratitude, we invite you to celebrate the beginning of our new journey together.',
  youreInvitedLabel: "You're Invited",
  dearLabel: 'Dear',
  openButtonText: 'Open Invitation',
  poweredByLabel: 'AI-Powered Invitation',

  /* ---- Verse / Quote ---- */
  verseArabic: 'And of everything We have created pairs, that you may remember.',
  verseTranslation: '"And We created you in pairs."',
  verseReference: '(Quran 51:49)',

  /* ---- Countdown ---- */
  countdownLabel: 'Counting Down',
  countdownTitle: 'Until The Big Day',
  countdownDaysLabel: 'Days',
  countdownHoursLabel: 'Hours',
  countdownMinsLabel: 'Mins',
  countdownSecsLabel: 'Secs',

  /* ---- Gallery ---- */
  galleryLabel: 'Our Moments',
  galleryTitle: 'Gallery',
  galleryPlaceholder: 'Upload your photos to personalize this section',

  /* ---- Gift ---- */
  giftTitle: 'Wedding Gift',
  giftDescription: 'Your presence is the greatest gift. However, if you wish to honor us with a gift, you may use the details below.',
  giftBankLabel: 'Bank Account',
  giftAccountNumber: '1234567890',
  giftAccountHolder: 'Account Holder Name',

  /* ---- RSVP ---- */
  rsvpTitle: 'RSVP & Wishes',
  rsvpSubtitle: 'Confirm attendance and send your wishes',
  rsvpNamePlaceholder: 'Your name',
  rsvpWishPlaceholder: 'Write your wishes...',
  rsvpSubmitText: 'Send RSVP',
  rsvpOptionAttend: 'Will Attend',
  rsvpOptionDecline: 'Cannot Attend',
  rsvpOptionMaybe: 'Maybe',
  recentWishesLabel: 'Recent Wishes',

  /* ---- Closing ---- */
  closingMessage: 'It would be our greatest joy to have you celebrate this special moment with us. Your presence and blessings mean the world.',
  closingGratitude: 'With love and gratitude,',
  shareButtonText: 'Share Invitation',
  footerCredit: 'Created with AI Invitation Generator',

  /* ---- Save The Date ---- */
  saveTheDateLabel: 'Save The Date',

  /* ---- Maps ---- */
  mapsButtonText: 'Open Maps',
  calendarButtonText: 'Add to Calendar',

  /* ---- Form Labels (Landing Page) ---- */
  form: {
    pageTitle: 'AI Invitation Generator',
    heroTagline: 'Create Something Beautiful',
    heroHeadline: 'Elegant Invitations, Crafted by AI',
    heroDescription: 'Fill in your event details and let our AI generate a personalized, stunning invitation with shareable links for every guest.',
    step1Label: 'Details',
    step2Label: 'Preview',
    sectionTitle: 'Event Information',
    eventTypeLabel: 'Event Type',
    themeLabel: 'Theme',
    hostNamesLabel: 'Host Names',
    hostNamesPlaceholder: 'e.g., John & Jane',
    hostNamesHint: 'Use "&" to separate names for couple events',
    dateTimeLabel: 'Date & Time',
    toneLabel: 'Tone',
    venueNameLabel: 'Venue Name',
    venueNamePlaceholder: 'e.g., Grand Ballroom Hotel',
    venueAddressLabel: 'Venue Address',
    venueAddressPlaceholder: 'Full address of the venue',
    mapsLinkLabel: 'Google Maps Link',
    mapsLinkPlaceholder: 'https://maps.google.com/...',
    dressCodeLabel: 'Dress Code',
    dressCodePlaceholder: 'e.g., Formal Attire, Casual Chic, Traditional',
    languageLabel: 'Language',
    musicLabel: 'Background Music',
    musicUploadLabel: 'Upload Custom Music',
    musicUploadHint: 'MP3, WAV, or OGG (max 15 MB)',
    imageUploadLabel: 'Couple Photo',
    imageUploadHint: 'JPG, PNG, or WebP (max 5 MB)',
    generateButton: 'Generate AI Invitation',
    loadingText: 'AI is crafting your invitation...',
    loadingSubtext: 'This may take a moment',
    chooseStyleTitle: 'Choose Your Style',
    guestListTitle: 'Guest List',
    guestListDesc: 'Enter one name per line. Each guest receives a personalized link.',
    guestListPlaceholder: 'Mr. Ahmad Santoso\nMrs. Siti Nurhaliza\nMr. Budi Pratama\nMs. Dewi Lestari',
    previewTitle: 'Preview',
    previewEmpty: 'Select a style above to see a preview',
    backButton: 'Back',
    publishButton: 'Publish Invitation',
  },

  /* ---- Success Page ---- */
  success: {
    title: 'Invitation Published!',
    subtitle: 'Your invitation is live. Share the personalized links below.',
    mainLinkTitle: 'Main Invitation Link',
    guestLinksTitle: 'Personalized Guest Links',
    printButton: 'Print Links',
    createNewButton: 'Create New',
  },

  /* ---- Dropdown Options ---- */
  options: {
    eventTypes: [
      { value: 'Wedding', label: 'Wedding' },
      { value: 'Engagement', label: 'Engagement' },
      { value: 'Birthday', label: 'Birthday' },
      { value: 'Anniversary', label: 'Anniversary' },
      { value: 'Graduation', label: 'Graduation' },
      { value: 'Corporate', label: 'Corporate Event' },
      { value: 'Baby Shower', label: 'Baby Shower' },
    ],
    themes: [
      { value: 'elegant', label: 'Elegant' },
      { value: 'minimalist', label: 'Minimalist' },
      { value: 'modern', label: 'Modern' },
      { value: 'floral', label: 'Floral' },
      { value: 'rustic', label: 'Rustic' },
    ],
    tones: [
      { value: 'formal', label: 'Formal' },
      { value: 'casual', label: 'Casual' },
      { value: 'poetic', label: 'Poetic' },
      { value: 'elegant', label: 'Elegant' },
      { value: 'romantic', label: 'Romantic' },
    ],
    languages: [
      { value: 'en', label: 'English' },
      { value: 'id', label: 'Bahasa Indonesia' },
    ],
    musicPresets: [
      { value: 'romantic', label: 'Romantic Piano' },
      { value: 'classical', label: 'Classical Orchestra' },
      { value: 'acoustic', label: 'Acoustic Guitar' },
      { value: 'none', label: 'No Music' },
    ],
  },
};

/* ============================================================
   Bahasa Indonesia translation overlay.
   When language === 'id', mergeLocale(InvitationDefaults, ID)
   produces a localised data object.
   ============================================================ */
const InvitationLocales = {
  id: {
    eventLabel: 'Pernikahan',
    greeting: 'Assalamualaikum Wr.Wb',
    heroSubheadline: 'Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami.',
    youreInvitedLabel: 'Anda Diundang',
    dearLabel: 'Kepada Yth.',
    openButtonText: 'Buka Undangan',
    groomParentLabel: 'Putra dari',
    brideParentLabel: 'Putri dari',
    saveTheDateLabel: 'Simpan Tanggal',
    countdownLabel: 'Hitung Mundur',
    countdownTitle: 'Menuju Hari Bahagia',
    countdownDaysLabel: 'Hari',
    countdownHoursLabel: 'Jam',
    countdownMinsLabel: 'Menit',
    countdownSecsLabel: 'Detik',
    galleryLabel: 'Momen Kami',
    galleryTitle: 'Galeri',
    galleryPlaceholder: 'Unggah foto untuk mempersonalisasi bagian ini',
    giftTitle: 'Hadiah Pernikahan',
    giftDescription: 'Kehadiran Anda adalah hadiah terbesar. Namun, jika Anda ingin memberikan hadiah, silakan gunakan detail di bawah ini.',
    giftBankLabel: 'Rekening Bank',
    rsvpTitle: 'RSVP & Ucapan',
    rsvpSubtitle: 'Konfirmasi kehadiran dan kirim ucapan',
    rsvpNamePlaceholder: 'Nama Anda',
    rsvpWishPlaceholder: 'Tulis ucapan...',
    rsvpSubmitText: 'Kirim RSVP',
    rsvpOptionAttend: 'Akan Hadir',
    rsvpOptionDecline: 'Tidak Bisa Hadir',
    rsvpOptionMaybe: 'Mungkin',
    recentWishesLabel: 'Ucapan Terbaru',
    closingMessage: 'Merupakan suatu kebahagiaan apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.',
    closingGratitude: 'Atas kehadiran dan doanya kami ucapkan terima kasih.',
    shareButtonText: 'Bagikan Undangan',
    mapsButtonText: 'Buka Peta',
    calendarButtonText: 'Tambahkan ke Kalender',
    dressCodeLabel: 'Kode Pakaian',
  },
};

/**
 * Merges a locale overlay onto defaults.
 * Returns a new object so the original is untouched.
 */
function mergeLocale(defaults, locale) {
  if (!locale) return { ...defaults };
  const merged = { ...defaults };
  for (const key of Object.keys(locale)) {
    if (typeof locale[key] === 'object' && !Array.isArray(locale[key])) {
      merged[key] = { ...defaults[key], ...locale[key] };
    } else {
      merged[key] = locale[key];
    }
  }
  return merged;
}
