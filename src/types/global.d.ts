declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'js',
      eventNameOrId: string,
      params?: Record<string, string>
    ) => void;
  }
}
