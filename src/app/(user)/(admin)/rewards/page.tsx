'use client'

import { ImSpinner2 } from "react-icons/im"

export default function Rewards() {
    return (
        <>
            <div className="flex justify-between items-center">
                <p className="text-xl font-semibold">Rewards</p>
                {/* <Link href={'/admin/manage-breweries/create'} className="sm:px-16 px-4 py-2 bg-[#A92223] rounded text-white">Add Brewery</Link> */}
            </div>
            {false && <div className="flex justify-center h-full items-center"><ImSpinner2 className="text-4xl animate-spin" /></div>}
            {/* {breweryQuery.data?.data.data.length == 0 && !breweryQuery.isFetching  && <p className="text-center">No Data Exists</p>} */}
            {!false && <>
                <table className="p-4 w-full block sm:table  overflow-auto mt-4">
                    <thead><tr className="bg-gray-200">
                        <th className="p-2 rounded-l-md text-left text-sm">S.No</th>
                        <th className="p-2 text-sm text-left">Brewery Name</th>
                        <th className="p-2 text-sm text-left">Location</th>
                        <th className="p-2 text-sm text-left rounded-r-md">Date Of Creation</th>
                        {/* <th className="p-2 text-sm text-left rounded-r-md">Action</th> */}
                    </tr>    </thead>
                    <tbody>
                        <tr className="border-b-2 border-solid border-gray-200" >
                        <td className="p-2 text-sm">01</td>
                        <td className="p-2 text-sm">name</td>
                        <td className="p-2 text-sm">text</td>
                        <td className="p-2 text-sm">date</td>
                        
                        </tr>
                    </tbody>
                </table>

                {/* {<div className="flex flex-wrap gap-4">
                    {breweryQuery.data?.data.lastPage != page && <button className="px-16 py-2 bg-[#A92223] sm:w-max w-full rounded text-white m-auto" type="button" onClick={() => {
                        setPage((prev) => prev + 1)
                    }}>Next Page</button>}

                    {
                        page != 1 && <button className="px-16 py-2 bg-[#A92223] sm:w-max w-full rounded text-white m-auto" type="button" onClick={() => {
                            setPage((prev) => prev - 1)
                        }}>Previous Page</button>
                    }
                </div>} */}
            </>}
        </>
    )
}