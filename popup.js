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
          if (localStorage.getItem('config-vehicle-speed')) {
            localStorage.setItem('config-vehicle-speed', speed);
            alert('Vehicle speed set to ' + speed);
          } else {
            alert('config-vehicle-speed not found in localStorage.');
          }
        },
        args: [speed]
      });
    });
  } else {
    alert("Please enter a valid speed.");
  }
});
