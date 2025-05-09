import { useState } from 'react'
import clsx from 'clsx'

function App() {
  const [clicked, setClicked] = useState(false)

  return (
    <div
      className={clsx(
        'min-h-screen',
        'bg-gradient-to-br',
        'from-indigo-800',
        'via-purple-800',
        'to-pink-700',
        'text-white',
        'flex flex-col items-center justify-center',
        'p-8 space-y-6'
      )}
    >
      <h1 className="text-5xl font-bold tracking-tight">Welcome to BilBoard</h1>
      <p className="text-lg text-pink-100">
        TailwindCSS is working beautifully — let's start building.
      </p>
      <button
        type="button"
        onClick={() => setClicked(true)}
        className={clsx(
          'px-6 py-3',
          'bg-white text-indigo-800 font-semibold',
          'rounded-lg shadow',
          'hover:bg-pink-100 transition'
        )}
      >
        {clicked ? '✨ SURPRISE! ✨' : 'Try me'}
      </button>
    </div>
  )
}

export default App
