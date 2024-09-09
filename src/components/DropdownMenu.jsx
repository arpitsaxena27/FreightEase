/* eslint-disable react/prop-types */
import{ useState } from 'react';
import { Menu, MenuItem,Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DropdownMenu = ({name,p1,p2,p3}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const opendriver=()=>{
    navigate(`/dashboard/driver`);
    setAnchorEl(null);
  }
  const openshipper=()=>{
    navigate(`/dashboard/shipper`);
    setAnchorEl(null);
  }
  const openfleetowner=()=>{
    navigate(`/dashboard/fleet-owner`);
    setAnchorEl(null);
  }
  return (
    <div>
      <p className='text-sm'
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {name}
      </p>
      <Menu
        id="vercel-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: '6px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            minWidth: '160px',
            mt: 1,
            bgcolor: '#fff', // White background for the menu
          },
        }}
      >
        <MenuItem onClick={openfleetowner} sx={{ py: 1 }}>
          <Typography variant="body2" sx={{ color: '#000' }}>
            {p1}
          </Typography>
        </MenuItem>
        <MenuItem onClick={openshipper} sx={{ py: 1 }}>
          <Typography variant="body2" sx={{ color: '#000' }}>
            {p2}
          </Typography>
        </MenuItem>
        <MenuItem onClick={opendriver} sx={{ py: 1 }}>
          <Typography variant="body2" sx={{ color: '#000' }}>
            {p3}
          </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default DropdownMenu;
