import BackHome from '@/components/BackHome'

export const dynamic = 'force-static'

export const metadata = {
  title: 'About — Biblical Counselling',
  description:
    'What this site is for, how it works, and ways to seek care in person.',
}

// Reusable section panel
function Panel({
  id,
  children,
  className = '',
}: {
  id?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section
      id={id}
      className={`rounded-2xl bg-white/5 p-5 border border-white/20 leading-relaxed ${className}`}
    >
      {children}
    </section>
  )
}

export default function AboutPage() {
  return (
    <div className="w-full -mx-4 px-4 py-10 bg-blue-700 text-white">
      <div className="mx-auto max-w-3xl space-y-6">
        <BackHome linkClass="text-white/90 hover:text-white" sepClass="text-white/60" />

        <h1 className="text-3xl font-bold">About Biblical Counselling</h1>

        <Panel>
          <p>
            This site provides Scripture-anchored encouragement for common life struggles. It
            helps you explore Bible passages, reflect on practical guidance, and pray in response.
          </p>
          <p className="mt-3">
            <span className="font-semibold">What it is:</span> Bible-first counsel and prayer
            prompts designed to point you to Jesus, His Word, and wise next steps.
          </p>
          <p className="mt-2">
            <span className="font-semibold">What it is not:</span> a substitute for professional
            counseling, medical treatment, legal advice, or emergency services.
          </p>
        </Panel>

        <Panel>
          <h2 className="text-xl font-semibold">How it works</h2>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <span className="font-semibold">Topics:</span> Browse curated cards with Bible
              verses, a short reflection, and a simple prayer.
            </li>
            <li>
              <span className="font-semibold">AI Assistant:</span> Ask questions and receive
              responses that reference Scripture and your selected topics. AI is a tool, not a
              teacher—always test counsel by the Bible (Acts 17:11).
            </li>
            <li>
              <span className="font-semibold">Subscription (optional):</span> supports
              development costs and unlocks extended features.
            </li>
          </ul>
        </Panel>

        <Panel>
          <h2 className="text-xl font-semibold">Safety &amp; Care</h2>
          <p className="mt-2">
            If you are in danger or considering self-harm, call local emergency services or a
            crisis hotline immediately. For ongoing struggles, seek care from your pastor, a
            mature Christian friend, or a licensed professional counselor. God often cares for us
            through His people.
          </p>
        </Panel>

        <Panel>
          <h2 className="text-xl font-semibold">Our Aim</h2>
          <p className="mt-2">
            We believe Scripture is inspired and sufficient to equip believers for godly living
            (2 Tim 3:16–17). Our aim is to help you hear God’s Word, respond in prayer, and walk
            in practical obedience with the support of the church.
          </p>
        </Panel>

        {/* ⬇️ Anchor so Home button can deep-link */}
        <Panel id="in-person">
          <h2 className="text-xl font-semibold">In-Person Biblical Counselling</h2>
          <p className="mt-2">
            Digital tools are helpful, but spiritual care grows best in community. If you can,
            take a step toward face-to-face support:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <span className="font-semibold">Contact a local, Bible-believing church.</span> Ask
              to speak with a pastor, elder, or trained biblical counselor. Many churches offer
              confidential, no-cost care rooted in Scripture and prayer.
            </li>
            <li>
              <span className="font-semibold">Campus / community counselors (Ottawa, Canada):</span>{' '}
              <a href="mailto:confessionhealing@gmail.com" className="underline">
                confessionhealing@gmail.com
              </a>{' '}
              — biblical counselling &amp; discipleship.
            </li>
            <li>
              <span className="font-semibold">Walk together with a mature believer.</span> Invite a
              trusted brother or sister to read Scripture, pray, and journey with you (Gal 6:2;
              Titus 2).
            </li>
            <li>
              <span className="font-semibold">In a crisis,</span> contact emergency services first
              to secure safety, then follow up with pastoral and professional care.
            </li>
          </ul>
          <p className="mt-3">
            May the Lord surround you with wise counsel, steady friendship, and the comfort of the
            Holy Spirit as you take your next step (John 14:26).
          </p>
        </Panel>
      </div>
    </div>
  )
}
