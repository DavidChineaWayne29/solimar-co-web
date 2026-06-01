import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { supabase } from '@/lib/supabase'
import { Pencil, Trash2, Plus, X, Check, Leaf } from 'lucide-react'

interface MenuItem {
  id: string
  name: string
  description: string | null
  price: string
  allergens: string[] | null
  image: string | null
  category_id: string
  sort_order: number
  category_name?: string
}

interface Category {
  id: string
  name: string
}

const emptyForm = {
  id: '',
  name: '',
  description: '',
  price: '',
  allergens: '',
  image: '',
  category_id: '',
}

export function MenuManager() {
  const { t } = useTranslation()
  const [items, setItems] = useState<MenuItem[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [form, setForm] = useState(emptyForm)
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const fetchData = async () => {
    const [{ data: cats }, { data: menuItems }] = await Promise.all([
      supabase.from('menu_categories').select('id, name').order('sort_order'),
      supabase
        .from('menu_items')
        .select('*, menu_categories!inner(name)')
        .order('sort_order'),
    ])
    setCategories(cats ?? [])
    setItems(
      (menuItems ?? []).map((i: any) => ({
        ...i,
        category_name: i.menu_categories?.name ?? '',
      }))
    )
    setLoading(false)
  }

  useEffect(() => { fetchData() }, [])

  const openAdd = () => {
    setForm({ ...emptyForm, category_id: categories[0]?.id ?? '' })
    setEditing(true)
  }

  const openEdit = (item: MenuItem) => {
    setForm({
      id: item.id,
      name: item.name,
      description: item.description ?? '',
      price: item.price,
      allergens: item.allergens?.join(', ') ?? '',
      image: item.image ?? '',
      category_id: item.category_id,
    })
    setEditing(true)
  }

  const handleSave = async () => {
    if (!form.name.trim() || !form.price.trim()) return
    setSaving(true)
    const payload = {
      name: form.name.trim(),
      description: form.description.trim() || null,
      price: form.price.trim(),
      allergens: form.allergens
        ? form.allergens.split(',').map((s) => s.trim()).filter(Boolean)
        : null,
      image: form.image.trim() || null,
      category_id: form.category_id,
    }
    if (form.id) {
      await supabase.from('menu_items').update(payload).eq('id', form.id)
    } else {
      await supabase.from('menu_items').insert([payload])
    }
    setSaving(false)
    setEditing(false)
    setForm(emptyForm)
    fetchData()
  }

  const handleDelete = async (id: string) => {
    if (!confirm(t('admin.menu.confirmDelete'))) return
    await supabase.from('menu_items').delete().eq('id', id)
    fetchData()
  }

  const inputClass =
    'w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white'
  const labelClass = 'block text-xs font-body text-neutral-600 mb-1'

  if (loading) return <p className="text-neutral-500 text-sm">{t('common.loading')}</p>

  const grouped = categories.reduce<Record<string, MenuItem[]>>((acc, cat) => {
    acc[cat.name] = items.filter((i) => i.category_id === cat.id)
    return acc
  }, {})

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-display text-xl text-neutral-900">{t('admin.tabs.menu')}</h2>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-800 transition-colors"
        >
          <Plus size={16} />
          {t('admin.menu.addItem')}
        </button>
      </div>

      {/* Form */}
      {editing && (
        <div className="bg-white border border-neutral-200 rounded-xl shadow-sm p-6 space-y-4">
          <h3 className="font-display text-base text-neutral-800">
            {form.id ? t('admin.menu.editItem') : t('admin.menu.addItem')}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{t('admin.menu.category')}</label>
              <select
                value={form.category_id}
                onChange={(e) => setForm((f) => ({ ...f, category_id: e.target.value }))}
                className={inputClass}
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>{t('admin.menu.name')} *</label>
              <input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder={t('admin.menu.namePlaceholder')}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>{t('admin.menu.price')} *</label>
              <input
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                placeholder={t('admin.menu.pricePlaceholder')}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>{t('admin.menu.allergens')}</label>
              <input
                value={form.allergens}
                onChange={(e) => setForm((f) => ({ ...f, allergens: e.target.value }))}
                placeholder={t('admin.menu.allergensPlaceholder')}
                className={inputClass}
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>{t('admin.menu.description')}</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder={t('admin.menu.descPlaceholder')}
                rows={2}
                className={`${inputClass} resize-none`}
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>URL de imagen</label>
              <input
                value={form.image}
                onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                placeholder="https://images.unsplash.com/..."
                className={inputClass}
              />
              {form.image && (
                <img
                  src={form.image}
                  alt="Preview"
                  className="mt-2 h-24 w-full object-cover rounded-lg border border-neutral-200"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              )}
            </div>
          </div>

          <p className="font-body text-xs text-neutral-400 flex items-center gap-1">
            <Leaf size={11} className="text-green-600" />
            Tip: usa "vegetariano" o "vegano" en alérgenos para mostrar el icono de planta
          </p>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-primary-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-primary-800 transition-colors disabled:opacity-50"
            >
              <Check size={15} />
              {saving ? 'Guardando...' : t('admin.menu.save')}
            </button>
            <button
              onClick={() => { setEditing(false); setForm(emptyForm) }}
              className="flex items-center gap-2 border border-neutral-200 text-neutral-600 px-5 py-2 rounded-lg text-sm hover:bg-neutral-50 transition-colors"
            >
              <X size={15} />
              {t('admin.menu.cancel')}
            </button>
          </div>
        </div>
      )}

      {/* Items by category */}
      {Object.keys(grouped).length === 0 ? (
        <div className="text-center py-12 text-neutral-400">
          <p className="font-display text-lg mb-2">{t('admin.menu.noItems')}</p>
          <p className="font-body text-sm">Añade el primer plato con el botón de arriba</p>
        </div>
      ) : (
        Object.entries(grouped).map(([catName, catItems]) => (
          <div key={catName}>
            <h3 className="font-display text-sm uppercase tracking-widest text-neutral-400 border-b border-neutral-100 pb-2 mb-3">
              {catName}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {catItems.length === 0 ? (
                <p className="text-neutral-400 text-sm italic col-span-2">—</p>
              ) : (
                catItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 bg-white border border-neutral-100 rounded-xl p-3 hover:border-neutral-200 transition-colors"
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-neutral-100 rounded-lg flex-shrink-0 flex items-center justify-center text-2xl">
                        🍽
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm text-neutral-900 font-medium truncate">{item.name}</p>
                      {item.description && (
                        <p className="font-body text-xs text-neutral-400 truncate mt-0.5">{item.description}</p>
                      )}
                      <p className="font-display text-sm text-primary-600 mt-1">{item.price}</p>
                    </div>
                    <div className="flex flex-col gap-1 flex-shrink-0">
                      <button
                        onClick={() => openEdit(item)}
                        className="p-1.5 text-neutral-300 hover:text-primary-600 transition-colors"
                        aria-label={t('admin.menu.editItem')}
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 text-neutral-300 hover:text-red-500 transition-colors"
                        aria-label={t('admin.menu.delete')}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
