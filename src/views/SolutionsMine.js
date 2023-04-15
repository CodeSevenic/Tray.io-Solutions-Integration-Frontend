import React, { useState, useEffect, useContext } from 'react';
import View from '../components/View';
import Error from '../components/Error';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/core/styles/index';
import Loading from '../components/Loading';
import Instance from '../components/Instance';

import { listSolutionInstances, updateSolutionInstance } from '../api/solutions';
import { AppContext } from '../context';

const SolutionsMine = () => {
  const styles = {
    list: {
      maxWidth: '1000px',
      margin: 'auto',
      marginBottom: '30px',
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    },
  };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [solutionInstances, setSolutionInstances] = useState([]);

  useEffect(() => {
    loadAllSolutionInstances();
  }, []);

  const loadAllSolutionInstances = () => {
    listSolutionInstances().then(({ ok, body }) => {
      if (ok) {
        setSolutionInstances(body.data);
        setLoading(false);
      } else {
        setError(body);
        setLoading(false);
      }
    });
  };

  const { setConfigFinished, configFinished } = useContext(AppContext);

  const buildList = (solutionInstances) => {
    return (
      <div className="solutions-list" style={styles.list}>
        {solutionInstances.length === 0 ? (
          <Typography variant="headline" style={{ margin: '20px 0' }}>
            Your have not initiated a solution yet 😒
          </Typography>
        ) : (
          <Typography variant="headline" style={{ margin: '20px 0' }}>
            My Solution Instances
          </Typography>
        )}
        {solutionInstances.map(({ id, name, enabled }, index) => {
          let isLast = 'NO';
          if (index === solutionInstances.length - 1) {
            isLast = 'YES';
          }
          return (
            <Instance
              id={id}
              key={id}
              name={name}
              last={isLast}
              enabled={enabled}
              loadAllSolutionInstances={loadAllSolutionInstances}
            />
          );
        })}
      </div>
    );
  };

  return (
    <View>
      <Loading loading={loading}>
        {error ? <Error msg={error} /> : buildList(solutionInstances)}
      </Loading>
    </View>
  );
};

export default withTheme()(SolutionsMine);
