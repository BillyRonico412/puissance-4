import { PendingComponent } from "@app/components/suspense/PendingComponent"
import { Suspense } from "react"

export const QuerySuspense = (props: { children: React.ReactNode }) => {
	return <Suspense fallback={<PendingComponent />}>{props.children}</Suspense>
}
