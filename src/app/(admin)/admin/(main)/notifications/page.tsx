const data = [
    { key: 1 },
    { key: 1 },
    { key: 1 },
    { key: 1 },
    { key: 1 },
    { key: 1 },
    { key: 1 }
]

export default function Notifications() {
    return (
        <>
            <div className="flex justify-between">
                <p className="text-xl font-semibold">Notifications</p>
            </div>
            <div className=" flex flex-col gap-4">
                {data.map((e) =>
                    <div className="rounded-lg bg-gray-200 flex flex-col gap-2 p-4">
                        <div className="flex justify-between">
                            <p className="font-semibold text-sm">Support Request 01</p>
                            <p className="text-gray-400 text-sm">05 min ago</p>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consectetur nisl sapien,Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                )}
            </div>
        </>
    )
}