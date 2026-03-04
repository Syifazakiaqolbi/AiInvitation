const API_BASE = "http://47.84.115.117/:8000";

/**
 * Generate AI invitation variations
 */
export async function generateInvitation(formData) {
  let res;
  try {
    res = await fetch(`${API_BASE}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_type: formData.eventType,
        host_names: formData.hostNames,
        date_time: formData.dateTime,
        venue_name: formData.venueName,
        venue_address: formData.venueAddress,
        maps_link: formData.mapsLink || "",
        dress_code: formData.dressCode,
        theme: formData.theme,
        tone: formData.tone,
        language: formData.language,
        music: formData.music,
        temperature: formData.temperature || 0.85,
      }),
    });
  } catch (networkErr) {
    throw new Error(
      "Cannot reach backend server. Make sure uvicorn is running on port 8000."
    );
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: `Server error (HTTP ${res.status})` }));
    // Handle FastAPI validation errors (detail can be array or object)
    let message = `HTTP ${res.status}`;
    if (err.detail) {
      if (typeof err.detail === 'string') {
        message = err.detail;
      } else if (Array.isArray(err.detail)) {
        // FastAPI validation error format: [{loc: [...], msg: "...", type: "..."}]
        message = err.detail.map(e => e.msg || JSON.stringify(e)).join(', ');
      } else if (typeof err.detail === 'object') {
        message = err.detail.msg || JSON.stringify(err.detail);
      }
    }
    throw new Error(message);
  }

  return res.json();
}

/**
 * Publish invitation and generate guest links
 */
export async function publishInvitation(formData, variations, selectedVariation, guestList) {
  let res;
  try {
    res = await fetch(`${API_BASE}/api/publish`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_type: formData.eventType,
        host_names: formData.hostNames,
        date_time: formData.dateTime,
        venue_name: formData.venueName,
        venue_address: formData.venueAddress,
        maps_link: formData.mapsLink || "",
        dress_code: formData.dressCode,
        theme: formData.theme,
        tone: formData.tone,
        language: formData.language,
        music: formData.music,
        selected_variation: selectedVariation,
        variations: variations,
        guest_list: guestList,
      }),
    });
  } catch (networkErr) {
    throw new Error("Cannot reach backend server.");
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: `Server error (HTTP ${res.status})` }));
    // Handle FastAPI validation errors (detail can be array or object)
    let message = `HTTP ${res.status}`;
    if (err.detail) {
      if (typeof err.detail === 'string') {
        message = err.detail;
      } else if (Array.isArray(err.detail)) {
        // FastAPI validation error format: [{loc: [...], msg: "...", type: "..."}]
        message = err.detail.map(e => e.msg || JSON.stringify(e)).join(', ');
      } else if (typeof err.detail === 'object') {
        message = err.detail.msg || JSON.stringify(err.detail);
      }
    }
    throw new Error(message);
  }

  return res.json();
}

/**
 * Get invitation data for guest view
 */
export async function getInvitation(invitationSlug, guestSlug) {
  let res;
  try {
    res = await fetch(`${API_BASE}/api/invitation/${invitationSlug}/${guestSlug}`);
  } catch (networkErr) {
    throw new Error("Cannot reach backend server.");
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: `Invitation not found` }));
    // Handle FastAPI validation errors (detail can be array or object)
    let message = `HTTP ${res.status}`;
    if (err.detail) {
      if (typeof err.detail === 'string') {
        message = err.detail;
      } else if (Array.isArray(err.detail)) {
        message = err.detail.map(e => e.msg || JSON.stringify(e)).join(', ');
      } else if (typeof err.detail === 'object') {
        message = err.detail.msg || JSON.stringify(err.detail);
      }
    }
    throw new Error(message);
  }

  return res.json();
}

export function getQrCodeUrl(invitationSlug, guestSlug) {
  return `${API_BASE}/api/qr/${invitationSlug}/${guestSlug}`;
}
