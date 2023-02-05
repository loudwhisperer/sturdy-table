// *****Code to send user to full event page from homepage *****
const getFullEvent = async (eventId) => {
  // Request full event page from backend
  const currentUrl = document.location.href;
  document.location.href = currentUrl + `api/events/${eventId}`;
}

// ******Code to hide Account page Attendance Request with no pending*****
const hidePending = () => {
  const pendingDiv = document.getElementById('pending-invites');
  const events = pendingDiv.getElementsByTagName('div');

  for (let i = 0; i < events.length; i++) {
    if (events[i].getAttribute('data-pending') === 'false') {
      events[i].classList.add('hidden');
    }
  }
}
// Check if this is the account page
const getLocationHref = document.location.href;
const hrefArr = getLocationHref.split('/');
hrefArr.reverse();

if (hrefArr[0] === 'account') {
  hidePending();
}

// *****Account page tab code*****
const showTab = (tab) => {
  // Get tab classes
  const hostClasses = document.getElementById('host').className.split(' ');
  const attendClasses = document.getElementById('attend').className.split(' ');

  if (tab === 'host' && hostClasses.includes('hidden')) {
    document.getElementById('host').classList.toggle('hidden');
    document.getElementById('attend').classList.toggle('hidden');
  } 
  if (tab === 'attend' && attendClasses.includes('hidden')) {
    document.getElementById('host').classList.toggle('hidden');
    document.getElementById('attend').classList.toggle('hidden');
  }
}
