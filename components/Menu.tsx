'use client'

import { useMemo, useState } from 'react'
import { Flame, Minus, Plus, Search, ShoppingBag, Star, X } from 'lucide-react'
import { useCart } from '@/lib/cart'
import { inr } from '@/lib/utils'
import { addOns, categories, dishes, type Dish } from '@/lib/data'
import { useContact } from './ContactModal'

const VegMark = ({ veg }: { veg: boolean }) => (
  <span className={`grid h-4 w-4 place-items-center rounded-sm border-2 ${veg ? 'border-emerald-600' : 'border-rose-700'}`}>
    <span className={`h-1.5 w-1.5 rounded-full ${veg ? 'bg-emerald-600' : 'bg-rose-700'}`} />
  </span>
)

export default function Menu() {
  const { items, add, update, subtotal, count } = useCart()
  const { openContact } = useContact()
  const [cat, setCat] = useState(categories[0])
  const [vegOnly, setVegOnly] = useState(false)
  const [q, setQ] = useState('')
  const [custom, setCustom] = useState<Dish | null>(null)
  const [extras, setExtras] = useState<string[]>([])
  const [spice, setSpice] = useState('Medium')
  const [mode, setMode] = useState<'Delivery' | 'Pickup'>('Delivery')

  const list = useMemo(() => dishes.filter((d) =>
    (cat === 'Recommended' ? d.bestseller || d.rating >= 4.7 : d.category === cat) && (!vegOnly || d.veg) && d.name.toLowerCase().includes(q.toLowerCase()),
  ), [cat, vegOnly, q])

  const qtyOf = (id: string) => items.filter((i) => i.id.startsWith(id)).reduce((s, i) => s + i.qty, 0)
  const extraTotal = addOns.filter((a) => extras.includes(a.name)).reduce((s, a) => s + a.price, 0)
  const delivery = mode === 'Delivery' && subtotal < 499 ? 40 : 0
  const taxes = subtotal * 0.05

  const confirm = () => {
    if (!custom) return
    const key = [custom.id, spice, ...extras].join('|')
    add({ id: key, name: custom.name, price: custom.price + extraTotal, image: custom.image, variant: [spice + ' spice', ...extras].join(' · ') })
    setCustom(null)
  }

  return (
    <div className="container-x mt-10 grid gap-8 lg:grid-cols-[200px_1fr_360px]">
      {/* Categories */}
      <nav className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:sticky lg:top-6 lg:mx-0 lg:h-fit lg:flex-col lg:px-0">
        {categories.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-left text-sm font-semibold transition ${cat === c ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/25' : 'bg-white text-slate-600 hover:bg-slate-100 lg:bg-transparent'}`}>{c}</button>
        ))}
      </nav>

      {/* Dishes */}
      <section>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1"><Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search the menu" className="input rounded-full pl-10" /></div>
          <button onClick={() => setVegOnly(!vegOnly)} className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold ring-1 transition ${vegOnly ? 'bg-emerald-50 text-emerald-700 ring-emerald-300' : 'bg-white text-slate-600 ring-slate-200'}`}>
            <VegMark veg /> Veg only
          </button>
        </div>
        <h2 className="font-display text-2xl font-bold text-slate-900">{cat} <span className="text-base font-medium text-slate-400">({list.length})</span></h2>
        <div className="mt-4 divide-y divide-slate-200">
          {list.map((d) => {
            const qty = qtyOf(d.id)
            return (
              <article key={d.id} className="flex gap-5 py-6 animate-fade-up">
                <div className="flex-1">
                  <div className="flex items-center gap-2"><VegMark veg={d.veg} />{d.bestseller && <span className="text-xs font-bold text-amber-600">★ Bestseller</span>}{d.spicy && <Flame className="h-4 w-4 text-rose-500" />}</div>
                  <h3 className="mt-1.5 text-lg font-semibold text-slate-900">{d.name}</h3>
                  <p className="font-semibold text-slate-800">{inr(d.price)}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-slate-500"><Star className="h-3.5 w-3.5 fill-emerald-600 text-emerald-600" />{d.rating}</p>
                  <p className="mt-2 max-w-md text-sm text-slate-500">{d.desc}</p>
                </div>
                <div className="relative h-36 w-36 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={d.image} alt={d.name} loading="lazy" className="h-full w-full rounded-2xl object-cover" />
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                    {qty === 0 ? (
                      <button onClick={() => { setCustom(d); setExtras([]); setSpice('Medium') }} className="rounded-xl bg-white px-7 py-2 text-sm font-extrabold text-emerald-600 shadow-lg ring-1 ring-slate-200 transition hover:bg-emerald-50">ADD</button>
                    ) : (
                      <div className="flex items-center rounded-xl bg-white font-extrabold text-emerald-600 shadow-lg ring-1 ring-slate-200">
                        <button onClick={() => { const it = items.find((i) => i.id.startsWith(d.id)); if (it) update(it.id, it.qty - 1) }} className="px-3 py-2"><Minus className="h-4 w-4" /></button>
                        <span className="w-6 text-center">{qty}</span>
                        <button onClick={() => { setCustom(d); setExtras([]) }} className="px-3 py-2"><Plus className="h-4 w-4" /></button>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* Cart */}
      <aside className="h-fit rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200/70 lg:sticky lg:top-6">
        <div className="grid grid-cols-2 rounded-xl bg-slate-100 p-1">
          {(['Delivery', 'Pickup'] as const).map((m) => <button key={m} onClick={() => setMode(m)} className={`rounded-lg py-2 text-sm font-semibold transition ${mode === m ? 'bg-white text-slate-900 shadow' : 'text-slate-500'}`}>{m}</button>)}
        </div>
        <h3 className="mt-5 font-display text-lg font-bold text-slate-900">Your order {count > 0 && <span className="text-sm font-medium text-slate-400">· {count} items</span>}</h3>
        {items.length === 0 ? (
          <div className="py-10 text-center"><ShoppingBag className="mx-auto h-10 w-10 text-slate-200" /><p className="mt-3 text-sm text-slate-400">Your cart is empty.<br />Add something delicious!</p></div>
        ) : (
          <>
            <ul className="mt-4 space-y-4">
              {items.map((i) => (
                <li key={i.id} className="flex items-start gap-3 text-sm">
                  <div className="flex-1"><p className="font-semibold text-slate-800">{i.name}</p>{i.variant && <p className="text-xs text-slate-400">{i.variant}</p>}</div>
                  <div className="flex items-center rounded-lg text-emerald-600 ring-1 ring-slate-200">
                    <button onClick={() => update(i.id, i.qty - 1)} className="p-1"><Minus className="h-3.5 w-3.5" /></button>
                    <span className="w-5 text-center text-xs font-bold">{i.qty}</span>
                    <button onClick={() => update(i.id, i.qty + 1)} className="p-1"><Plus className="h-3.5 w-3.5" /></button>
                  </div>
                  <span className="w-14 text-right font-semibold">{inr(i.price * i.qty)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-5 space-y-2 border-t border-dashed border-slate-200 pt-4 text-sm text-slate-500">
              <div className="flex justify-between"><dt>Item total</dt><dd>{inr(subtotal)}</dd></div>
              {mode === 'Delivery' && <div className="flex justify-between"><dt>Delivery fee</dt><dd>{delivery ? inr(delivery) : <span className="font-semibold text-emerald-600">FREE</span>}</dd></div>}
              <div className="flex justify-between"><dt>GST & charges</dt><dd>{inr(taxes)}</dd></div>
              <div className="flex justify-between border-t border-slate-100 pt-2 text-base font-bold text-slate-900"><dt>To pay</dt><dd>{inr(subtotal + delivery + taxes)}</dd></div>
            </dl>
            <button onClick={() => openContact('Checkout, Payments & Live Order Tracking')} className="btn-primary mt-5 w-full rounded-xl py-3.5">Proceed to checkout</button>
          </>
        )}
      </aside>

      {/* Customisation modal */}
      {custom && (
        <div className="fixed inset-0 z-[80] grid place-items-end sm:place-items-center">
          <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" onClick={() => setCustom(null)} />
          <div className="relative w-full max-w-md overflow-hidden rounded-t-3xl bg-white shadow-2xl animate-scale-in sm:rounded-3xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={custom.image} alt="" className="h-44 w-full object-cover" />
            <button onClick={() => setCustom(null)} className="absolute right-3 top-3 rounded-full bg-white/90 p-1.5"><X className="h-5 w-5" /></button>
            <div className="p-6">
              <div className="flex items-center gap-2"><VegMark veg={custom.veg} /><h3 className="font-display text-xl font-bold">{custom.name}</h3></div>
              <p className="mt-5 text-sm font-semibold text-slate-900">Spice level</p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {['Mild', 'Medium', 'Hot'].map((s) => <button key={s} onClick={() => setSpice(s)} className={`rounded-xl py-2 text-sm font-semibold ring-1 transition ${spice === s ? 'bg-brand-50 text-brand-700 ring-brand-400' : 'ring-slate-200 text-slate-600'}`}>{s}</button>)}
              </div>
              <p className="mt-5 text-sm font-semibold text-slate-900">Add-ons <span className="font-normal text-slate-400">(optional)</span></p>
              <div className="mt-2 space-y-2">
                {addOns.map((a) => (
                  <label key={a.name} className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-sm hover:bg-slate-50">
                    <span className="flex items-center gap-3"><input type="checkbox" checked={extras.includes(a.name)} onChange={() => setExtras((e) => (e.includes(a.name) ? e.filter((x) => x !== a.name) : [...e, a.name]))} className="h-4 w-4 accent-red-600" />{a.name}</span>
                    <span className="text-slate-500">+{inr(a.price)}</span>
                  </label>
                ))}
              </div>
              <button onClick={confirm} className="btn-primary mt-6 w-full rounded-xl py-3.5">Add item · {inr(custom.price + extraTotal)}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
