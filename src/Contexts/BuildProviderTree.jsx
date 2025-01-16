import GLOBALCONTEXT from './GlobalContext';
import AppContext from './ApplicationContext';
import AuthContext from './AuthenticationContext';
import NOTIFICATIONCONTEXT from './NotificationContext';

const BuildProviderTree = (providers) => {
    if (providers.length === 1) {
        return providers[0];
    }
    const A = providers.shift();
    const B = providers.shift();
    return BuildProviderTree([
        ({ children }) => (
            <A>
                <B>{children}</B>
            </A>
        ),
        ...providers,
    ]);
};

export const Providers = BuildProviderTree([
    GLOBALCONTEXT,
    AppContext,
    NOTIFICATIONCONTEXT,
    AuthContext,
]);
