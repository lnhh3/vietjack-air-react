import federation, { Remotes, VitePluginFederationOptions } from '@originjs/vite-plugin-federation';

const remoteUrl = (baseUrl: string) => `${baseUrl}/assets/remoteEntry.js`;

const ViteFederation = (env: Record<string, string>) => {
  const remotesUrl: Remotes = {
    '@authRemote': remoteUrl(env.VITE_AUTH_REMOTE_URL),
  };

  const opt: VitePluginFederationOptions = {
    name: 'host-app',
    remotes: remotesUrl,
    shared: ['react', 'react-dom', 'zustand', 'react-router-dom'],
  };

  return federation(opt);
};

export default ViteFederation;
