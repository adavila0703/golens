import { useAppSelector } from '../../../store/store'
import { getBarColor } from '../../../utils/utils'
import { getDataSelector } from '../GoLens.selector'

export const StatsBar = () => {
  const tableData = useAppSelector(getDataSelector)
  const totalCoverage = tableData.map((data) => data.coverage)
  console.log(totalCoverage)

  return (
    <div>
      Total Coverage
      {/* <div
        style={{
          color: getBarColor(data.coverage) === 'yellow' ? 'black' : '',
        }}
      >
        {data.coverage}%
      </div> */}
    </div>
  )
}
