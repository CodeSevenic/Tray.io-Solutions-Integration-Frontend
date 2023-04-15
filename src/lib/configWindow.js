import React from 'react';
import { useHistory } from 'react-router-dom';
import { deleteSolutionInstance } from '../api/solutions';

let configFinished = false;

export const openConfigWindow = (onFinishCallback, setConfigFinished = () => {}) => {
  // Must open window from user interaction code otherwise it is likely
  // to be blocked by a popup blocker:
  const configWindow = window.open(undefined, '_blank', 'width=500,height=500,scrollbars=no');

  // Listen to popup messages
  const onmessage = (e) => {
    // console.log('message', e.data.type, e.data);
    // console.log('Instance ID: ', e?.data?.data?.solutionInstanceId);

    if (e.data.type === 'tray.configPopup.error') {
      // Handle popup error message
      deleteSolutionInstance(e?.data?.data?.solutionInstanceId).then(
        console.log('Instance not finished then deleted.')
      );
      alert(`Error: ${e.data.err}`);
      setConfigFinished(false);
      configWindow.close();
    }
    if (e.data.type === 'tray.configPopup.cancel') {
      deleteSolutionInstance(e?.data?.data?.solutionInstanceId).then(
        console.log('Instance not finished then deleted.')
      );
      setConfigFinished(false);
      configWindow.close();
    }
    if (e.data.type === 'tray.configPopup.finish') {
      // Handle popup finish message
      configFinished = true;
      setConfigFinished(true);

      configWindow.close();
      if (typeof onFinishCallback === 'function') {
        onFinishCallback();
      }
    }
    if (e.data.type === 'tray.configPopup.validate') {
      // Return validation in progress
      configWindow.postMessage(
        {
          type: 'tray.configPopup.client.validation',
          data: {
            inProgress: true,
          },
        },
        '*'
      );

      setTimeout(() => {
        // Add errors to all inputs
        const errors = e.data.data.visibleValues.reduce((errors, externalId) => {
          console.log(`Visible ${externalId} value:`, e.data.data.configValues[externalId]);
          // Uncomment next line to set an error message
          // errors[externalId] = 'Custom error message';
          return errors;
        }, {});

        // Return validation
        configWindow.postMessage(
          {
            type: 'tray.configPopup.client.validation',
            data: {
              inProgress: false,
              errors: errors,
            },
          },
          '*'
        );
      }, 2000);
    }
  };
  window.addEventListener('message', onmessage);

  // Check if popup window has been closed before finishing the configuration.
  // We use a polling function due to the fact that some browsers may not
  // display prompts created in the beforeunload event handler.
  const CHECK_TIMEOUT = 1000;
  const checkWindow = () => {
    if (configWindow.closed) {
      // Handle popup closing
      if (!configFinished) {
        alert('Configuration not finished');
      } else {
        alert(
          'Configuration finished. You can enable the new ' +
            'solution instance from the "Solutions > My Instances" section'
        );
        console.log('Configuration finished');
      }
      window.removeEventListener('message', onmessage);
    } else {
      setTimeout(checkWindow, CHECK_TIMEOUT);
    }
  };

  checkWindow();

  return configWindow;
};
