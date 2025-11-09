// Register Service Worker for PWA functionality
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    // Register service worker
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker registered with scope: ', registration.scope);
          
          // Check for updates every 1 hour
          setInterval(() => {
            registration.update().catch(console.error);
          }, 60 * 60 * 1000);

          // Check for updates when the page regains focus
          window.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
              registration.update().catch(console.error);
            }
          });

          // Listen for controller change (when a new service worker takes over)
          let refreshing = false;
          navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (!refreshing) {
              refreshing = true;
              window.location.reload();
            }
          });
        })
        .catch(error => {
          console.error('Service Worker registration failed: ', error);
        });
    });
  }
};

// Request notification permission
export const requestNotificationPermission = async () => {
  if ('Notification' in window) {
    try {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }
  return false;
};

// Add to home screen prompt
let deferredPrompt;

export const initializeAddToHomeScreen = () => {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    
    // Show your custom install button
    showInstallButton();
  });

  window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    hideInstallButton();
  });
};

const showInstallButton = () => {
  // You can show a custom install button here
  console.log('App can be installed');
};

const hideInstallButton = () => {
  // Hide the install button
  console.log('App installed, hiding install button');
};

export const promptInstall = async () => {
  if (deferredPrompt) {
    // Show the prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    
    // Clear the deferredPrompt variable
    deferredPrompt = null;
  }
};
