import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { getApiHost, hasCodespaceName } from './lib/api';
import './App.css';

const tabs = [
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  return (
    <div className="appShell">
      <header className="topbar">
        <div>
          <h1>OctoFit Tracker</h1>
          <p className="subtitle">React 19 presentation tier for the multi-tier app</p>
        </div>
        <div className="apiInfo">
          <span className="label">API host</span>
          <span className="value">{getApiHost()}</span>
        </div>
      </header>

      {!hasCodespaceName() && (
        <p className="notice">
          VITE_CODESPACE_NAME is not set. Falling back to localhost to avoid invalid
          Codespaces URLs.
        </p>
      )}

      <nav className="navTabs" aria-label="OctoFit resources">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) => (isActive ? 'tab active' : 'tab')}
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
