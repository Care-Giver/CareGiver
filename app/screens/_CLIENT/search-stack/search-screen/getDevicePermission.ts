/* eslint-disable no-fallthrough */
import { Platform } from "react-native"
import { PERMISSIONS, PermissionStatus, RESULTS, check, request } from "react-native-permissions"

type PossiblePermission = "location" | "camera" | "photo"

const strings = {
  PERMISSION_UNAVAILABLE: "알 수 없는 이유로 권한 요청이 불가능합니다.",
  PERMISSION_BLOCKED: "권한 요청이 거부되었습니다.",
}

const androidPermissions = {
  location: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  camera: PERMISSIONS.ANDROID.CAMERA,
  photo: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
}
const iosPermissions = {
  location: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  camera: PERMISSIONS.IOS.CAMERA,
  photo: PERMISSIONS.IOS.PHOTO_LIBRARY,
}
const permissionsPerOS = Platform.OS === "ios" ? iosPermissions : androidPermissions

/**
 * 디바이스 권한을 요청합니다. (참고: https://velog.io/@dalbodre_ari/%EC%9A%B0%EC%95%84%ED%95%98%EA%B2%8C-react-native-%EA%B6%8C%ED%95%9C-%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0)
 * @param permission 위치, 카메라, 사진
 * @param onSuccess 권한을 얻었을때 실행할 함수
 * @param onFailed 거부 당했을때 실행할 함수
 * @param essential 필수권한여부 (필수라면, 설정화면으로 이동시킵니다.)
 * @returns
 */
export const getDevicePermission = async (
  permission: PossiblePermission,
  onSuccess?: () => void,
  onFailed?: () => void,
  essential = false,
): Promise<boolean> => {
  const needPermission = permissionsPerOS[permission]
  // permissionModalStore.setMessage(PERMISSION_REQUEST_MESSAGE[permission]);
  // permissionModalStore.setOpen(true);

  const handlePermissionSuccess = () => {
    if (onSuccess) onSuccess()
    // permissionModalStore.setOpen(false);
    // permissionModalStore.setMessage('');
    return true
  }

  const handlePermissionError = (message: string, openSetting = false) => {
    // if (openSetting) goToSettings(message);
    if (onFailed) onFailed()
    // permissionModalStore.setOpen(false);
    // permissionModalStore.setMessage('');
    return false
  }

  let requested: PermissionStatus
  const checked = await check(needPermission)
  console.log(`getDevicePermission - ${permission} checked:`, checked)
  switch (checked) {
    case RESULTS.UNAVAILABLE:
      return handlePermissionError(strings.PERMISSION_UNAVAILABLE, essential)
    case RESULTS.GRANTED:
      return handlePermissionSuccess()
    case RESULTS.DENIED:
      requested = await request(needPermission)
      if (requested === RESULTS.GRANTED) {
        return handlePermissionSuccess()
      }
    case RESULTS.LIMITED:
    case RESULTS.BLOCKED:
    default:
      return handlePermissionError(strings.PERMISSION_BLOCKED, essential)
  }
}
