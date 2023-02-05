// *****Code to send user to full event page from homepage *****
const getFullEvent = async (eventId) => {
  // Request full event page from backend
  const currentUrl = document.location.href;
  document.location.href = currentUrl + `api/events/${eventId}`;
}

//change password 
const subNewPassBtn = getElemById("submitButton")
const changePassword = async () => {
  try{
  const newPassword = getElemById('confirmPassword').value()
  await fetch(
	`/api/users/${session.userId}/changepassword`,
	{
		method: 'PUT',
    headers: {
      "X-Powered-By" : "Express",
      "Content-Type" : "application/json; charset=utf-8",
      "Connection" : "keep-alive",
      "Keep-Alive" : "timeout=5",
},
		body: {
			'password': `${newPassword}`
		}
	}
).then(response => {
	console.log(response);
});
  } catch(err){
    console.error(err)
  }
}

subNewPassBtn.onclick(changePassword);

//functionality for the change password button so it appears on click
const changePassModal = () => {
   const modal = getElemById("ChangePassword");
   modal.style.visibility = visible;
 };

 //begin functions for changing a display name of a user

 const subNewNameBtn = getElemById("newNameButton");
 const changeDisplayName = async () => {
   try {
     const newDisplayName = getElemById("displayname").value();
     await fetch(`/api/users/${session.userId}/account`, {
       method: "PUT",
       headers: {
         "X-Powered-By": "Express",
         "Content-Type": "application/json; charset=utf-8",
         "Connection": "keep-alive",
         "Keep-Alive": "timeout=5",
       },
       body: {
         displayname : `${newDisplayName}`,
       },
     }).then((response) => {
       console.log(response);
     });
   } catch (err) {
     console.error(err);
   }
 };

 //runs the function to update user name
 subNewNameBtn.onclick(changeDisplayName);