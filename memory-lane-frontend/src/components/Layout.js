import { Box, AppBar, Toolbar, Typography, Container, IconButton, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { Home, Memory, ExitToApp } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isAuthenticated = localStorage.getItem('token');

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar 
        position="static" 
        elevation={0}
        sx={{ 
          background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
        }}
      >
        <Toolbar>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}
          >
            <Memory sx={{ mr: 1 }} />
            <Typography variant="h6" component="div">
              Memory Lane
            </Typography>
          </motion.div>
          
          {isAuthenticated && (
            <Box>
              <IconButton color="inherit" onClick={() => navigate('/dashboard')}>
                <Home />
              </IconButton>
              <IconButton color="inherit" onClick={handleLogout}>
                <ExitToApp />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Container 
        maxWidth="lg" 
        sx={{ 
          mt: 4, 
          mb: 4,
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ flex: 1 }}
        >
          {children}
        </motion.div>
      </Container>
    </Box>
  );
};

export default Layout;