import advertPlaceholder from '../../assets/advertDetailPlaceholder.json';

import AdvertCreation from '../../components/advertCreation/AdvertCreation';
import AdvertInformation from '../../components/AdvertInformation/AdvertInformation';

import { useParams } from 'react-router-dom';
import React, { useState } from 'react';

const AdvertDetail = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { id } = useParams(); // TODO get advert
  const advert = advertPlaceholder;

  return isEditing ? (
    <AdvertCreation advert={advert} setIsEditing={setIsEditing} />
  ) : (
    <AdvertInformation advert={advert} setIsEditing={setIsEditing} />
  );
};

export default AdvertDetail;
