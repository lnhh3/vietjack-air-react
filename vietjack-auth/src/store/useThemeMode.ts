import useAuthConfig from './useAuthConfig';

const useThemeMode = () => {
  const { themeMode } = useAuthConfig();

  return themeMode;
};

export default useThemeMode;
