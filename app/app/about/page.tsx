'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2EEE3] to-[#7B9E82]/10">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Link 
          href="/" 
          className="inline-flex items-center text-[#2D2D2A] hover:text-[#7B9E82] mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </Link>

        <article className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-[#2D2D2A] mb-6">About Compass 🧭</h1>
          
          <p className="text-xl italic text-[#2D2D2A] mb-8">
            Compass connects verified (g)local issues with builders and bounties at global hackathons.
          </p>

          <div className="text-[#2D2D2A] space-y-6">
            <p>
              Compass is a platform designed to reorient global hackathons toward grounded, collective impact by connecting local community stakeholders and their needs with builders, funders, and organizers. Through a system of verified issue-sourcing, Compass enables communities to articulate concrete problems they face. These needs are translated into actionable prompts and integrated into the hackathon's unique workflow as complements to bounties, featured challenges, or curated tracks, compatible with existing parameters on the organizer's side, and as hackathon ideas on the builder's side.
            </p>

            <p>
              Rather than relying on the benevolence of sponsors or organizers to champion local relevance, Compass embeds mechanisms of accountability, visibility, and reciprocity at the protocol and UI/UX levels. It makes the "localhost" visible at the global scale.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">The Platform Includes</h2>
            <ul className="list-disc pl-6 space-y-4">
              <li>
                <strong>Issue Verification Layer:</strong> A lightweight, trust-based system (potentially leveraging proof-of-humanity or social attestations) for validating that submitted problems are grounded in lived experiences of specific communities.
              </li>
              <li>
                <strong>Navigator Dashboard:</strong> A UI for organizers and curators to browse, cluster, and remix community-sourced issues into complements to hackathon bounties, specific challenges, or even curated tracks, and ensure issue diversity and locality.
              </li>
              <li>
                <strong>Builder Interface:</strong> Participants can filter challenges by locality, theme, or affected group; form teams based on shared affinities; and explore historical issue–solution–adoption arcs.
              </li>
              <li>
                <strong>Reciprocity Layer:</strong> A system that tracks whether projects born from local issues return value to the communities of origin —whether through royalties, integrations, or future collaborations.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Vision</h2>
            <p>
              Compass operates on the principle of cosmolocalism: making the local visible, meaningful, and influential in the global digital commons. It draws inspiration from concepts like "Sympoiesis", derived from Greek words meaning "making-with", pointing at interdependence and co-creation. Ultimately, Compass acts as a kind of digital grandmother —grounded, wise, and quietly routing energy toward the heart of things.
            </p>

            <p>
              The system is designed to be integrated into existing hackathon platforms (e.g., ETHGlobal, DoraHacks, Devfolio) as an opt-in module, and ultimately aims to become the protocol standard for fair issue-sourcing and community-aligned innovation at scale.
            </p>
          </div>
        </article>
      </div>
    </div>
  )
} 