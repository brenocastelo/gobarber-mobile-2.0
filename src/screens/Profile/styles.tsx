import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;

  padding: 0 30px 150px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;
  margin: 16px 0;
`;

export const ProfilePictureButton = styled.TouchableOpacity`
  align-self: center;
`;

export const ProfilePicture = styled.Image`
  width: 148px;
  height: 148px;
  border-radius: 74px;
`;

export const HeaderButton = styled.TouchableOpacity``;

export const CameraIconContainer = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  background: #ff9000;
  height: 45px;
  width: 45px;
  border-radius: 22px;
`;
