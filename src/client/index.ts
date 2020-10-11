export * from './app';

if (process.env.NODE_ENV === 'development' && (module as any).hot) {
  (module as any).hot.accept(function() {
    location.reload();
  });
}
