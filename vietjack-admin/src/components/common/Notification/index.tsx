import useNotificationStore from '@/hooks/useNotificationStore';

import { Notification } from './NotificationItem';

const Notifications = () => {
  const { notifications, dismissNotification } = useNotificationStore();

  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 z-[999999999] flex flex-col items-center justify-end gap-2"
    >
      <div className="flex flex-col w-full max-w-sm gap-3 mb-8">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            notification={notification}
            onDismiss={dismissNotification}
          />
        ))}
      </div>
    </div>
  );
};

export default Notifications;
