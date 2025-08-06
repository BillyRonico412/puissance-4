import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$mode/ai/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/$mode/ai/"!</div>
}
