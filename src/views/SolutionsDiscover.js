import React, { useState, useEffect, useContext } from 'react';
import View from '../components/View';
import Error from '../components/Error';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Loading from '../components/Loading';
import { withRouter } from 'react-router-dom';

import { openConfigWindow } from '../lib/configWindow';
import { listSolutions, createSolutionInstance, updateSolutionInstance } from '../api/solutions';
import { AppContext } from '../context';

const SolutionsDiscover = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [solutions, setSolutions] = useState([]);
  const { setConfigFinished, configFinished } = useContext(AppContext);

  console.log('Solutions Discover');

  useEffect(() => {
    listSolutions().then(({ ok, body }) => {
      if (ok) {
        setSolutions(body.data);
        setLoading(false);
      } else {
        setError(body);
        setLoading(false);
      }
    });
  }, []);

  const onUseWorkflowClick = (id, name) => {
    const { history } = props;
    const configWindow = openConfigWindow(() => {
      history.push('/solutions/mine');
    }, setConfigFinished(true));

    createSolutionInstance(id, name).then(({ body }) => {
      configWindow.location = body.data.popupUrl;
    });
  };

  console.log('Hello: ', configFinished);

  const buildList = (solutions) => {
    const styles = {
      controls: { marginLeft: '20px' },
      button: { width: '100%' },
      text: { fontWeight: 'bold' },
      grid: {
        maxWidth: '900px',
        margin: '20px auto',
      },
      header: { margin: '20px' },
      list: {
        margin: '10px',
        maxWidth: '1000px',
        backgroundColor: 'white',
      },
    };

    return (
      <Grid item style={styles.grid}>
        <Typography variant="headline" style={styles.header}>
          Discover solutions
        </Typography>
        <Paper className="solutions-list">
          <List style={styles.list}>
            {solutions.map(({ title, id }, index) => (
              <ListItem divider={index !== solutions.length - 1} key={index}>
                <ListItemText style={styles.text} primary={title} secondary={null} />
                <ListItemSecondaryAction onClick={() => onUseWorkflowClick(id, title)}>
                  <Button style={styles.button} variant="outlined" color="primary">
                    Use
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
    );
  };

  return (
    <View>
      <Loading loading={loading}>{error ? <Error msg={error} /> : buildList(solutions)}</Loading>
    </View>
  );
};

export default withRouter(SolutionsDiscover);
