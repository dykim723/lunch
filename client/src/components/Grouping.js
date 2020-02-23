import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from './TextField';
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
  const classes = useStyles();

  const shuffle = array => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  const makeGroups = () => {
    let groupNo = 0;
    setNumber('');

    shuffle(props.people);

    if (type === 'groups_number') {
      groupNo = makeNumberOfGroups();
    } else {
      groupNo = makeMinimumMemberSize();
    }

    props.handleGroups(groupNo);
  };

  const changeGroupNumber = e => {
    setNumber(e.target.value);
  };

  const makeNumberOfGroups = () => {
    let people = props.people;
    let groupNo = number;
    let numPeopleOfGroup = Math.ceil(people.length / parseInt(groupNo));

    let groupIdx = 0;
    let groupCnt = numPeopleOfGroup;
    people.forEach(e => {
      if (groupCnt > 0) {
        e.group = groupIdx;
        groupCnt--;

        if (groupCnt === 0) {
          groupIdx++;
          groupCnt = numPeopleOfGroup;
        }
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
        <Radio handleRadio={getGroupingType}></Radio>
        <TextField value={number} handleChange={changeGroupNumber}></TextField>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          color="primary"
          href="#outlined-buttons"
          onClick={makeGroups}
        >
          Make Groups
        </Button>
      </CardActions>
    </Card>
  );
}
