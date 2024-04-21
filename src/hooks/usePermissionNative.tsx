import {useState, useEffect} from 'react';
import {PermissionsAndroid, PermissionStatus} from 'react-native';

interface PermissionResult {
  granted: boolean;
  denied: boolean;
  never_ask_again: boolean;
}

const usePermissions = (
  permissions: PermissionsAndroid.Permission[],
): PermissionResult => {
  const [result, setResult] = useState<PermissionResult>({
    granted: false,
    denied: false,
    never_ask_again: false,
  });

  useEffect(() => {
    const checkPermissions = async () => {
      try {
        const results = await PermissionsAndroid.requestMultiple(permissions);

        setResult({
          granted: Object.values(results).every(
            (status: PermissionStatus) => status === 'granted',
          ),
          denied: Object.values(results).every(
            (status: PermissionStatus) => status === 'denied',
          ),
          never_ask_again: Object.values(results).some(
            (status: PermissionStatus) => status === 'never_ask_again',
          ),
        });
      } catch (error) {
        console.log('PERMISSION ERROR:', error);
      }
    };

    checkPermissions();
  }, [permissions]);

  return result;
};

export default usePermissions;
