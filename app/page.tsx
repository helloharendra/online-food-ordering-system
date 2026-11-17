import { Bike, Clock, IndianRupee, MapPin, Star } from 'lucide-react'
import Menu from '@/components/Menu'
import { restaurant as r } from '@/lib/data'

export default function Home() {
  return (
    <>
      <header className="relative h-[340px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={r.cover} alt={r.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/10" />
        <div className="container-x relative flex h-full flex-col justify-end pb-10 text-white">
          <span className="w-fit rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold">● Open now · Closes 11:30 PM</span>
          <h1 className="mt-4 font-display text-5xl font-extrabold tracking-tight">{r.name}</h1>
          <p className="mt-1 text-white/80">{r.tagline}</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <span className="flex items-center gap-1.5"><span className="flex items-center gap-1 rounded-lg bg-emerald-600 px-2 py-0.5 font-bold"><Star className="h-3.5 w-3.5 fill-white" />{r.rating}</span>{r.ratings} ratings</span>
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{r.time}</span>
            <span className="flex items-center gap-1.5"><IndianRupee className="h-4 w-4" />{r.costForTwo} for two</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{r.address}</span>
          </div>
        </div>
      </header>

      <div className="container-x -mt-6 relative z-10">
        <div className="flex flex-wrap gap-3">
          {[['🎉', '20% OFF up to ₹120', 'Use code TANDOOR20'], ['🚚', 'Free delivery', 'On orders above ₹499'], ['💳', '10% cashback', 'With UPI payments']].map(([e, t, s]) => (
            <div key={t} className="flex min-w-[220px] flex-1 items-center gap-3 rounded-2xl border border-dashed border-brand-200 bg-white p-4 shadow-sm">
              <span className="text-2xl">{e}</span>
              <div><p className="text-sm font-bold text-slate-900">{t}</p><p className="text-xs text-slate-500">{s}</p></div>
            </div>
          ))}
        </div>
      </div>

      <Menu />

      <div className="container-x mt-12">
        <div className="flex items-center gap-4 rounded-3xl bg-slate-900 p-6 text-white">
          <Bike className="h-10 w-10 shrink-0 text-brand-400" />
          <p className="text-sm text-slate-300">Order directly from the restaurant and skip aggregator commissions. <b className="text-white">Your own branded ordering site & app</b>, built by Naya Prayog Technologies.</p>
        </div>
      </div>
    </>
  )
}
