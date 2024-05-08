import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

const Fallback = ({ error }: { error: Error }) => {
  return (
    <section className="flex justify-center items-center w-screen h-screen text-secondary">
      <div className="text-center max-w-[500px] px-5">
        <h1 className="font-minecraft text-4xl text-rose-500 mb-5">Error</h1>
        <p className="text-2xl">{error.message}</p>
      </div>
    </section>
  );
};

export const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactErrorBoundary FallbackComponent={Fallback}>
      {children}
    </ReactErrorBoundary>
  );
};
