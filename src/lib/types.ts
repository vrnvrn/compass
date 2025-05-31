export type ProblemBrief = {
    title: string
    description: string
    submittedBy: string
    sponsorTrack?: string
    emailProof?: {
      domain: string
      verified: boolean
      proof: any // for now, accept raw proof object
    }
  }  