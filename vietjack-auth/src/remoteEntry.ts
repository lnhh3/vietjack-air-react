import useAuthStore from '@/store/useAuth';

import authRouter, { authRemoteId, prefix } from './routes/index';
import useAuthRemoteConfig from './store/useAuthRemoteConfig';

export { authRemoteId, authRouter, prefix, useAuthRemoteConfig, useAuthStore };
