let notificatinButton = document.getElementById("notificatinButton");
let notificationBar = document.getElementById("notificationBar");

notificatinButton.addEventListener('click', function() {
    notificationBar.classList.toggle('activeNotification')
})