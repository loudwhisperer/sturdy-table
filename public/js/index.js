// *****Code to send user to full event page from homepage *****
const getFullEvent = async (eventId) => {
  // Request full event page from backend
  const response = await fetch(`/api/events/${eventId}`, {
    method: 'GET',
    //body: '',
    headers: { 'content-type': 'application/json' }
  });

  if (response.ok) {
    console.log(response);
  }
}