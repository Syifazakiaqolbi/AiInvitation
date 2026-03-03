import { useState, useEffect } from 'react';
import { getInvitation } from './services/api';
import { useToast } from './hooks/useToast';
import Home from './pages/Home';
import SuccessPage from './pages/SuccessPage';
import InvitationPage from './pages/InvitationPage';
import Toast from './components/ui/Toast';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [invitationData, setInvitationData] = useState(null);
  const [publishedData, setPublishedData] = useState(null);
  const { toasts, showToast, dismissToast } = useToast();

  // Check URL for invitation parameters on mount
  useEffect(() => {
    const path = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    
    // Check path-based route: /invite/{slug}/{guest_slug}
    const pathMatch = path.match(/^\/invite\/([^/]+)\/([^/]+)\/?$/);
    if (pathMatch) {
      const [, inviteSlug, guestSlug] = pathMatch;
      loadInvitation(inviteSlug, guestSlug);
      return;
    }

    // Fallback: Check query params: ?invite=xxx&to=yyy
    const inviteSlug = urlParams.get('invite');
    const guestSlug = urlParams.get('to');
    if (inviteSlug && guestSlug) {
      loadInvitation(inviteSlug, guestSlug);
    }
  }, []);

  const loadInvitation = async (inviteSlug, guestSlug) => {
    try {
      const data = await getInvitation(inviteSlug, guestSlug);
      setInvitationData(data);
      setCurrentPage('invitation');
    } catch (err) {
      showToast(err.message || 'Failed to load invitation', 'error');
    }
  };

  const handlePublished = (data) => {
    setPublishedData(data);
    setCurrentPage('success');
  };

  const handleCreateNew = () => {
    window.location.reload();
  };

  // Render based on current page
  if (currentPage === 'invitation' && invitationData) {
    return (
      <>
        <InvitationPage
          data={invitationData}
          showMain={invitationData._showMain}
          onOpen={() => setInvitationData(prev => ({ ...prev, _showMain: true }))}
          showToast={showToast}
        />
        <Toast toasts={toasts} onDismiss={dismissToast} />
      </>
    );
  }

  if (currentPage === 'success' && publishedData) {
    return (
      <>
        <SuccessPage
          data={publishedData}
          onCopy={(msg) => showToast(msg, 'success')}
          onCreateNew={handleCreateNew}
        />
        <Toast toasts={toasts} onDismiss={dismissToast} />
      </>
    );
  }

  return (
    <>
      <Home onPublished={handlePublished} showToast={showToast} />
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}

export default App;
