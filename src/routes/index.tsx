import { Link } from '@tanstack/react-router'

export function IndexPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold text-white mb-4">Welcome to Virellion</h1>
        <p className="text-xl text-slate-300 mb-8">
          Build and manage your applications with ease
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/login"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
          >
            Sign In
          </Link>
          <button className="px-6 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold rounded-lg transition">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  )
}