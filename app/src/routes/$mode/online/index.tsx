import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$mode/online/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/$mode/online/"!</div>
}
