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
const subNewPassBtn = (hrefArr[0] === 'account') ? document.getElementById("submitButton") : '';
const changePassword = async () => {
  try {
    const newPassword = document.getElementById('confirmPassword').value()
    await fetch(
      `/api/users/${session.userId}/changepassword`,
      {
        method: 'PUT',
        headers: {
          "X-Powered-By": "Express",
          "Content-Type": "application/json; charset=utf-8",
          "Connection": "keep-alive",
          "Keep-Alive": "timeout=5",
        },
        body: {
          'password': `${newPassword}`
        }
      }
    ).then(response => {
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
    const newDisplayName = document.getElementById("displayname").value();
    await fetch(`/api/users/${session.userId}/account`, {
      method: "PUT",
      headers: {
        "X-Powered-By": "Express",
        "Content-Type": "application/json; charset=utf-8",
        "Connection": "keep-alive",
        "Keep-Alive": "timeout=5",
      },
      body: {
        displayname: `${newDisplayName}`,
      },
    }).then((response) => {
      console.log(response);
    });
  } catch (err) {
    console.error(err);
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

// TODO - REFACTOR!!!