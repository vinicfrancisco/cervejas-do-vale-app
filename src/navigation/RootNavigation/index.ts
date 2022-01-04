import { createNavigationContainerRef } from '@react-navigation/native';
import { AppStackParamList } from '~/@types/navigation';

export const navigationRef = createNavigationContainerRef<AppStackParamList>();

type Screen = keyof AppStackParamList;

export function navigate(name: Screen, params: any): void {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function reset(name: Screen): void {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{ name }],
    });
  }
}
