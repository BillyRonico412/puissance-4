import { Alert } from "@app/components/ui/alert"
import { Button } from "@app/components/ui/button"

export const ErrorComponent = (props: { resetErrorBoundary?: () => void }) => {
	return (
		<div className="flex h-full w-full items-center justify-center">
			<Alert
				className="m-4 flex max-w-3xl flex-col gap-4"
				variant="destructive"
			>
				<p className="font-bold text-lg">Une erreur est survenue</p>
				<p>Veuillez vérifier votre connexion internet.</p>
				<p>Si le problème persiste, veuillez contacter le support technique</p>
				{props.resetErrorBoundary && (
					<Button variant="outline" onClick={props.resetErrorBoundary}>
						Réessayer
					</Button>
				)}
			</Alert>
		</div>
	)
}
