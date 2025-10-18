import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import type { QueryParamsType } from "@/store/restaurant-filter-store"
import { buildSearchQuery } from "@/utils/build-search-query";
import { useRouterState } from "@tanstack/react-router";



function nextPageUrl(currentUrlObj: QueryParamsType, limit: number, offset: number): string{
    const urlCopy = {...currentUrlObj};
    const newOffset = offset + limit;
    urlCopy.offset = newOffset;
    const newUrl = decodeURIComponent(buildSearchQuery(urlCopy));
    console.log("New url", newUrl);
    return newUrl;
}

function prevPageUrl(currentUrlObj: QueryParamsType, limit: number, offset: number): string{
    const urlCopy = {...currentUrlObj};
    const newOffset = offset - limit;
    urlCopy.offset = newOffset;
    const newUrl = decodeURIComponent(buildSearchQuery(urlCopy));
    console.log("New url", newUrl);
    return newUrl;
}

function moveToAnyPage(currentUrlObj: QueryParamsType, limit: number, currentPageNo: number): string{
    const urlCopy = {...currentUrlObj};
    const offsetForCurrentPage = limit * (currentPageNo - 1);
    urlCopy.offset = offsetForCurrentPage;
    const newUrl = decodeURIComponent(buildSearchQuery(urlCopy));
    return newUrl
}


interface PaginationCompProps{
    currentUrlObj: QueryParamsType,
    count: number,
    limit: number,
    offset: number,
}



function PaginationComp({
    currentUrlObj,
    count,
    limit,
    offset,
}:PaginationCompProps) {

    const routerState = useRouterState();
    const serverDNS = window.location.origin;
    const pathName = routerState.location.pathname;
    const combinedUrl = serverDNS + pathName;

    const pages_count = Math.ceil( count / Math.abs(limit));
    const currentPageNo = Math.floor(offset / limit) + 1;

    console.log("Page number: ", currentPageNo);
    console.log("Pages: ", pages_count);


    return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={`${combinedUrl}?${prevPageUrl(currentUrlObj, limit, offset)}`} />
        </PaginationItem>

        {
            currentPageNo > 1 &&
            <>
            <PaginationItem>
                <PaginationLink href={`${combinedUrl}?${moveToAnyPage(currentUrlObj, limit, 1)}`}>
                    1
                </PaginationLink>
          </PaginationItem>

          <PaginationEllipsis />
            </>
            
        }
        
        <PaginationItem>
          <PaginationLink href="#" isActive>
            {currentPageNo}
          </PaginationLink>
        </PaginationItem>

        {
            (currentPageNo < pages_count - 1) &&

                <PaginationItem>
                <PaginationLink href={`${combinedUrl}?${moveToAnyPage(currentUrlObj, limit, currentPageNo+1)}`}>
                    {currentPageNo + 1}
                </PaginationLink>
                </PaginationItem>
        }
        
        {
            (currentPageNo < pages_count - 2) &&

            <PaginationItem>
            <PaginationLink href={`${combinedUrl}?${moveToAnyPage(currentUrlObj, limit, currentPageNo+2)}`}>
                {currentPageNo + 2}
            </PaginationLink>
            </PaginationItem>
        }
                
        {
            (currentPageNo != pages_count) &&
            <>
            <PaginationItem>
            <PaginationEllipsis />
            </PaginationItem>

            <PaginationItem>
            <PaginationLink href={`${combinedUrl}?${moveToAnyPage(currentUrlObj, limit, pages_count)}`}>
                {pages_count}
            </PaginationLink>
            </PaginationItem>
            </>
        }
        


        <PaginationItem>
          <PaginationNext href={`${combinedUrl}?${nextPageUrl(currentUrlObj, limit, offset)}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationComp