import { createFileRoute } from '@tanstack/react-router'
import StartSection from '../modules/start-section'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>

    <StartSection />
    </div>
}
