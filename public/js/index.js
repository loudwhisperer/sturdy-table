// *****Code to send user to full event page from homepage *****
const getFullEvent = async (eventId) => {
  // Request full event page from backend
  const currentUrl = document.location.href;
  document.location.href = currentUrl + `api/events/${eventId}`;
}

// *****Code only relevant when on the account page*****
// Code to hide Account page Attendance Request with no pending
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

// *****change password*****
//TODO: future-dev validate that new password and confrim password fields match
const subNewPassBtn = (hrefArr[0] === 'account') ? document.getElementById("submitButton") : '';
const changePassword = async () => {
  try {
    const newPassword = document.getElementById('confirmPassword').value
    const userI = document
      .getElementById("account-page")
      .getAttribute("data-id");
    await fetch(`/api/users/${userI}/changepassword`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: `${newPassword}`,
      }),
    }).then((response) => {
      console.log(response);
    });
  } catch (err) {
    console.error(err)
  }
}
if (hrefArr[0] === 'account') {
  subNewPassBtn.addEventListener('click', changePassword);
}


//functionality for the change password button so it appears on click
const changePassModal = () => {
  const modal = document.getElementById("ChangePassword");
  modal.classList.toggle('hidden');
};

//begin functions for changing a display name of a user

const subNewNameBtn = (hrefArr[0] === 'account') ? document.getElementById("newNameButton") : '';
const changeDisplayName = async () => {
  try {
    const newDisplayName = document.getElementById("displayname").value;
    const userI = document.getElementById('account-page').getAttribute('data-id');
    await fetch(`/api/users/${userI}/account`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        displayname: `${newDisplayName}`,
      }),
    })
  } catch (err) {
    console.error(err.message);
  }
};

//runs the function to update user name
if (hrefArr[0] === 'account') {
  subNewNameBtn.addEventListener('click', changeDisplayName);
}

//functionality for the change display name button so it appears on click
const changeNameModal = () => {
  const modal = document.getElementById("ChangeDisplayName");
  modal.classList.toggle('hidden');
};

// *****Logout*****
const logout = async () => {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    console.error(err);
  }
};

// *****Edit Event Btn*****
const editEvent = async () => {
  try {
    const id = document.getElementById('event-section').getAttribute('data-id');
    const response = await fetch(`/api/events/${id}/edit-event`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
      document.location.replace(`/api/events/${id}/edit-event`);
    }

  }
  catch (err) { console.error(err.message); }
}

// *****Cancel Event Btn*****
// TODO - Add confirmation on button press
const cancelEvent = async () => {
  try {
    const id = document.getElementById('event-section').getAttribute('data-id');
    const response = await fetch(`/api/events/${id}`, {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
      document.location.replace(`/`);
    }

  }
  catch (err) { console.error(err.message); }
}

// *****Add User Event Btn*****
const addAttendee = async () => {
  try {
    const eventId = document.getElementById('event-section').getAttribute('data-id');
    const newAttendee = document.getElementById('addAttendee').value;
    const getUser = await fetch(`/api/events/find-user/${newAttendee}`, {
      method: 'GET',
      headers: {"Content-Type": "application/json"},
    });
    let userData = await getUser.json();

    if (!userData.id) {
      alert('Could not find that user!');
      return;
    }

    // Add the user to the event!
    const addAttendeeToEvent = await fetch('/api/events/attending', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        approved: true,
        userId: `${userData.id}`,
        eventId: `${eventId}`
      }),
    });

    // Reload the current page
    if (addAttendeeToEvent.ok) {
      location.reload();
    }
  }
  catch (err) { console.error(err.message); }
}

// *****Add User Event Btn*****
const removeAttendee = async (userDiv) => {
  try {
    const eventId = document.getElementById('event-section').getAttribute('data-id');
    const url = `/api/events/attending/${eventId}/${userDiv.getAttribute('data-userId')}`;
    const deleteUser = await fetch(url, {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" }
    });

    if (deleteUser.ok) {
      location.reload();
    }
  } 
  catch (err) { console.error(err.message); }
}

// *****Approve User Event Btn*****
const approveAttendee = async (userDiv) => {
  try {
    const eventId = document.getElementById('event-section').getAttribute('data-id');
    const url = `/api/events/approved/${eventId}/${userDiv.getAttribute('data-userId')}`;
    const approveUser = await fetch(url, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        approved: true,
        userId: `${userDiv.getAttribute('data-userId')}`,
        eventId: `${eventId}`
      })
    });

    if (approveUser.ok) {
      location.reload();
    }
  } 
  catch (err) { console.error(err.message); }
}

// *****Create Event Btn*****
const eventCreate = async () => {
  try {
    // Obj to hold the event data
    const newEvent = {};
    const htmlEvent = document.getElementById('new-event');

    // TODO - Add validation to the object
    newEvent.name = document.getElementById('eventTitle').value;
    newEvent.date = document.getElementById('eventDate').value;
    newEvent.time = document.getElementById('eventTime').value;
    newEvent.est_length = document.getElementById('eventLength').value;
    newEvent.public = document.getElementById('pub-priv').value;
    newEvent.virtual = document.getElementById('virt-irl').value;
    newEvent.capacity = document.getElementById('capacity').value;
    newEvent.location = document.getElementById('address-link').value;
    newEvent.game = document.getElementById('gameCustomChoice').value;
    newEvent.description = document.getElementById('eventDescription').value;
    newEvent.notes = document.getElementById('eventNotes').value;
    newEvent.host = htmlEvent.getAttribute('data-id');
    
    const createEvent = await fetch('/api/events', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: `${newEvent.name}`,
        date: `${newEvent.date}`,
        time_start: `${newEvent.time}`,
        est_length: `${newEvent.est_length}`,
        is_public: `${newEvent.public}`,
        is_virtual: `${newEvent.virtual}`,
        max_users: `${newEvent.capacity}`,
        location: `${newEvent.location}`,
        category: '',
        game_name: `${newEvent.game}`,
        description: `${newEvent.description}`,
        notes: `${newEvent.notes}`,
        host_id: `${newEvent.host}`,
      })
    });

    if (createEvent.ok) {
      const newEventObj = await createEvent.json();
      // Check for attendees and add them
      const attendeeList = document.getElementsByClassName('event-attendee');
      // Loop through attendeeList adding them to the Eventgroup table for this event
      for (let i = 0; i < attendeeList.length; i++) {
        // Add the user to the event!
        const addAttendeeToEvent = await fetch('/api/events/attending', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            approved: true,
            userId: `${attendeeList[i].getAttribute('data-userId') }`,
            eventId: `${newEventObj.id}`
          }),
        });
        
        // TODO - Add check for error
      }

      
      document.location.replace(`/api/events/${newEventObj.id}`);
    }
  } 
  catch (err) { console.error(err.message); }
}

// Get user data for adding an attendee to the create-event/edit-event page
const eventCreateAddAttendee = async () => {
  try {
    const newAttendee = document.getElementById('addAttendee').value;
    const getUser = await fetch(`/api/events/find-user/${newAttendee}`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    });
    let userData = await getUser.json();

    if (!userData.id) {
      alert('Could not find that user!');
      return;
    }

    // TODO - Add validation for duplicate adds
    const attendeesContainer = document.getElementById('attendeesList');
    const attendeeDiv = document.createElement('div');
    const htmlSpan = document.createElement('span');
    htmlSpan.setAttribute('data-userId', userData.id);
    htmlSpan.classList.add('event-attendee');
    htmlSpan.textContent = userData.displayname;
    const htmlImg = document.createElement('img');
    htmlImg.setAttribute('src', '/images/x-icon.svg');
    htmlImg.setAttribute('alt', 'x icon');
    htmlImg.setAttribute('onclick', 'pageOnlyRemoveAttendee(this.parentElement)');
    
    attendeeDiv.appendChild(htmlSpan);
    attendeeDiv.appendChild(htmlImg);
    attendeesContainer.appendChild(attendeeDiv);
  }
  catch (err) { console.error(err.message); }
}
// Remove Attendee from create-event/edit-event page ONLY
const pageOnlyRemoveAttendee = (htmlDiv) => {
  htmlDiv.remove();
}

// TODO - REFACTOR!!!