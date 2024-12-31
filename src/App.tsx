import { useAuthenticator } from '@aws-amplify/ui-react';
import UserCreateForm from '../ui-components/UserCreateForm';

function App() {
  const { authStatus } = useAuthenticator();

  // Only show UserCreateForm if user is authenticated
  if (authStatus !== 'authenticated') {
    return null; // This will allow the Authenticator to show instead
  }

  return (
    <UserCreateForm />
  );
}

export default App;