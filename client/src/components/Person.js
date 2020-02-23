import React from 'react';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';

export default function OutlinedChips({
  id,
  name,
  handleLoadUsers,
  handleRemovePerson,
}) {
  const handleDelete = () => {
    handleRemovePerson(id, () => {
      handleLoadUsers();
    });
  };

  return (
    <Chip
      icon={<FaceIcon />}
      label={name}
      onDelete={handleRemovePerson === undefined ? null : handleDelete}
      variant="outlined"
    />
  );
}
