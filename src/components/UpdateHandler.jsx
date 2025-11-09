import { useEffect } from 'react';

const UpdateHandler = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const handleUpdate = async () => {
        try {
          const registration = await navigator.serviceWorker.getRegistration();
          if (registration && registration.waiting) {
            // Create a message channel for communication
            const channel = new MessageChannel();
            channel.port1.onmessage = () => window.location.reload();
            
            // Send skip waiting message
            registration.waiting.postMessage({ type: 'SKIP_WAITING' }, [channel.port2]);
          }
        } catch (error) {
          console.error('Error handling service worker update:', error);
        }
      };

      // Check for updates when component mounts
      handleUpdate();

      // Listen for controller change (when a new service worker takes over)
      const onControllerChange = () => window.location.reload();
      navigator.serviceWorker.addEventListener('controllerchange', onControllerChange);
      
      return () => {
        navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange);
      };
    }
  }, []);

  return null; // No UI needed
};

export default UpdateHandler;
