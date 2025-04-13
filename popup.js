// Handle "Set Speed" button
document.getElementById('setSpeed').addEventListener('click', () => {
  let speed = document.getElementById('speedInput').value;
  
  if (speed) {
    // Convert input to a number and enforce maximum speed
    speed = Number(speed);
    if (speed > 1e+200) {
      alert("Maximum speed is 1e+200. Please enter a smaller value.");
      return;
    }

    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        func: (speed) => {
          try {
            // Create the key if it doesn't exist
            if (!localStorage.getItem('config-vehicle-speed')) {
              console.log('Creating config-vehicle-speed in localStorage');
            }
            
            localStorage.setItem('config-vehicle-speed', speed);
            alert('Vehicle speed set to ' + speed);
            console.log('Vehicle speed set to:', speed);

            // Auto-refresh the page
            location.reload();
          } catch (error) {
            console.error('Error setting speed:', error);
            alert('Error: Could not set speed. The website might be restricting access to localStorage.');
          }
        },
        args: [speed]
      }).catch(error => {
        console.error('Script execution error:', error);
        alert('Error: Could not execute script on this page. Make sure you are on the correct website.');
      });
    });
  } else {
    alert("Please enter a valid speed.");
  }
});

// Handle "Reset Speed" button
document.getElementById('resetSpeed').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      func: () => {
        try {
          // Create the key if it doesn't exist
          if (!localStorage.getItem('config-vehicle-speed')) {
            console.log('Creating config-vehicle-speed in localStorage');
          }
          
          localStorage.setItem('config-vehicle-speed', 1);
          console.log("Vehicle speed reset to 1");
          alert('Vehicle speed reset to 1');

          // Auto-refresh the page
          location.reload();
        } catch (error) {
          console.error('Error resetting speed:', error);
          alert('Error: Could not reset speed. The website might be restricting access to localStorage.');
        }
      }
    }).catch(error => {
      console.error('Script execution error:', error);
      alert('Error: Could not execute script on this page. Make sure you are on the correct website.');
    });
  });
});
