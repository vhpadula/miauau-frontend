import { AdoptionForm } from "@/components"

export default function Candidate ({params}: {
    params: { candidateId: string }
}) {
    return (<AdoptionForm params={{
        candidateId: params.candidateId
    }}/>)
}