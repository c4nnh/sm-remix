export const Table = () => {
  return (
    <div className="w-full overflow-x-auto rounded-xl bg-layer-2 px-11 py-6 scrollbar">
      <table className="w-full">
        <thead className="text-xs font-semibold uppercase text-text">
          <tr>
            <th className="whitespace-nowrap bg-layer-2 py-3 px-4 text-left font-semibold text-text">
              Alias
            </th>
            <th className="whitespace-nowrap bg-layer-2 py-3 px-4 text-left font-semibold text-text">
              Droplet
            </th>
            <th className="whitespace-nowrap bg-layer-2 py-3 px-4 text-left font-semibold text-text">
              Status
            </th>
            <th className="whitespace-nowrap bg-layer-2 py-3 px-4 text-left font-semibold text-text">
              Last Restart
            </th>
            <th className="whitespace-nowrap bg-layer-2 py-3 px-4 text-left font-semibold text-text">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="text-sm font-medium">
          {servers.map((server, index) => {
            const isHighlighted = index % 2 === 0
            return (
              <tr key={server.alias}>
                <td
                  className={`${
                    isHighlighted ? 'bg-layer-3' : 'bg-layer-2'
                  } whitespace-nowrap py-3 px-4 text-heading`}
                >
                  {server.alias}
                </td>
                <td
                  className={`${
                    isHighlighted ? 'bg-layer-3' : 'bg-layer-2'
                  } whitespace-nowrap py-3 px-4 text-heading`}
                >
                  {server.droplet}
                </td>
                <td
                  className={`${
                    isHighlighted ? 'bg-layer-3' : 'bg-layer-2'
                  } whitespace-nowrap py-3 px-4 text-heading`}
                >
                  <div className="flex items-center space-x-2">
                    <div className={`w-2.5 flex-shrink-0 text-green-500`}>
                      <svg fill="currentColor" viewBox="0 0 8 8" className="">
                        <circle cx={4} cy={4} r={3} />
                      </svg>
                    </div>
                    <span className="capitalize">{server.status}</span>
                  </div>
                </td>
                <td
                  className={`${
                    isHighlighted ? 'bg-layer-3' : 'bg-layer-2'
                  } whitespace-nowrap py-3 px-4 text-heading`}
                >
                  {server.lastRestartString}
                </td>
                <td
                  className={`${
                    isHighlighted ? 'bg-layer-3' : 'bg-layer-2'
                  } whitespace-nowrap py-0 px-4 text-heading`}
                >
                  <button
                    type="button"
                    className="inline-flex cursor-pointer items-center justify-center rounded-xl border-none border-transparent bg-transparent p-2 font-semibold text-text hover:bg-heading/5 hover:text-heading focus:bg-heading/5 focus:outline-none focus:ring-2 focus:ring-heading/80 focus:ring-offset-0 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-text"
                  ></button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

const servers = [
  {
    alias: 'Server 1',
    droplet: 'San Francisco',
    status: 'running',
    lastRestartString: '3/22/22',
  },
  {
    alias: 'Server 2',
    droplet: 'Los Angeles',
    status: 'running',
    lastRestartString: '3/22/22',
  },
  {
    alias: 'Server 3',
    droplet: 'Tokyo',
    status: 'stopped',
    lastRestartString: '3/22/22',
  },
  {
    alias: 'Server 4',
    droplet: 'Paris',
    status: 'running',
    lastRestartString: '3/22/22',
  },
  {
    alias: 'Server 5',
    droplet: 'New York',
    status: 'running',
    lastRestartString: '3/22/22',
  },
  {
    alias: 'Server 6',
    droplet: 'Madrid',
    status: 'stopped',
    lastRestartString: '3/22/22',
  },
]
