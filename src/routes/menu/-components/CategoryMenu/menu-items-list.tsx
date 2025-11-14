import { Button } from '@/components/ui/button'
import { H3 } from '@/components/ui/typography'
import MenuCard from './menu-card';
import { useGetMenuByCategoryQuery } from '../../-query/category-menu-query';

interface MenuItemsListProps{
    categories: string[] | undefined,
    restId: string,
}

function MenuItemsList({
    categories,
    restId,
}: MenuItemsListProps) {
   
    // Making category undefined since DOM uses DFS in backend, because of which this hook will 
    // run first instead of the parent (which was causing problem because it needed category 
    // from parent component first, hence used undefined + enabled in useQuery)
    const catReceived = categories ? categories[0] : undefined;
    const {categoryMenuData, changeCategory, currentCategory} = useGetMenuByCategoryQuery(restId, catReceived);
    

  return (
    <div className='sm:w-[90%] my-6 p-3 sm:p-8 flex flex-col gap-2 bg-green-50 rounded-lg'>
        
        <H3
        className='py-2'
        >Menu Items</H3>

        <div id="categories-component"
        className='inline-flex gap-3 py-4 flex-wrap'
        >
            {
                // skipping first category since its already been shown in Recommended carousel
                categories?.map((catName, index) => (
                    <Button
                    style={{
                        backgroundColor: currentCategory === catName ? "black" : ""
                    }}
                    key={index}
                    onClick={() => {
                        changeCategory(catName);
                    }}
                    >
                        {catName}
                    </Button>
                ))
            }
        </div>

        <div id='menu-list'
        className='flex flex-col gap-3'
        >
            {
                categoryMenuData?.map( (menuItem, index) => (
                    <MenuCard 
                    // FIX: Added item_uuid in key because, changing category was not changing the state of ADD button
                    // in different menu item, (0th row chole bhature in Thali Category was showing added even though it wasn't).
                    key={`${index}-${menuItem.item_uuid}`}
                    menu_item={menuItem}
                    category={currentCategory || catReceived || ""}
                    restId={restId}
                    />

                ))
            }


        </div>
        
    </div>
  )
}

export default MenuItemsList