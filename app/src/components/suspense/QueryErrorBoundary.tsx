import { ErrorComponent } from "@app/components/suspense/ErrorComponent"
import { QueryErrorResetBoundary } from "@tanstack/react-query"
import { ErrorBoundary } from "react-error-boundary"

export const QueryErrorBoundary = (props: { children: React.ReactNode }) => {
	return (
		<QueryErrorResetBoundary>
			{({ reset }) => (
				<ErrorBoundary
					onReset={reset}
					fallbackRender={({ resetErrorBoundary }) => (
						<ErrorComponent resetErrorBoundary={resetErrorBoundary} />
					)}
				>
					{props.children}
				</ErrorBoundary>
			)}
		</QueryErrorResetBoundary>
	)
}
