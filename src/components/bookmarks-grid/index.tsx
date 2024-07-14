import { GridContainer } from './GridContainer'
import { GridTemplate } from './GridTemplate'

const BookmarksGrid = ({ handleToggleModal }: { handleToggleModal: any }) => {
  return (
    <GridContainer>
      <GridTemplate handleToggleModal={handleToggleModal} />
    </GridContainer>
  )
}

export { BookmarksGrid }