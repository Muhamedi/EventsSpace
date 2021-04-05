import React, { useState, useEffect } from 'react';
import MainLayout from 'components/MainLayout';
import GroupCard from 'components/GroupCard';
import Button from 'components/Button';
import { ButtonTypes } from 'constants/enums';

const EventInvite = props => {
  return (
    <MainLayout>
      <div className='row m-3'>
        <div className='col-md-3'>
          <Button
            text='Add new'
            icon='fa fa-plus-square'
            className={ButtonTypes.INFO}
            onClick={() => {}}
          />
        </div>
      </div>
      <div className='row m-3'>
        <div className='col-md-3'>
          <GroupCard />
        </div>
        <div className='col-md-3'>
          <GroupCard />
        </div>
      </div>
    </MainLayout>
  );
};

export default EventInvite;
