import React from 'react';
import { Button, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <View>
      <Button title="sair" onPress={signOut} />
    </View>
  );
};

export default Dashboard;
