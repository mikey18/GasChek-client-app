import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { AuthContext } from '../Contexts/AuthenticationContext';
import { useContext, useEffect, useCallback } from 'react';
import axios from 'axios';
import { decrypt } from '../functions/encryption';
import { NOTIFICATIONCONTEXT } from '../Contexts/NotificationContext';

export const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

const Firebase = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const { notification_succeed, setNotification_succeed } =
        useContext(NOTIFICATIONCONTEXT);

    const register_token = useCallback(
        async (currentToken) => {
            const generateUniqueId = () => {
                const timestamp = new Date().getTime();
                const randomNumber = Math.random()
                    .toString(36)
                    .substring(2, 15);
                return `${timestamp}-${randomNumber}`;
            };
            const unique_id = generateUniqueId();
            localStorage.setItem('qid', unique_id);

            const response = await axios.post(
                `${import.meta.env.VITE_APP_FCM_URL}reg_push/`,
                {
                    reg_id: currentToken,
                    device_id: unique_id,
                    type: 'web',
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('gaschek'),
                    },
                },
            );
            const decrypted_response = JSON.parse(decrypt(response.data));
            if (decrypted_response.status === 200) {
                // console.log('worked')
                setNotification_succeed(true);
            }
            // else{
            //     console.log('nope')
            // }
        },
        [setNotification_succeed],
    );

    useEffect(() => {
        if (isAuthenticated) {
            const register_push_notification = () => {
                if ('Notification' in window) {
                    // console.log('Requesting permission...');
                    Notification.requestPermission().then((permission) => {
                        if (permission === 'granted') {
                            // console.log('Notification permission granted.');
                            if (notification_succeed === false) {
                                // console.log('setting token');
                                try {
                                    getToken(messaging, {
                                        vapidKey: import.meta.env
                                            .VITE_APP_VAPID_KEY,
                                    }).then((currentToken) => {
                                        if (currentToken) {
                                            register_token(currentToken);
                                        }
                                    });
                                } catch (error) {
                                    return null;
                                }
                            }
                            onMessage(messaging, (payload) => {
                                const notification = new Notification(
                                    payload.data.title,
                                    {
                                        body: payload.data.body,
                                        image: payload.data.image,
                                        icon: payload.data.image,
                                        // badge: "https://res.cloudinary.com/dmxpt5tfh/image/upload/v1688099824/MiqetNotificationbadge-nobg_lrmzzf.png",
                                    },
                                );

                                // Handle notification click event
                                notification.onclick = function () {
                                    // Open the URL when the notification is clicked
                                    const url = `${import.meta.env.VITE_APP_URL}/dashboard`;
                                    if (url) {
                                        window.open(url, '_blank');
                                    }
                                };
                            });
                        } else {
                            register_push_notification();
                        }
                    });
                }
            };
            register_push_notification();
        }
    }, [isAuthenticated, register_token, notification_succeed]);
};

export default Firebase;
