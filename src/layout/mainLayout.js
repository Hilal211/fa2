import { useNavigate } from "react-router-dom";
import logo from '@/assets/images/logo-header.svg'
import logoText from '@/assets/images/logo-text-header.svg'
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { useLocation } from "react-router-dom"
import { styled, useTheme } from '@mui/material/styles';
import { useState, useReducer } from 'react';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Collapse from '@mui/material/Collapse';
// const drawerWidth = 340;
const Drawer = styled(MuiDrawer)(
  ({ theme, open }) => ({

    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box'
  }),
);

// mobile menu
const items = [
  {
    text: 'DASHBOARD',
    route: '/',
    items: [],
  },
  {
    text: 'PRODUCT MASTER',
    route: '/',
    items: [
      {
        text: 'PRODUCT DATABASE',

        route: '/product',
      },
      {
        text: 'ADD PRODUCT',

        route: '/',
      },
      {
        text: 'UPLOAD PRODUCTS',

        route: '/',
      },
      {
        text: 'XML FEED',

        route: '/',
      }
    ],
  }, {
    text: 'STORE',
    route: '/',
    items: [
      {
        text: 'MY STORE',

        route: '/store/my-store',
      },
      {
        text: 'UPDATE STORE',

        route: '/store/update-store',
      },
      {
        text: 'ORDER MANAGEMENT',

        route: '/',
      },
      {
        text: 'PROMOTIONS',

        route: '/',
      },
      {
        text: 'PROFILE CATEGORIES',

        route: '/store/profile-categories',
      },
      {
        text: 'XML FEED',

        route: '/',
      },
      {
        text: 'SMART CART',

        route: '/',
      },
    ],
  }, {
    text: 'CRM',
    route: '/',
    items: [],
  }, {
    text: 'NEWS',
    route: '/',
    items: [],
  }, {
    text: 'EVENTS',
    route: '/',
    items: [],
  }, {
    text: 'APPLE GCC',
    route: '/',
    items: [],
  },


];


// sidebar-mobile
const drawerWidth = 240;



const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));
function Header({ props }) {
  const navigate = useNavigate();
  const location = useLocation()
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState({});
  const [x, forceUpdate] = useReducer(x => x + 1, 0);


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = (index) => {
    let tmp = openSub
    tmp[index] = !tmp[index]
    setOpenSub(tmp);
    console.log(openSub);
    forceUpdate();
  };

  return (
    <div>

      <header className="flex align-i-center justify-between fs-18 desktop">
        <div className="flex">
          <img src={logo} alt="logo" id="logo-header" />
          <img src={logoText} alt="logo-name" id="logo-name" />
        </div>
        {props.user === 'admin' ?

          <div className="flex links light align-i-center">
            <div onClick={(e) => { navigate('/') }}>DASHBOARD</div>
            <div onClick={(e) => { navigate('/admin/product') }} className={props.name === 'adminProduct' ? 'selected' : ''}>PRODUCT MASTER</div>
            <div onClick={(e) => { navigate('/store/my-store') }} className={props.name === 'store' ? 'selected' : ''}>STORE</div>
            <div onClick={(e) => { navigate('/') }}>CRM</div>
            <div onClick={(e) => { navigate('/') }}>PROMOTIONS</div>
            <div onClick={(e) => { navigate('/') }}>NEWS</div>
            <div onClick={(e) => { navigate('/') }}>EVENTS</div>
          </div>
          :
          <div className="flex links light align-i-center">
            <div onClick={(e) => { navigate('/') }}>DASHBOARD</div>
            <div onClick={(e) => { navigate('/product') }} className={props.name === 'product' ? 'selected' : ''}>PRODUCT MASTER</div>
            <div onClick={(e) => { navigate('/store/my-store') }} className={props.name === 'store' ? 'selected' : ''}>STORE</div>
            <div onClick={(e) => { navigate('/') }}>CRM</div>
            <div onClick={(e) => { navigate('/') }}>PROMOTIONS</div>
            <div onClick={(e) => { navigate('/') }}>NEWS</div>
            <div onClick={(e) => { navigate('/') }}>EVENTS</div>
          </div>
        }

        <div className="bold pointer">APPLE GCC</div>
      </header>

      {/* mobile menu */}
      <Box sx={{ display: 'flex' }} className="mobile">
        {/* <CssBaseline /> */}
        <AppBar position="fixed" open={open} >
          <Toolbar>
            <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
              <div className="flex">
                <img src={logo} alt="logo" id="logo-header" />
                <img src={logoText} alt="logo-name" id="logo-name" />
              </div>
            </Typography>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              sx={{ ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
            },
          }}
          variant="persistent"
          anchor="right"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose} >
              {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {items.map((item, index) => (
              item.items == 0 ?
                (<ListItem key={index} disablePadding onClick={() => navigate(item.route)}>
                  <ListItemButton>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>)
                : (<SubMenu key={index} item={item} handleClick={handleClick} index={index} openSub={openSub} />)
            ))}
          </List>
        </Drawer>
      </Box>
    </div>
  );
}
const SubMenu = ({ item, handleClick, index, openSub }) => {
  const navigate = useNavigate();

  return (
    <div key={openSub[index]}>
      <ListItemButton onClick={() => handleClick(index)} key={index}>
        <ListItemText primary={item.text} />
        {openSub[index] ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={openSub[index]} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item.items.map((it, index) => {
            return (
              <ListItemButton sx={{ pl: 4 }} onClick={() => navigate(it.route)} key={index}>
                <ListItemText primary={it.text} />
              </ListItemButton>);
          })}

        </List>
      </Collapse>
    </div>
  )
}

// SideBar Desktop
const SideBar = ({ props }) => {
  const location = useLocation()
  const navigate = useNavigate();
  const items = {
    "product": [
      { text: 'PRODUCT DATABASE', to: "/product", onClick: () => navigate('/product') },
      { text: 'ADD PRODUCT', to: '/product/add-product', onClick: () => navigate('/product/add-product') },
      { text: 'UPLOAD PRODUCTS', to: '/', onClick: () => navigate('/') },
      { text: 'XML FEED', to: '/', onClick: () => navigate('/') },
    ],
    "store": [
      { text: 'MY STORE', to: "/store/my-store", onClick: () => navigate('/store/my-store') },
      { text: 'UPDATE STORE', to: '/store/update-store', onClick: () => navigate('/store/update-store') },
      { text: 'ORDER MANAGEMENT', to: '/', onClick: () => navigate('/') },
      { text: 'PROMOTIONS', to: '/', onClick: () => navigate('/') },
      { text: 'PROFILE CATEGORIES', to: '/store/profile-categories', onClick: () => navigate('/store/profile-categories') },
      { text: 'XML FEED', to: '/', onClick: () => navigate('/') },
      { text: 'SMART CART', to: '/', onClick: () => navigate('/') },
    ],
    "adminProduct":[
      { text: 'PRODUCT DATABASE', to: "/admin/product", onClick: () => navigate('/admin/product') },
      { text: 'ADD PRODUCT', to: '/admin/product/add-product', onClick: () => navigate('/admin/product/add-product') },
      { text: 'ADD ATTRIBUTE', to: '/admin/product/attribute', onClick: () => navigate('/admin/product/attribute') },
      { text: 'ADD ATTRIBUTE VALUE', to: '/admin/product/add-attribute-value', onClick: () => navigate('/admin/product/add-attribute-value') },

      { text: 'UPLOAD PRODUCTS', to: '/', onClick: () => navigate('/') },
      { text: 'XML FEED', to: '/', onClick: () => navigate('/') },
    ]
  };
  return (
    <Drawer variant="permanent" open={true} className="desktop">
      <List>
        {items[props.name].map((item, index) => (
          <ListItemButton
            key={item.text}
            className={item.to === location.pathname ? 'selected' : ''}
            onClick={item.onClick}
            sx={{
              marginBottom: 3,
              justifyContent: 'initial',

            }}
          >
            <ListItemText primary={item.text} sx={{ opacity: 1, textAlign: 'left', color: '#C3C3C3', fontWeight: 300 }} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}

function Layout({ children, props }) {

  return (
    <div className="container">
      <Header props={props} />
      <div className="flex">
        <SideBar props={props} />
        {children}
      </div>

    </div>
  )
}
export default Layout;

