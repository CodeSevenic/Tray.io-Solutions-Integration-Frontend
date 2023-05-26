import { ToastContainer, toast } from 'react-toastify/dist/react-toastify';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import { withTheme } from '@material-ui/core/styles/index';
import React, { useState, useContext, useEffect } from 'react';
import Loading from './Loading';
import { get } from 'lodash';
import 'react-toastify/dist/ReactToastify.css';

import { openConfigWindow } from '../lib/configWindow';

import {
  updateSolutionInstance,
  updateSolutionInstanceConfig,
  deleteSolutionInstance,
} from '../api/solutions';
import { ConfigWizard } from './ConfigWizard';
import TextField from '@material-ui/core/TextField';
import { getAuthCreateUrl } from '../api/me';
import { openAuthWindow } from '../lib/authWindow';
import { AppContext } from '../context';

const Instance = ({ id, name, enabled, loadAllSolutionInstances, last }) => {
  const { setConfigFinished, configFinished } = useContext(AppContext);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [instanceState, setInstanceState] = useState(undefined);
  const [configWizardSrc, setConfigWizardSrc] = useState(undefined);
  const [authExternalId, setAuthExternalId] = useState(undefined);
  const [authUrlParams, setAuthUrlParams] = useState('');

  const openWizard = (openInIframe, addCustomValidation = false) => {
    updateSolutionInstanceConfig(id).then(({ body }) => {
      const url = addCustomValidation
        ? `${body.data.popupUrl}&customValidation=true`
        : body.data.popupUrl;

      if (!openInIframe) {
        const configWindow = openConfigWindow();
        configWindow.location = url;
      } else {
        setConfigWizardSrc(url);
      }
    });
  };

  const onClickConfigure = () => {
    openWizard(false, false);
  };

  const onClickConfigureWithValidation = () => {
    openWizard(false, true);
  };

  const onClickConfigureInIframe = () => {
    openWizard(true, false);
  };

  const onClickEnable = () => {
    const currentState = instanceState !== undefined ? instanceState : enabled;
    updateSolutionInstance(id, !currentState).then(() => {
      setInstanceState(!currentState);
    });
  };

  const onClickDelete = () => {
    deleteSolutionInstance(id).then(loadAllSolutionInstances);
  };

  const closeIframe = () => {
    setConfigWizardSrc(undefined);
  };

  const onCreateAuth = () => {
    getAuthCreateUrl(id, authExternalId).then(({ body }) => {
      openAuthWindow(`${body.data.popupUrl}&${authUrlParams}`);
    });
  };

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    if (name === 'authExternalId') {
      setAuthExternalId(value);
    } else if (name === 'authUrlParams') {
      setAuthUrlParams(value);
    }
  };

  const enabledState = instanceState !== undefined ? instanceState : enabled;
  // If the state of the instance has changed, show a toast
  const [wasEnabled, setWasEnabled] = useState(enabledState);
  useEffect(() => {
    if (!wasEnabled && enabledState) {
      toast.success(`${name} has now been enabled`);
    }
    setWasEnabled(enabledState);
  }, [enabledState, wasEnabled, name]);

  console.log('Instance Component', configFinished);

  const styles = {
    controls: {
      margin: '10px',
      float: 'right',
      maxWidth: '400px',
    },
    pill: {
      backgroundColor: enabledState ? '#7ebc54' : '#df5252',
      borderRadius: '4px',
      marginRight: '10px',
      color: 'white',
      padding: '3px 5px',
    },
    item: {
      width: '100%',
      border: 'none',
    },
    name: {
      marginTop: '2px',
    },
    button: {
      width: '100%',
      marginBottom: '10px',
    },
    textFields: {
      width: '100%',
      margin: '10px 0',
    },
  };

  console.log('NAME & ENABLED?: ', name, enabled, last);

  if (configFinished && last === 'YES') {
    updateSolutionInstance(id, true).then(() => {
      setConfigFinished(false);
      setInstanceState(true);
    });
  }

  return (
    <Loading loading={loading}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <ExpansionPanel key={id} style={styles.item}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <span style={styles.pill}>{enabled ? 'enabled' : 'disabled'}</span>
          <Typography style={styles.name}>{name}</Typography>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <div id="Controls" style={styles.controls}>
            <Button
              style={styles.button}
              onClick={onClickEnable}
              variant="outlined"
              color="primary"
            >
              {enabledState ? 'Disable' : 'Enable'}
            </Button>
            {/* <Button
                                style={styles.button}
                                onClick={onClickConfigure}
                                variant="outlined"
                                color="primary"
                            >
                                Configure
                            </Button>
                            <Button
                                style={styles.button}
                                onClick={onClickConfigureWithValidation}
                                variant="outlined"
                                color="primary"
                            >
                                Configure with custom validation
                            </Button>
                            <Button
                                style={styles.button}
                                onClick={onClickConfigureInIframe}
                                variant="outlined"
                                color="primary"
                            >
                                Configure in iframe
                            </Button> */}
            <Button
              style={styles.button}
              onClick={onClickDelete}
              variant="outlined"
              color="primary"
            >
              Delete
            </Button>

            {/* <Typography variant="title">Create auth</Typography>
              <TextField
                style={styles.textFields}
                label="Auth external id"
                value={authExternalId}
                onChange={handleChange('authExternalId')}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                style={styles.textFields}
                label="Advanced Url Params"
                value={authUrlParams}
                onChange={handleChange('authUrlParams')}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button
                style={styles.button}
                onClick={onCreateAuth}
                variant="outlined"
                color="primary"
                disabled={!authExternalId}
              >
                Create auth
              </Button> */}
          </div>
          {configWizardSrc && <ConfigWizard src={configWizardSrc} onClose={closeIframe} />}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Loading>
  );
};

export default withTheme()(Instance);
