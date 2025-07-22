import BridgeWithLocks from "@/components/bridge-with-locks"

export default function Home() {
  return (
    <main className="h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500 via-pink-500 to-orange-400 opacity-50" />
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gray-900 to-transparent" />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-4 drop-shadow-lg">
          Virtual Love Lock Bridge
        </h1>
        <p className="text-xl text-white text-center mb-8 max-w-md drop-shadow-md">
          Place a lock to symbolize your eternal love
        </p>
      </div>
      <BridgeWithLocks />
    </main>
  )
}
