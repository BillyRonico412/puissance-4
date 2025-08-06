import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$mode/human/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/$mode/human/"!</div>
}
