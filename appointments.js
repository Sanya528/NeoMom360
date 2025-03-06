let appointments = [];

function bookAppointment() {
    const name = document.getElementById("name").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    if (!name || !date || !time) {
        alert("Please enter a name, select a date and time.");
        return;
    }

    const appointmentTime = new Date(`${date}T${time}:00`).getTime();

    const appointmentItem = {
        name,
        date,
        time,
        timestamp: appointmentTime
    };

    appointments.push(appointmentItem);
    appointments.sort((a, b) => a.timestamp - b.timestamp);
    renderAppointments();
    scheduleNotification(appointmentItem);
}

function renderAppointments() {
    const appointmentsList = document.getElementById("appointments-list");
    appointmentsList.innerHTML = "";

    const now = new Date().getTime();
    appointments = appointments.filter(appointment => appointment.timestamp > now);

    appointments.forEach(appointment => {
        const appointmentElement = document.createElement("div");
        appointmentElement.classList.add("appointment-item");
        appointmentElement.style.display = "flex";
        appointmentElement.style.justifyContent = "space-between";
        appointmentElement.style.alignItems = "center";
        appointmentElement.style.borderBottom = "1px solid #ddd";
        appointmentElement.style.padding = "10px 0";

        const details = document.createElement("div");
        details.innerHTML = `<strong>${appointment.name}</strong><br>${appointment.date} at ${appointment.time}`;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Cancel";
        deleteButton.classList.add("delete-btn");
        deleteButton.style.marginLeft = "20px";
        deleteButton.onclick = function() {
            appointments = appointments.filter(a => a !== appointment);
            renderAppointments();
        };

        appointmentElement.appendChild(details);
        appointmentElement.appendChild(deleteButton);
        appointmentsList.appendChild(appointmentElement);
    });
}

function scheduleNotification(appointment) {
    const now = new Date().getTime();
    const timeUntilAppointment = appointment.timestamp - now;

    if (timeUntilAppointment > 0) {
        setTimeout(() => {
            document.getElementById("notification-sound").play();
            alert(`Reminder: Your appointment '${appointment.name}' is scheduled at ${appointment.time} on ${appointment.date}!`);
            
            // Remove appointment from the list after notification
            appointments = appointments.filter(a => a !== appointment);
            renderAppointments();
        }, timeUntilAppointment);
    }
}