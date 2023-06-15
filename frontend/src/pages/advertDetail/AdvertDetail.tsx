import AdvertCreation from '../../components/advertCreation/AdvertCreation';
import AdvertInformation from '../../components/AdvertInformation/AdvertInformation';

import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getAdvert } from '../../services/advertsApi';
import { Spin } from 'antd';
import { useRecoilValue } from 'recoil';
import { AuthToken, UserRole } from '../../state/atom';
import { getMyData } from '../../services/userApi';

const AdvertDetail = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const token = useRecoilValue(AuthToken);
  const isAdmin = useRecoilValue(UserRole) === 'ADMIN';
  const {
    data: user,
    mutate,
    isLoading: isLoadingUser,
  } = useMutation({
    mutationFn: () => getMyData(token),
  });

  const { id } = useParams();
  if (!id) {
    return <></>;
  }

  const { isLoading: isLoadingAdvert, data: advert } = useQuery({
    queryKey: ['get-advert'],
    queryFn: () => getAdvert(id),
  });

  if (isLoadingAdvert || isLoadingUser) {
    return <Spin size="large" className="spinner" />;
  }

  if (token !== null && token !== '') {
    mutate();
  }

  return isEditing ? (
    <AdvertCreation advert={advert?.data} setIsEditing={setIsEditing} />
  ) : (
    <AdvertInformation
      advert={advert?.data}
      setIsEditing={setIsEditing}
      canEdit={user?.data.id === advert?.data.creatorId || isAdmin}
    />
  );
};

export default AdvertDetail;
