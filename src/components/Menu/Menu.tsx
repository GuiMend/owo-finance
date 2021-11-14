import { useState } from 'react'
import PropTypes, { InferProps } from 'prop-types'
import { Menu as MuiMenu, MenuItem } from '@mui/material'

export type MenuWrapperType = InferProps<typeof MenuWrapperPropTypes>

const MenuWrapper = ({
  children,
  ariaLabel,
  items,
  onClick,
}: MenuWrapperType) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClick = (name: string) => () => {
    handleClose()
    onClick(name)
  }

  return (
    <>
      {children(openMenu)}
      <MuiMenu
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        MenuListProps={{
          'aria-labelledby': ariaLabel,
        }}
      >
        {items.map(({ name, value }) => (
          <MenuItem key={name} onClick={handleClick(name)}>
            {value}
          </MenuItem>
        ))}
      </MuiMenu>
    </>
  )
}

const MenuWrapperPropTypes = {
  children: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    }).isRequired
  ).isRequired,
  onClick: PropTypes.func.isRequired,
}

MenuWrapper.propTypes = MenuWrapperPropTypes

export default MenuWrapper
