import { H1, H2 } from '@/components/ui/typography';
import { useAuthStore } from '@/store/auth-store'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { useGetUserOrders } from './-components/queries/get-orders-query-api';
import OrderCard from './-components/order-card';

export const Route = createFileRoute('/order-history/')({
  beforeLoad: () => {
    const {verifySession} = useAuthStore.getState();
    if(!verifySession()){
      alert("Please login first, to perform this action");
      throw redirect({
        to: "/",
      })
    }

  },
  component: RouteComponent,
})

function RouteComponent() {
  const {user} = useAuthStore(state => state);
  const {data: orders} = useGetUserOrders();

  return (
    <div
    className='bg-web-theme-green/60 py-8'
    >

      <section id='user-details'
        className='variable-margin p-5 sm:p-10 md:p-20 transition-all'
      >
        <p className='text-4xl font-semibold poppins'>{user?.first_name} {user?.last_name}</p>
        <p className='text-sm sm:text-base font-semibold'>{user?.phone_no} &nbsp; . &nbsp; {user?.email}</p>
      </section>

      <section
      className='bg-background variable-margin flex flex-col gap-1 py-4'
      >
        <H2 className='p-6'>Past Orders</H2>

        {
          orders?.length == 0?

          <H1 className='h-[20dvh]'>No Order History</H1>
          :
          orders?.map((data, ind) => (

            <OrderCard 
            key={ind}
            order={data}
            />
          ))
        }

      </section>

    </div>
  )
}
