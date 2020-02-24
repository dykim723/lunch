import React, { useState } from 'react';

import {
  makeStyles,
  Button,
  Box,
  Card,
  CardContent,
  CardActions,
  TextField,
} from '@material-ui/core/';

// import TextField from './TextField';
import Radio from './Radio';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Grouping(props) {
  const [number, setNumber] = useState('');
  const [type, setType] = useState('groups_number');
  const [fieldError, setFieldError] = useState(false);
  const classes = useStyles();

  const validation = {
    isNotEmpty: function(str) {
      return parseInt(str) !== ''; // returns a boolean
    },
    isNotNumber: function(str) {
      const pattern = /^(\(?\+?[0-9]*\)?)?[0-9_\- ()]*$/;
      return !pattern.test(str); // returns a boolean
    },
  };

  const shuffle = array => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  const makeGroups = e => {
    let groupNo = 0;
    let error = false;

    if (number !== '' && validation.isNotEmpty(number)) {
      setFieldError(false);

      if (!fieldError) {
        shuffle(props.people);

        if (type === 'groups_number') {
          groupNo = makeNumberOfGroups();

          if (groupNo > props.people.length) {
            error = true;
            props.alertError(
              'Cannot create more groups than the number of people.',
            );
          }
        } else {
          groupNo = makeMinimumMemberSize();

          if (number > props.people.length) {
            error = true;
            props.alertError('Minumum member size error');
          }
        }

        if (!error) {
          props.handleGroups(groupNo);
        }
      }
    } else {
      setFieldError(true);
    }

    setNumber('');
  };

  const changeGroupNumber = e => {
    if (validation.isNotNumber(e.target.value)) {
      setNumber('');
      setFieldError(true);
    } else {
      setNumber(e.target.value);
      setFieldError(false);
    }
  };

  const makeNumberOfGroups = () => {
    let people = props.people;
    let groupNo = number;

    let groupIdx = 0;

    people.forEach(e => {
      if (parseInt(groupNo) === 1) {
        groupIdx = 0;
      }
      e.group = groupIdx;

      if (groupIdx === parseInt(groupNo) - 1) {
        groupIdx = 0;
      } else {
        groupIdx++;
      }
    });

    return groupNo;
  };

  const makeMinimumMemberSize = () => {
    let people = props.people;
    let groupNo = Math.floor(people.length / parseInt(number));
    let numPeopleOfGroup = number;

    let groupIdx = 0;
    let groupCnt = numPeopleOfGroup;
    people.forEach((e, i) => {
      if (groupCnt > 0) {
        e.group = groupIdx;
        groupCnt--;

        if (groupCnt === 0) {
          groupIdx++;
          if (groupNo <= groupIdx) {
            e.group = --groupIdx;
          }
          groupCnt = numPeopleOfGroup;
        }
      }
    });
    return groupNo;
  };

  const getGroupingType = e => {
    setType(e.target.value);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Box>
          <Radio handleRadio={getGroupingType}></Radio>
          {/* <TextField value={number} onChange={changeGroupNumber}></TextField> */}
          <TextField
            error={fieldError}
            id="standard-error-helper-text"
            value={number}
            onChange={changeGroupNumber}
            label={fieldError ? 'Error' : 'Number'}
            helperText={fieldError ? 'Please enter a valid number' : ''}
          ></TextField>
        </Box>
      </CardContent>
      <CardActions>
        <Button variant="outlined" color="primary" onClick={makeGroups}>
          Make Groups
        </Button>
      </CardActions>
    </Card>
  );
}
