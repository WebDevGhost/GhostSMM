const webhookURL = "https://discord.com/api/webhooks/1327258135806869574/FAAhyj6NHaHVC5Uuq-UWBmNGyDe0fqAXPVSG9fDkP_CBLaSCmJtPxqyDIaSQS7clyTRK";

async function sendVisitorNotification(totalVisits) {
  const payload = {
    embeds: [
      {
        title: "Visitor Notification",
        description: "You have a new Visitor!",
        color: 0x800080,
        fields: [
          {
            name: "Total Visits",
            value: `You have **${totalVisits}** total visits!`,
            inline: false
          }
        ],
        footer: {
          text: "Ghost SMM"
        },
        timestamp: new Date().toISOString()
      }
    ]
  };

  try {
    await fetch(webhookURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    console.log("Visitor notification sent successfully.");
  } catch (error) {
    console.error("Error sending notification:", error);
  }
}

function trackVisits() {
  let visits = localStorage.getItem("site_visits");
  
  if (visits) {
    visits = parseInt(visits) + 1;
  } else {
    visits = 1;
  }

  localStorage.setItem("site_visits", visits);

  sendVisitorNotification(visits);
}

window.onload = trackVisits;