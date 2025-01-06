import StatCard from '@/components/global/StatCard'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <main className="admin-main">

        <section className="admin-stat">
          <StatCard
            type="appointments"
           // count={appointments.scheduledCount}
            label="Scheduled appointments"
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="pending"
            //count={appointments.pendingCount}
            label="Pending appointments"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            //count={appointments.cancelledCount}
            label="Cancelled appointments"
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>
        
      </main>
  )
}

export default page