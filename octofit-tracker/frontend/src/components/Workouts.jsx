import { useApiCollection } from '../hooks/useApiCollection';

function Workouts() {
  const { endpoint, items, pagination, isLoading, error } = useApiCollection('workouts');

  return (
    <section className="panel">
      <header className="panelHeader">
        <h2>Workouts</h2>
        <p className="endpoint">{endpoint}</p>
      </header>

      {isLoading && <p>Loading workouts...</p>}
      {error && <p className="error">{error}</p>}

      {!isLoading && !error && (
        <>
          <p className="meta">Records: {items.length}</p>
          <pre className="json">{JSON.stringify(items, null, 2)}</pre>
          {pagination && <p className="meta">Total count: {pagination.count ?? 'n/a'}</p>}
        </>
      )}
    </section>
  );
}

export default Workouts;
