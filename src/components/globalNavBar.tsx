import clsx from 'clsx'

interface Props {
  activeView: 'builder' | 'generator'
  setActiveView: (view: 'builder' | 'generator') => void
}

export const GlobalNav = ({ activeView, setActiveView }: Props) => {
  return (
    <div className="flex flex-col space-y-0 w-full max-w-sm">
      <div className="mt-4 flex flex-row space-x-2 w-full max-w-sm">
        <button
          type="button"
          onClick={() => setActiveView('builder')}
          className={clsx(
            'flex-1 px-4 py-2 font-semibold rounded-lg shadow transition-all duration-600',
            activeView === 'builder'
              ? 'border-blue-400 ring ring-blue-400 ring-opacity-50 backdrop-blur-md backdrop-saturate-150'
              : 'bg-white text-indigo-800 hover:bg-pink-300 cursor-pointer'
          )}
        >
          Mock object
        </button>
        <button
          type="button"
          onClick={() => setActiveView('generator')}
          className={clsx(
            'flex-1 px-4 py-2 font-semibold rounded-lg shadow transition-all duration-600',
            activeView === 'generator'
              ? 'border-blue-400 ring ring-blue-400 ring-opacity-50 backdrop-blur-md backdrop-saturate-150'
              : 'bg-white text-indigo-800 hover:bg-pink-300 cursor-pointer'
          )}
        >
          Mock payload
        </button>
      </div>
    </div>
  )
}
