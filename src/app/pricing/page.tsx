import BackHome from '@/components/BackHome'
import SubscribeButton from '@/components/SubscribeButton'

export const dynamic = 'force-static'

export const metadata = {
  title: 'Subscription — Biblical Counselling',
  description: 'Plans that support the project and unlock extras.',
}

type PlanProps = {
  name: string
  price: string
  features: string[]
  cta: React.ReactNode
  highlight?: boolean
}

function Plan({ name, price, features, cta, highlight = false }: PlanProps) {
  return (
    <div
      className={[
        'rounded-2xl p-5 border',
        highlight
          ? 'bg-white text-blue-700 border-white shadow-lg'
          : 'bg-white/5 text-white border-white/20',
      ].join(' ')}
    >
      <h3 className="text-xl font-semibold">{name}</h3>
      <div className="mt-1 text-3xl font-extrabold">{price}</div>

      <ul className="mt-4 space-y-2 text-sm leading-relaxed">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-current/70" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6">{cta}</div>
    </div>
  )
}

export default function PricingPage() {
  return (
    <div className="w-full -mx-4 px-4 py-10 bg-blue-700 text-white">
      <div className="mx-auto max-w-5xl">
        <BackHome linkClass="text-white/90 hover:text-white" sepClass="text-white/60" />

        <h1 className="text-3xl font-bold">Subscription</h1>
        <p className="mt-2 text-white/90">
          Support the project and unlock extras. Cancel anytime.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Plan
            name="Starter"
            price="$0"
            features={[
              'Browse topics & verses',
              'AI Assistant (offline/testing mode)',
              'Regular content updates',
            ]}
            cta={
              <button
                className="w-full rounded-xl border border-white/30 px-4 py-2 hover:bg-white/10"
                disabled
                title="You’re on this plan"
                type="button"
              >
                Current plan
              </button>
            }
          />

          <Plan
            name="Pro"
            price="$5 / mo"
            highlight
            features={[
              'AI Assistant with live LLM API',
              'Priority topic/feature requests',
              'Early access to new packs',
            ]}
            cta={<SubscribeButton />}
          />
        </div>

        <div className="mt-8 rounded-2xl border border-white/20 bg-white/5 p-5 text-sm leading-relaxed">
          <p>
            <span className="font-semibold">Note:</span> This site provides biblical
            encouragement and prayer prompts. It is not a substitute for professional
            counseling, medical care, legal advice, or emergency services.
          </p>
        </div>
      </div>
    </div>
  )
}
