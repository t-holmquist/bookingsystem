export default function Home() {
  return (
    <div className="flex h-screen bg-white p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Home page</h1>
        <div className="flex gap-2 bg-[#ebfbee] items-center py-1 px-2 rounded-md">
          <div className="bg-black rounded-full w-2 h-2"></div>
          <p>Logged ind som student</p>

        </div>
      </div>
    </div>
  )
}
