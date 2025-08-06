import { QueryErrorBoundary } from "@app/components/suspense/QueryErrorBoundary"
import { QuerySuspense } from "@app/components/suspense/QuerySuspense"
import { cn } from "@app/lib/utils"
import type { HTMLAttributes } from "react"

export const MainLayout = (props: HTMLAttributes<HTMLDivElement>) => {
	return (
		<QueryErrorBoundary>
			<QuerySuspense>
				<div
					{...props}
					className={cn(
						"flex h-full w-full flex-col overflow-hidden",
						props.className,
					)}
				>
					{props.children}
				</div>
			</QuerySuspense>
		</QueryErrorBoundary>
	)
}

export const MainLayoutHeader = (props: HTMLAttributes<HTMLDivElement>) => {
	return (
		<div
			{...props}
			className={cn(
				"mx-auto flex h-16 w-full max-w-7xl shrink-0 items-center px-8",
				props.className,
			)}
		>
			{props.children}
		</div>
	)
}

export const MainLayoutBody = (props: HTMLAttributes<HTMLDivElement>) => {
	return (
		<div className="flex-1 overflow-y-auto">
			<div
				{...props}
				className={cn(
					"mx-auto h-full w-full max-w-7xl px-8 py-4",
					props.className,
				)}
			>
				{props.children}
			</div>
		</div>
	)
}
