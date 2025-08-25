'use client'

export default function SubscribeButton() {
  const handleClick = () => {
    // TODO: replace with Stripe checkout or your flow
    alert('Checkout coming soon')
  }

  return (
    <button
      onClick={handleClick}
      className="w-full rounded-xl bg-blue-700 px-4 py-2 text-white hover:opacity-90"
      type="button"
    >
      Subscribe
    </button>
  )
}
