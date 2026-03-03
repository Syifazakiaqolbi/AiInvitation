/* ============================================================
   AI Invitation Generator - Application Logic (script.js)
   ============================================================
   All JS behaviour lives here. It reads content from
   InvitationDefaults / InvitationLocales (invitationData.js)
   and applies theming via CSS custom-properties (theme.css).
   ============================================================ */

// ==================== STATE ====================
let invitationData = {};
let selectedVariation = 0;
let variations = [];
let guestLinks = [];
let invitationSlug = '';
let isMuted = false;

// Uploaded file blobs
let uploadedCouplePhoto = null;   // { groom: dataURL, bride: dataURL }
let uploadedGallery = [];          // array of dataURL strings (max 6)
let uploadedMusic = null;          // dataURL string

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
  checkURLForInvitation();
  initGuestListCounter();
  initScrollReveal();
  initImageUploads();
  initMusicUpload();
});

// ==================== URL ROUTING ====================
function checkURLForInvitation() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('invite');
  const guest = params.get('to');
  if (slug && guest) {
    showInvitationPage(slug, decodeURIComponent(guest));
  }
}

// ==================== SCROLL REVEAL ====================
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

// ==================== GUEST LIST COUNTER ====================
function initGuestListCounter() {
  const ta = document.getElementById('guestList');
  if (!ta) return;
  ta.addEventListener('input', () => {
    const count = ta.value.split('\n').filter((l) => l.trim()).length;
    document.getElementById('guestCount').textContent = `${count} guest${count !== 1 ? 's' : ''}`;
  });
}

// ==================== IMAGE UPLOADS ====================
function initImageUploads() {
  // Groom photo
  bindUpload('groomPhotoInput', (dataURL) => {
    if (!uploadedCouplePhoto) uploadedCouplePhoto = {};
    uploadedCouplePhoto.groom = dataURL;
    const preview = document.getElementById('groomPhotoPreview');
    if (preview) {
      preview.innerHTML = `<img src="${dataURL}" alt="Groom"/>`;
    }
  });
  // Bride photo
  bindUpload('bridePhotoInput', (dataURL) => {
    if (!uploadedCouplePhoto) uploadedCouplePhoto = {};
    uploadedCouplePhoto.bride = dataURL;
    const preview = document.getElementById('bridePhotoPreview');
    if (preview) {
      preview.innerHTML = `<img src="${dataURL}" alt="Bride"/>`;
    }
  });
  // Gallery (multiple cells)
  for (let i = 0; i < 6; i++) {
    bindUpload(`galleryInput${i}`, (dataURL) => {
      uploadedGallery[i] = dataURL;
      const cell = document.getElementById(`galleryCell${i}`);
      if (cell) {
        cell.innerHTML = `<img src="${dataURL}" alt="Gallery ${i + 1}"/><div class="upload-overlay"><i class="fas fa-camera"></i></div>`;
      }
    });
  }
}

function bindUpload(inputId, onLoad) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onLoad(reader.result);
    reader.readAsDataURL(file);
  });
}

function triggerUpload(inputId) {
  const el = document.getElementById(inputId);
  if (el) el.click();
}

// ==================== MUSIC UPLOAD ====================
function initMusicUpload() {
  const input = document.getElementById('musicFileInput');
  if (!input) return;
  input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      uploadedMusic = reader.result;
      const area = document.getElementById('musicUploadArea');
      if (area) {
        area.classList.add('has-file');
        area.querySelector('.music-filename').textContent = file.name;
      }
    };
    reader.readAsDataURL(file);
  });
}

function triggerMusicUpload() {
  const el = document.getElementById('musicFileInput');
  if (el) el.click();
}

// ==================== FORM VALIDATION ====================
function validateForm() {
  const fields = [
    { id: 'hostNames', label: 'Host Names' },
    { id: 'dateTime', label: 'Date & Time' },
    { id: 'venueName', label: 'Venue Name' },
    { id: 'venueAddress', label: 'Venue Address' },
    { id: 'dressCode', label: 'Dress Code' },
  ];

  document.querySelectorAll('.form-input.error').forEach((el) => el.classList.remove('error'));
  const errDiv = document.getElementById('validationError');

  for (const f of fields) {
    const el = document.getElementById(f.id);
    if (!el.value.trim()) {
      el.classList.add('error');
      el.focus();
      errDiv.classList.remove('hidden');
      document.getElementById('validationMsg').textContent = `Please fill in the "${f.label}" field.`;
      return false;
    }
  }
  errDiv.classList.add('hidden');
  return true;
}

// ==================== AI GENERATION (simulated) ====================
async function generateAIContent() {
  if (!validateForm()) return;

  const btn = document.getElementById('generateBtn');
  const loader = document.getElementById('loadingState');
  btn.classList.add('hidden');
  loader.classList.remove('hidden');

  // Simulate AI delay
  await new Promise((r) => setTimeout(r, 2000));

  const hostNames = document.getElementById('hostNames').value;
  const lang = document.getElementById('language').value;
  const dateVal = document.getElementById('dateTime').value;
  const D = lang === 'id' ? mergeLocale(InvitationDefaults, InvitationLocales.id) : InvitationDefaults;

  variations = [
    {
      hero: {
        headline: hostNames,
        subheadline: D.heroSubheadline,
      },
      event: {
        title: lang === 'id' ? 'Akad & Resepsi' : 'Wedding Ceremony & Reception',
        date: formatDate(dateVal, lang),
        time: formatTime(dateVal),
        venue: document.getElementById('venueName').value,
        address: document.getElementById('venueAddress').value,
      },
      style: 'Elegant',
      icon: 'fas fa-gem',
    },
    {
      hero: {
        headline: `The Wedding of ${hostNames}`,
        subheadline:
          lang === 'id'
            ? 'Kasih yang abadi dimulai dari janji suci. Mari saksikan momen bahagia kami bersama keluarga dan sahabat tercinta.'
            : 'Eternal love begins with sacred vows. Join us as we celebrate this beautiful milestone surrounded by those we love.',
      },
      event: {
        title: lang === 'id' ? 'Walimatul Ursy' : 'Wedding Celebration',
        date: formatDate(dateVal, lang),
        time: formatTime(dateVal),
        venue: document.getElementById('venueName').value,
        address: document.getElementById('venueAddress').value,
      },
      style: 'Modern',
      icon: 'fas fa-star',
    },
    {
      hero: {
        headline: hostNames,
        subheadline:
          lang === 'id'
            ? 'Dalam rangka membangun keluarga yang sakinah, mawaddah, warahmah, kami mohon doa restu Bapak/Ibu/Saudara/i.'
            : 'Building our future with love, faith, and devotion. We humbly request your presence, prayers, and blessings on our special day.',
      },
      event: {
        title: lang === 'id' ? 'Pernikahan' : 'Marriage Ceremony',
        date: formatDate(dateVal, lang),
        time: formatTime(dateVal),
        venue: document.getElementById('venueName').value,
        address: document.getElementById('venueAddress').value,
      },
      style: 'Minimalist',
      icon: 'fas fa-leaf',
    },
  ];

  renderVariations();

  loader.classList.add('hidden');
  btn.classList.remove('hidden');
  document.getElementById('step1').classList.add('hidden-section');
  document.getElementById('step2').classList.remove('hidden-section');

  // Activate step-2 indicator
  const s2 = document.getElementById('step2Indicator');
  s2.querySelector('.step-circle').classList.remove('bg-gray-200', 'text-gray-400');
  s2.querySelector('.step-circle').classList.add('bg-primary', 'text-white');
  s2.querySelector('.step-label').classList.remove('text-gray-400');
  s2.querySelector('.step-label').classList.add('text-primary', 'font-semibold');
  document.getElementById('stepConnector').classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==================== VARIATIONS ====================
function renderVariations() {
  const c = document.getElementById('variationContainer');
  c.innerHTML = variations
    .map(
      (v, i) => `
    <div onclick="selectVariation(${i})" class="variation-card p-5 rounded-xl border-2 ${
        selectedVariation === i ? 'selected border-primary' : 'border-gray-200/80'
      }">
      <div class="flex items-center gap-2.5 mb-3">
        <div class="w-8 h-8 rounded-lg flex items-center justify-center ${
          selectedVariation === i ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'
        }">
          <i class="${v.icon} text-xs"></i>
        </div>
        <span class="font-semibold text-sm text-gray-700">${v.style}</span>
      </div>
      <p class="text-xs text-gray-500 leading-relaxed line-clamp-3">${v.hero.subheadline}</p>
    </div>`
    )
    .join('');
}

function selectVariation(i) {
  selectedVariation = i;
  renderVariations();
  renderPreview();
}

function renderPreview() {
  const c = document.getElementById('previewContainer');
  const v = variations[selectedVariation];
  c.innerHTML = `
    <div class="text-center py-4">
      <p class="text-primary font-semibold tracking-[0.2em] text-[10px] uppercase mb-2">Preview</p>
      <h2 class="text-2xl md:text-3xl font-script text-gray-800 mb-3">${v.hero.headline}</h2>
      <p class="text-gray-500 text-sm max-w-md mx-auto mb-5">${v.hero.subheadline}</p>
      <div class="ornament-divider my-4"><i class="fas fa-diamond text-primary/20 text-[6px]"></i></div>
      <p class="font-elegant font-semibold text-gray-700 text-sm">${v.event.title}</p>
      <p class="text-gray-500 text-xs mt-1">${v.event.date} | ${v.event.time}</p>
      <p class="text-gray-500 text-xs">${v.event.venue}</p>
    </div>`;
}

function goToStep1() {
  document.getElementById('step1').classList.remove('hidden-section');
  document.getElementById('step2').classList.add('hidden-section');
  const s2 = document.getElementById('step2Indicator');
  s2.querySelector('.step-circle').classList.add('bg-gray-200', 'text-gray-400');
  s2.querySelector('.step-circle').classList.remove('bg-primary', 'text-white');
  s2.querySelector('.step-label').classList.add('text-gray-400');
  s2.querySelector('.step-label').classList.remove('text-primary', 'font-semibold');
  document.getElementById('stepConnector').classList.remove('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==================== PUBLISH ====================
function publishInvitation() {
  const text = document.getElementById('guestList').value;
  const guests = text.split('\n').filter((l) => l.trim());

  if (guests.length === 0) {
    showToast('Please enter at least one guest name', 'warning');
    return;
  }

  invitationSlug = generateSlug(32);

  guestLinks = guests.map((g) => ({
    name: g.trim(),
    link: `${window.location.origin}${window.location.pathname}?invite=${invitationSlug}&to=${encodeURIComponent(g.trim())}`,
  }));

  invitationData = {
    slug: invitationSlug,
    ...getFormData(),
    variation: variations[selectedVariation],
    guests: guestLinks,
    // Store uploaded assets as data URLs
    couplePhoto: uploadedCouplePhoto || null,
    gallery: uploadedGallery.length ? uploadedGallery : null,
    customMusic: uploadedMusic || null,
  };

  // Save to localStorage
  try {
    localStorage.setItem('invitation_' + invitationSlug, JSON.stringify(invitationData));
  } catch (e) {
    // localStorage may exceed quota with large images - warn user
    showToast('Data too large for local storage. Reduce image sizes.', 'warning');
    return;
  }

  showSuccessPage();
}

function showSuccessPage() {
  document.getElementById('landingPage').classList.add('hidden-section');
  document.getElementById('successPage').classList.remove('hidden-section');

  const mainLink = `${window.location.origin}${window.location.pathname}?invite=${invitationSlug}&to=Guest`;
  document.getElementById('mainLink').value = mainLink;
  document.getElementById('totalGuests').textContent = `${guestLinks.length} guest${guestLinks.length !== 1 ? 's' : ''}`;

  const c = document.getElementById('guestLinksContainer');
  c.innerHTML = guestLinks
    .map(
      (g) => `
    <div class="flex items-center gap-3 p-3 bg-gray-50/80 rounded-xl hover:bg-gray-50 transition">
      <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
        <i class="fas fa-user text-primary text-xs"></i>
      </div>
      <span class="flex-1 text-gray-700 font-medium text-sm truncate">${escapeHtml(g.name)}</span>
      <input type="text" value="${g.link}" readonly class="hidden sm:block flex-1 px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white font-mono truncate"/>
      <button onclick="copyText('${g.link.replace(/'/g, "\\'")}')" class="px-3 py-2 bg-primary text-white rounded-lg text-xs hover:bg-primary-dark transition flex-shrink-0" title="Copy link">
        <i class="fas fa-copy"></i>
      </button>
    </div>`
    )
    .join('');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==================== INVITATION PAGE ====================
function showInvitationPage(slug, guestName) {
  document.getElementById('landingPage').classList.add('hidden-section');
  document.getElementById('successPage').classList.add('hidden-section');
  document.getElementById('invitationPage').classList.remove('hidden-section');

  const data = JSON.parse(localStorage.getItem('invitation_' + slug) || '{}');

  if (data.variation) {
    const names = data.hostNames || '';
    const parts = names.split('&').map((s) => s.trim());

    // Opening page
    document.getElementById('openingHeadline').textContent = names;
    document.getElementById('openingGuestName').textContent = guestName;

    // Hero
    document.getElementById('heroName1').textContent = parts[0] || 'John';
    document.getElementById('heroName2').textContent = parts[1] || 'Jane';
    document.getElementById('heroSubheadline').textContent = data.variation.hero.subheadline;

    // Event
    document.getElementById('eventTitle').textContent = data.variation.event.title;
    document.getElementById('eventDate').textContent = data.variation.event.date;
    document.getElementById('eventTime').textContent = data.variation.event.time || '';
    document.getElementById('eventVenue').textContent = data.variation.event.venue;
    document.getElementById('eventAddress').textContent = data.variation.event.address;
    document.getElementById('eventDressCode').textContent = data.dressCode || 'Formal Attire';
    document.getElementById('closingNames').textContent = names;

    // Couple section names
    const groomEl = document.getElementById('groomName');
    const brideEl = document.getElementById('brideName');
    if (groomEl) groomEl.textContent = parts[0] || 'The Groom';
    if (brideEl) brideEl.textContent = parts[1] || 'The Bride';

    // Maps
    if (data.mapsLink) {
      document.getElementById('mapsButton').href = data.mapsLink;
    } else {
      document.getElementById('mapsButton').style.display = 'none';
    }

    // Couple photos
    if (data.couplePhoto) {
      if (data.couplePhoto.groom) {
        const gp = document.getElementById('groomPhotoDisplay');
        if (gp) gp.innerHTML = `<img src="${data.couplePhoto.groom}" alt="Groom"/>`;
      }
      if (data.couplePhoto.bride) {
        const bp = document.getElementById('bridePhotoDisplay');
        if (bp) bp.innerHTML = `<img src="${data.couplePhoto.bride}" alt="Bride"/>`;
      }
    }

    // Gallery photos
    if (data.gallery) {
      data.gallery.forEach((url, i) => {
        if (url) {
          const cell = document.getElementById(`galleryDisplay${i}`);
          if (cell) cell.innerHTML = `<img src="${url}" alt="Gallery ${i + 1}"/>`;
        }
      });
    }

    // Custom music
    if (data.customMusic) {
      const audio = document.getElementById('bgMusic');
      audio.src = data.customMusic;
    }

    startCountdown(data.dateTime);
    loadWishes(slug);

    // Apply locale labels if needed
    if (data.language === 'id') {
      applyLocaleLabels(mergeLocale(InvitationDefaults, InvitationLocales.id));
    }
  }

  sessionStorage.setItem('currentGuest', guestName);
  invitationSlug = slug;
}

function applyLocaleLabels(D) {
  // Update labels that are rendered server-side / static
  const map = {
    labelSaveTheDate: D.saveTheDateLabel,
    labelCountdown: D.countdownLabel,
    labelCountdownTitle: D.countdownTitle,
    labelDays: D.countdownDaysLabel,
    labelHours: D.countdownHoursLabel,
    labelMins: D.countdownMinsLabel,
    labelSecs: D.countdownSecsLabel,
    labelGallery: D.galleryLabel,
    labelGalleryTitle: D.galleryTitle,
    labelGiftTitle: D.giftTitle,
    labelRsvpTitle: D.rsvpTitle,
    labelRsvpSubtitle: D.rsvpSubtitle,
  };
  for (const [id, text] of Object.entries(map)) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }
}

function openInvitation() {
  const opening = document.getElementById('openingPage');
  opening.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  opening.style.opacity = '0';
  opening.style.transform = 'scale(0.98)';

  setTimeout(() => {
    opening.classList.add('hidden-section');
    document.getElementById('mainInvitation').classList.remove('hidden-section');
    initScrollReveal();

    const audio = document.getElementById('bgMusic');
    audio.volume = 0.25;
    audio.play().catch(() => {});
  }, 500);
}

// ==================== COUNTDOWN ====================
function startCountdown(dateTime) {
  const target = new Date(dateTime).getTime();
  const update = () => {
    const dist = target - Date.now();
    if (dist > 0) {
      document.getElementById('countdownDays').textContent = String(Math.floor(dist / 864e5)).padStart(2, '0');
      document.getElementById('countdownHours').textContent = String(Math.floor((dist % 864e5) / 36e5)).padStart(2, '0');
      document.getElementById('countdownMinutes').textContent = String(Math.floor((dist % 36e5) / 6e4)).padStart(2, '0');
      document.getElementById('countdownSeconds').textContent = String(Math.floor((dist % 6e4) / 1e3)).padStart(2, '0');
    }
  };
  update();
  setInterval(update, 1000);
}

// ==================== MUSIC ====================
function toggleMusic() {
  const audio = document.getElementById('bgMusic');
  const icon = document.getElementById('musicIcon');
  if (isMuted) {
    audio.play();
    icon.className = 'fas fa-volume-up text-primary text-sm';
  } else {
    audio.pause();
    icon.className = 'fas fa-volume-xmark text-gray-400 text-sm';
  }
  isMuted = !isMuted;
}

// ==================== RSVP ====================
function submitRSVP(e) {
  e.preventDefault();
  const rsvpData = {
    name: document.getElementById('rsvpName').value,
    status: document.getElementById('rsvpStatus').value,
    message: document.getElementById('rsvpMessage').value,
    guest: sessionStorage.getItem('currentGuest'),
    timestamp: new Date().toISOString(),
  };

  const key = 'rsvps_' + invitationSlug;
  const rsvps = JSON.parse(localStorage.getItem(key) || '[]');
  rsvps.push(rsvpData);
  localStorage.setItem(key, JSON.stringify(rsvps));

  showToast('RSVP submitted successfully!', 'success');
  e.target.reset();
  loadWishes(invitationSlug);
}

function loadWishes(slug) {
  const rsvps = JSON.parse(localStorage.getItem('rsvps_' + slug) || '[]');
  if (rsvps.length === 0) return;

  const container = document.getElementById('wishesContainer');
  const list = document.getElementById('wishesList');
  container.classList.remove('hidden');

  list.innerHTML = rsvps
    .slice(-5)
    .reverse()
    .map(
      (r) => `
    <div class="p-3 bg-gray-50/80 rounded-xl">
      <div class="flex items-center gap-2 mb-1">
        <span class="font-semibold text-sm text-gray-700">${escapeHtml(r.name)}</span>
        <span class="text-[10px] px-2 py-0.5 rounded-full font-medium ${
          r.status === 'attending'
            ? 'bg-emerald-100 text-emerald-700'
            : r.status === 'not-attending'
            ? 'bg-red-100 text-red-700'
            : 'bg-amber-100 text-amber-700'
        }">${r.status === 'attending' ? 'Attending' : r.status === 'not-attending' ? 'Cannot Attend' : 'Maybe'}</span>
      </div>
      ${r.message ? `<p class="text-xs text-gray-500">${escapeHtml(r.message)}</p>` : ''}
    </div>`
    )
    .join('');
}

// ==================== ADD TO CALENDAR ====================
function addToCalendar() {
  const data = JSON.parse(localStorage.getItem('invitation_' + invitationSlug) || '{}');
  if (!data.dateTime) {
    showToast('No event date available', 'warning');
    return;
  }
  const start = new Date(data.dateTime);
  const end = new Date(start.getTime() + 3 * 3600000);
  const fmt = (d) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    (data.variation?.event?.title || 'Wedding') + ' - ' + (data.hostNames || '')
  )}&dates=${fmt(start)}/${fmt(end)}&location=${encodeURIComponent(data.venueAddress || '')}&details=${encodeURIComponent(
    'You are invited! ' + (data.variation?.hero?.subheadline || '')
  )}`;
  window.open(url, '_blank');
}

// ==================== UTILITIES ====================
function getFormData() {
  return {
    eventType: document.getElementById('eventType').value,
    hostNames: document.getElementById('hostNames').value,
    dateTime: document.getElementById('dateTime').value,
    venueName: document.getElementById('venueName').value,
    venueAddress: document.getElementById('venueAddress').value,
    mapsLink: document.getElementById('mapsLink').value,
    dressCode: document.getElementById('dressCode').value,
    theme: document.getElementById('theme').value,
    tone: document.getElementById('tone').value,
    language: document.getElementById('language').value,
    music: document.getElementById('music').value,
  };
}

function generateSlug(input, length = 12) {
  if (typeof input === 'number') {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let r = '';
    for (let i = 0; i < input; i++) r += chars[Math.floor(Math.random() * chars.length)];
    return r;
  }
  return input.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + generateSlug(6);
}

function formatDate(dateStr, lang) {
  const d = new Date(dateStr);
  const locale = lang === 'id' ? 'id-ID' : 'en-US';
  return d.toLocaleDateString(locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function formatTime(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

function copyToClipboard(elementId) {
  const el = document.getElementById(elementId);
  navigator.clipboard.writeText(el.value).then(() => showToast('Link copied!', 'success'));
}

function copyText(text) {
  navigator.clipboard.writeText(text).then(() => showToast('Link copied!', 'success'));
}

function copyAccountNumber() {
  const num = document.getElementById('accountNumber').textContent;
  navigator.clipboard.writeText(num).then(() => showToast('Account number copied!', 'success'));
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function showToast(message, type = 'info') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const colors = { success: 'background:#065f46;', warning: 'background:#92400e;', info: 'background:#1f2937;' };
  const icons = { success: 'fa-check-circle', warning: 'fa-exclamation-triangle', info: 'fa-info-circle' };

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.style.cssText = colors[type] || colors.info;
  toast.innerHTML = `<i class="fas ${icons[type] || icons.info} mr-2"></i>${escapeHtml(message)}`;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('toast-exit');
    setTimeout(() => toast.remove(), 300);
  }, 2700);
}

function shareInvitation() {
  const url = window.location.href;
  if (navigator.share) {
    navigator.share({ title: "You're Invited!", text: `${sessionStorage.getItem('currentGuest') || 'Guest'}, you're invited!`, url }).catch(() => {});
  } else {
    navigator.clipboard.writeText(url).then(() => showToast('Link copied!', 'success'));
  }
}
