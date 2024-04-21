import {useState, useEffect} from 'react';
import PermissionsAndroid, {
  PERMISSIONS,
  RESULTS,
  PermissionStatus,
} from 'react-native-permissions';

interface PermissionStatuses {
  [key: string]: PermissionStatus;
}

interface PermissionResult {
  status: 'granted' | 'denied' | 'never_ask_again' | 'unknown';
  statuses: PermissionStatuses;
}

const usePermission = (requestedPermissions: string[]): PermissionResult => {
  const [permissionResult, setPermissionResult] = useState<PermissionResult>({
    status: 'unknown',
    statuses: {},
  });

  useEffect(() => {
    const checkPermissions = async () => {
      const results = await PermissionsAndroid.requestMultiple(
        requestedPermissions,
      );

      const statuses = requestedPermissions.reduce((acc, permission) => {
        acc[permission] = results[permission];
        return acc;
      }, {} as PermissionStatuses);

      setPermissionResult({
        status: determineOverallStatus(statuses),
        statuses,
      });
    };

    checkPermissions();
  }, [requestedPermissions]);

  const determineOverallStatus = (
    statuses: PermissionStatuses,
  ): PermissionResult['status'] => {
    const granted = Object.values(statuses).every(
      value => value === RESULTS.GRANTED,
    );
    const denied = Object.values(statuses).some(
      value => value === RESULTS.DENIED,
    );
    const neverAskAgain = Object.values(statuses).some(
      value => value === RESULTS.NEVER_ASK_AGAIN,
    );

    if (granted) return 'granted';
    if (denied) return 'denied';
    if (neverAskAgain) return 'never_ask_again';
    return 'unknown';
  };

  return permissionResult;
};

export default usePermission;
