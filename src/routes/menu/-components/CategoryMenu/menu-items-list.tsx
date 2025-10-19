import { Button } from '@/components/ui/button'
import { H3 } from '@/components/ui/typography'
import MenuCard from './menu-card';

function MenuItemsList() {

    const categories = [
                        "Fried Rice",
                        "Chinese",
                        "Burger",
                        "Roll"
                    ];

    

  return (
    <div className='sm:w-[90%] my-6 p-3 sm:p-8 flex flex-col gap-2 bg-green-50 rounded-lg'>
        
        <H3
        className='py-2'
        >Menu Items</H3>

        <div id="categories"
        className='inline-flex gap-3 py-4 flex-wrap'
        >
            {
                categories.map((catName, index) => (
                    <Button
                    key={index}
                    >
                        {catName}
                    </Button>
                ))
            }
        </div>

        {/* TODO: Fix this menu list as soon as possible */}
        <div id='menu-list'
        className='flex flex-col'
        >

            <MenuCard />

        </div>
        
    </div>
  )
}

export default MenuItemsList