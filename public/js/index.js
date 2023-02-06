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

// *****Edit Event*****
const editEvent = async () => {
  try {
    const id = document.getElementById('event-page-container').getAttribute('data-id');
    const response = await fetch(`/api/events/${id}/edit-event`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
      document.location.replace(`/api/events/${id}/edit-event`);
    }

  } 
  catch(err) {console.error(err.message);}
}


// TODO - REFACTOR!!!