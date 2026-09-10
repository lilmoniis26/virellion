import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { signOut } from '@/lib/auth-client';

type Section = 'overview' | 'users' | 'content' | 'payments' | 'settings' | 'appearance' | 'security';

export function DashboardPage() {
  const [activeSection, setActiveSection] = useState<Section>('overview');
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate({ to: '/' });
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection />;
      case 'users':
        return <UsersSection />;
      case 'content':
        return <ContentSection />;
      case 'payments':
        return <PaymentsSection />;
      case 'settings':
        return <SettingsSection />;
      case 'appearance':
        return <AppearanceSection />;
      case 'security':
        return <SecuritySection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-900 border-r border-slate-700 shadow-lg min-h-[calc(100vh-64px)]">
          <nav className="p-6 space-y-2">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Main</h3>
            <NavItem
              label="Dashboard"
              icon="📊"
              active={activeSection === 'overview'}
              onClick={() => setActiveSection('overview')}
            />
            <NavItem
              label="Users"
              icon="👥"
              active={activeSection === 'users'}
              onClick={() => setActiveSection('users')}
            />
            <NavItem
              label="Content"
              icon="📝"
              active={activeSection === 'content'}
              onClick={() => setActiveSection('content')}
            />
            
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-6 mb-4">Configuration</h3>
            <NavItem
              label="Payments"
              icon="💳"
              active={activeSection === 'payments'}
              onClick={() => setActiveSection('payments')}
            />
            <NavItem
              label="Settings"
              icon="⚙️"
              active={activeSection === 'settings'}
              onClick={() => setActiveSection('settings')}
            />
            <NavItem
              label="Appearance"
              icon="🎨"
              active={activeSection === 'appearance'}
              onClick={() => setActiveSection('appearance')}
            />
            <NavItem
              label="Security"
              icon="🔒"
              active={activeSection === 'security'}
              onClick={() => setActiveSection('security')}
            />
            
            <div className="pt-6 mt-6 border-t border-slate-700">
              <button
                onClick={handleSignOut}
                className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-900/20 rounded transition"
              >
                🚪 Sign Out
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-6xl">
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  );
}

function NavItem({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2 rounded transition flex items-center gap-3 ${
        active
          ? 'bg-blue-600 text-white'
          : 'text-slate-300 hover:bg-slate-800'
      }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function OverviewSection() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
      <p className="text-slate-400 mb-8">Full control over your site configuration and content</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Users" value="1" icon="👥" />
        <StatCard title="Total Revenue" value="$0.00" icon="💰" />
        <StatCard title="Active Sessions" value="1" icon="🔄" />
        <StatCard title="System Status" value="Healthy" icon="✅" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-lg shadow-xl p-6 border border-slate-700">
          <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <QuickActionButton label="Add New User" icon="➕" />
            <QuickActionButton label="Create Content" icon="📄" />
            <QuickActionButton label="View Analytics" icon="📈" />
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg shadow-xl p-6 border border-slate-700">
          <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
          <p className="text-slate-400 text-sm">No activity yet. Start by exploring the dashboard sections.</p>
        </div>
      </div>
    </div>
  );
}

function UsersSection() {
  const [users] = useState<any[]>([]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Users</h1>
          <p className="text-slate-400">Manage site users and permissions</p>
        </div>
        <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition">
          + Add User
        </button>
      </div>

      <div className="bg-slate-800 rounded-lg shadow-xl border border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-900 border-b border-slate-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Role</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-slate-400">
                  No users yet. Start by adding your first team member.
                </td>
              </tr>
            ) : (
              users.map((user, idx) => (
                <tr key={idx} className="border-t border-slate-700 hover:bg-slate-700/50 transition">
                  <td className="px-6 py-4 text-sm text-white">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-300">{user.email}</td>
                  <td className="px-6 py-4 text-sm"><span className="px-2 py-1 bg-blue-900/50 text-blue-300 rounded text-xs">{user.role}</span></td>
                  <td className="px-6 py-4 text-sm"><button className="text-blue-400 hover:text-blue-300">Edit</button></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ContentSection() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Content Management</h1>
          <p className="text-slate-400">Create, edit, and manage your site content</p>
        </div>
        <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition">
          + New Content
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ContentCard title="Pages" description="Manage site pages" icon="📄" />
        <ContentCard title="Blog Posts" description="Write and publish posts" icon="📝" />
        <ContentCard title="Media" description="Manage images and videos" icon="🖼️" />
      </div>
    </div>
  );
}

function PaymentsSection() {
  const [paypalConfig, setPaypalConfig] = useState({ clientId: '', secret: '' });
  const [stripeKey, setStripeKey] = useState('');
  const [showPaypalModal, setShowPaypalModal] = useState(false);

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Payment Methods</h1>
      <p className="text-slate-400 mb-8">Configure payment options for your site</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PayPal - Inactive */}
        <div className="bg-slate-800 rounded-lg shadow-xl p-6 border-2 border-slate-700 hover:border-slate-600 transition">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🅿️</div>
              <div>
                <h2 className="text-xl font-bold text-white">PayPal</h2>
                <p className="text-sm text-slate-400">Coming Soon</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-yellow-900/50 text-yellow-300 rounded text-xs font-semibold">INACTIVE</span>
          </div>
          <p className="text-slate-300 text-sm mb-4">
            Add your PayPal account credentials to enable PayPal payments on your site.
          </p>
          <div className="space-y-2 mb-4 text-sm text-slate-400 bg-slate-900/50 p-3 rounded">
            <p>📋 To enable PayPal:</p>
            <ol className="list-decimal list-inside space-y-1 text-xs">
              <li>Open <code className="bg-slate-700 px-2 py-1 rounded">src/config/payments.ts</code></li>
              <li>Add your PayPal Client ID and Secret</li>
              <li>Uncomment the PayPal provider section</li>
              <li>Redeploy your site</li>
            </ol>
          </div>
          <button
            onClick={() => setShowPaypalModal(true)}
            className="w-full px-4 py-2 border border-yellow-600 text-yellow-400 hover:bg-yellow-900/20 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled
          >
            Configure PayPal (Disabled)
          </button>
        </div>

        {/* Stripe - Active */}
        <div className="bg-slate-800 rounded-lg shadow-xl p-6 border-2 border-blue-600 hover:border-blue-500 transition">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="text-4xl">💳</div>
              <div>
                <h2 className="text-xl font-bold text-white">Stripe</h2>
                <p className="text-sm text-slate-400">Ready to use</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-900/50 text-green-300 rounded text-xs font-semibold">ACTIVE</span>
          </div>
          <p className="text-slate-300 text-sm mb-4">
            Accept credit cards and digital wallets securely with Stripe.
          </p>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">API Key</label>
              <input
                type="password"
                value={stripeKey}
                onChange={(e) => setStripeKey(e.target.value)}
                placeholder="sk_live_..."
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition">
              Save Stripe Configuration
            </button>
          </div>
        </div>
      </div>

      {/* Payment Settings */}
      <div className="mt-8 bg-slate-800 rounded-lg shadow-xl p-6 border border-slate-700">
        <h2 className="text-xl font-bold text-white mb-4">Payment Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
              <span className="text-slate-300">Enable recurring billing</span>
            </label>
          </div>
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
              <span className="text-slate-300">Require customer address</span>
            </label>
          </div>
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
              <span className="text-slate-300">Send payment receipts</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsSection() {
  const [siteName, setSiteName] = useState('Virellion');
  const [siteUrl, setSiteUrl] = useState('https://virellion.vercel.app');

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
      <p className="text-slate-400 mb-8">Configure general site settings</p>

      <div className="bg-slate-800 rounded-lg shadow-xl p-6 border border-slate-700">
        <h2 className="text-xl font-bold text-white mb-6">Site Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Site Name</label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Site URL</label>
            <input
              type="url"
              value={siteUrl}
              onChange={(e) => setSiteUrl(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function AppearanceSection() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Appearance</h1>
      <p className="text-slate-400 mb-8">Customize the look and feel of your site</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-lg shadow-xl p-6 border border-slate-700">
          <h2 className="text-lg font-bold text-white mb-4">Theme</h2>
          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="radio" name="theme" defaultChecked className="w-4 h-4" />
              <span className="text-slate-300">Dark</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="radio" name="theme" className="w-4 h-4" />
              <span className="text-slate-300">Light</span>
            </label>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg shadow-xl p-6 border border-slate-700">
          <h2 className="text-lg font-bold text-white mb-4">Primary Color</h2>
          <input type="color" defaultValue="#2563eb" className="w-full h-10 rounded cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

function SecuritySection() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Security</h1>
      <p className="text-slate-400 mb-8">Manage your account security and access</p>

      <div className="space-y-6">
        <div className="bg-slate-800 rounded-lg shadow-xl p-6 border border-slate-700">
          <h2 className="text-lg font-bold text-white mb-4">Two-Factor Authentication</h2>
          <p className="text-slate-300 text-sm mb-4">Add an extra layer of security to your account</p>
          <button className="px-6 py-2 border border-blue-600 text-blue-400 hover:bg-blue-900/20 rounded-lg transition">
            Enable 2FA
          </button>
        </div>

        <div className="bg-slate-800 rounded-lg shadow-xl p-6 border border-slate-700">
          <h2 className="text-lg font-bold text-white mb-4">Change Password</h2>
          <div className="space-y-3">
            <input type="password" placeholder="Current password" className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="password" placeholder="New password" className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="password" placeholder="Confirm new password" className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition">
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="bg-slate-800 rounded-lg shadow-xl p-6 border border-slate-700">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-slate-400 text-sm">{title}</p>
          <p className="text-2xl font-bold text-white mt-2">{value}</p>
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
  );
}

function QuickActionButton({
  label,
  icon,
}: {
  label: string;
  icon: string;
}) {
  return (
    <button className="w-full text-left px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded transition flex items-center gap-3 text-slate-300 hover:text-white">
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function ContentCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="bg-slate-800 rounded-lg shadow-xl p-6 border border-slate-700 hover:border-blue-600 transition cursor-pointer">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-400 text-sm mb-4">{description}</p>
      <button className="text-blue-400 hover:text-blue-300 text-sm font-semibold">
        Manage →
      </button>
    </div>
  );
}