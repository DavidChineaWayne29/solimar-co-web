import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { MenuItem } from '@/types'

interface RawMenuItem {
  id: string
  name: string
  description: string | null
  price: string
  allergens: string[] | null
  image: string | null
  menu_categories: { name: string }
}

export function useMenuData(fallback: MenuItem[] = []) {
  const [items, setItems] = useState<MenuItem[]>(fallback)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('menu_items')
      .select('id, name, description, price, allergens, image, menu_categories!inner(name)')
      .order('sort_order', { ascending: true })
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          setItems(
            (data as unknown as RawMenuItem[]).map((row) => ({
              category: row.menu_categories.name,
              name: row.name,
              description: row.description ?? undefined,
              price: row.price,
              allergens: row.allergens ?? undefined,
              image: row.image ?? undefined,
            }))
          )
        }
        setLoading(false)
      })
  }, [])

  return { items, loading }
}
