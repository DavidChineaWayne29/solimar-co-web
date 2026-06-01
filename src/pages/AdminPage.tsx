import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { supabase } from '@/lib/supabase'
import { MenuManager } from '@/components/admin/MenuManager'
import { ReservationsManager } from '@/components/admin/ReservationsManager'
import { MessagesManager } from '@/components/admin/MessagesManager'
import type { User } from '@supabase/supabase-js'
import { LogOut, UtensilsCrossed, CalendarDays, MessageSquare } from 'lucide-react'

type Tab = 'menu' | 'reservations' | 'messages'

export function AdminPage() {
  const { t } = useTranslation()
  const [user, setUser] = useState<User | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<Tab>('menu')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setLoginError(t('admin.loginError'))
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <p className="font-body text-neutral-500">{t('common.loading')}</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8 w-full max-w-sm">
          <h1 className="font-display text-2xl text-neutral-900 mb-6">{t('admin.loginTitle')}</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="font-body text-sm text-neutral-700 block mb-1">{t('admin.email')}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full border border-neutral-200 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 transition"
              />
            </div>
            <div>
              <label className="font-body text-sm text-neutral-700 block mb-1">{t('admin.password')}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full border border-neutral-200 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 transition"
              />
            </div>
            {loginError && (
              <p className="font-body text-sm text-red-600">{loginError}</p>
            )}
            <button
              type="submit"
              className="w-full bg-primary-600 text-white py-3 rounded-lg font-body text-sm hover:bg-primary-800 transition-colors"
            >
              {t('admin.login')}
            </button>
          </form>
        </div>
      </div>
    )
  }

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'menu', label: t('admin.tabs.menu'), icon: <UtensilsCrossed size={18} /> },
    { id: 'reservations', label: t('admin.tabs.reservations'), icon: <CalendarDays size={18} /> },
    { id: 'messages', label: t('admin.tabs.messages'), icon: <MessageSquare size={18} /> },
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between h-16">
          <h1 className="font-display text-lg text-neutral-900">{t('admin.title')}</h1>
          <div className="flex items-center gap-4">
            <span className="font-body text-xs text-neutral-500 hidden sm:block">{user.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 font-body text-sm text-neutral-600 hover:text-red-600 transition-colors"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">{t('admin.logout')}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-neutral-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex gap-0">
          {tabs.map((t_) => (
            <button
              key={t_.id}
              onClick={() => setTab(t_.id)}
              className={`flex items-center gap-2 px-4 py-4 font-body text-sm border-b-2 transition-colors ${
                tab === t_.id
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700'
              }`}
            >
              {t_.icon}
              <span className="hidden sm:inline">{t_.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {tab === 'menu' && <MenuManager />}
        {tab === 'reservations' && <ReservationsManager />}
        {tab === 'messages' && <MessagesManager />}
      </main>
    </div>
  )
}
