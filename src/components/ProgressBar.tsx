export default function ProgressBar({ currentIndex, questions }: any) {
  return (
    <div className="space-y-8">
          {/* <img src="/crown.png" className="h-5 w-5" alt="logo" /> */}
      <div className="relative flex-1 h-8  bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500  transition-all duration-300"
          style={{
            width: `${((currentIndex + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      <div className="flex gap-1 border-b border-gray-500 pb-5 border-dashed">
    
        <span className="text-xl font-medium text-gray-300">
          Question <span className="font-bold">{currentIndex + 1}</span>
          <span className="text-sm text-gray-400"> / {questions.length}</span>
        </span>
      </div>
    </div>
  );
}
