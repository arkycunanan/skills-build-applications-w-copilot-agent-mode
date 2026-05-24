import { useApiCollection } from '../hooks/useApiCollection';

// Codespaces endpoint pattern: -8000.app.github.dev/api/teams
function Teams() {
  const { endpoint, items, pagination, isLoading, error } = useApiCollection('teams');

  return (
    <section className="panel">
      <header className="panelHeader">
        <h2>Teams</h2>
        <p className="endpoint">{endpoint}</p>
      </header>

      {isLoading && <p>Loading teams...</p>}
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

export default Teams;
