
export default function ProgressBar({currentIndex ,  questions} : any) {
  return (
    <div className="w-full bg-white flex items-center mx-auto max-w-sm mb-10 justify-between gap-4 py-2 px-3 rounded-2xl shadow-lg">
      <div className="relative flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full bg-blue-500 transition-all duration-300"
          style={{
            width: `${((currentIndex + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      <div className="flex gap-1">
        <img src="/crown.png" className="h-5 w-5" alt="logo" />
        <span className="text-sm font-medium text-gray-700">
          <span className="font-bold">{currentIndex + 1}</span> /{" "}
          <span>{questions.length}</span>
        </span>
      </div>
    </div>
  );
}
