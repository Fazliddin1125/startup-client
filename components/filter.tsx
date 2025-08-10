// "use client"
// import React, { FC } from 'react'

// import { Search } from 'lucide-react'


// import { useRouter, useSearchParams } from 'next/navigation'
// import { cn, formUrlQuery, removeUrlQuery } from '@/lib/utils'
// import {debounce} from "lodash"
// import {useCallback} from "react"

// interface Props {
//     showCategory?: boolean
// }
// const Filter:FC<Props> = ({showCategory}) => {
//     const searchParams = useSearchParams()
//     const router = useRouter()
//     const OnFilterChange = (value: string)=>{
//         const newUrl = formUrlQuery({key: "filter", params: searchParams.toString(), value})
//         router.push(newUrl)
//     }
    
//     const OnCategoryChange = (value: string)=>{
//         const newUrl = formUrlQuery({key: "category", params: searchParams.toString(), value})
//         router.push(newUrl)
//     }

//     const onInputSearch = (e: React.ChangeEvent<HTMLInputElement>)=>{
//         const value = e.target.value
//         const newUrl = formUrlQuery({key: "q", params: searchParams.toString(), value})
//         router.push(newUrl)
//         if(value==''){
//             const newUrl = removeUrlQuery({key: "q", params: searchParams.toString()})
//             router.push(newUrl)
//         }
//     }

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     const handleSearchDebounce = useCallback(debounce(onInputSearch, 300),  [])
//    return (
//     <div className={cn('gap-1 max-md:w-full grid ', showCategory ?"grid-cols-3":"grid-cols-2")} >
//         <div className='flex items-center bg-secondary max-md:w-1/2 border'>
//             <Input onChange={handleSearchDebounce} className='text-xs border-none no-focus ' placeholder='Qidirish'/>
//             <Search/>
//         </div>
//         <Select onValueChange={OnFilterChange} >
//             <SelectTrigger>
//                 <SelectValue placeholder="Select filter"  className='text-muted-foreground'/>
//             </SelectTrigger>
//             <SelectContent>
//                 <SelectItem value='newest' >Newest</SelectItem>
//                 <SelectItem value='oldest' >Oldest</SelectItem>
//             </SelectContent>
//         </Select>

//         {showCategory && 
//         <Select onValueChange={OnCategoryChange} >
//         <SelectTrigger  >
//             <SelectValue placeholder="Select category"  className='text-muted-foreground'/>
//         </SelectTrigger>
//         <SelectContent>
//             {categories.map((item, index)=>(
//               <SelectItem key={index} value={item} >{item}</SelectItem>  
//             ))}
            
            
//         </SelectContent>
//     </Select>
    
//         }
//     </div>
//   )
// }

// export default Filter