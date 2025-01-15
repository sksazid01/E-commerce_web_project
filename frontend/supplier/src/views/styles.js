import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, spacing }) => ({
  root: {
    margin: 'auto',
    borderRadius: spacing(2),
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    position: 'relative',
    width: '900px',
    minWidth: '500px',
    marginTop: spacing(4),
    marginLeft: 'auto',
    overflow: 'initial',
    background: '#1E1E1E',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: spacing(2),
    color: '#E0E0E0',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.4)',
    },
    [breakpoints.up('md')]: {
      flexDirection: 'row',
      paddingTop: spacing(2),
    },
  },
  media: {
    width: '88%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: spacing(-3),
    height: 0,
    paddingBottom: '48%',
    borderRadius: spacing(2),
    backgroundColor: '#2D2D2D',
    position: 'relative',
    [breakpoints.up('md')]: {
      width: '100%',
      marginLeft: spacing(2),
      marginTop: 0,
    },
  },
  content: {
    padding: spacing(3),
    color: '#E0E0E0',
  },
  cardHeader: {
    color: '#E0E0E0',
    '& .MuiTypography-root': {
      color: '#E0E0E0',
    },
  },
  dialog: {
    '& .MuiDialog-paper': {
      backgroundColor: '#1E1E1E',
      color: '#E0E0E0',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
    },
    '& .MuiDialogTitle-root': {
      backgroundColor: '#2D2D2D',
      borderBottom: '1px solid #404040',
      padding: spacing(2),
    },
    '& .MuiDialogContent-root': {
      backgroundColor: '#1E1E1E',
      padding: spacing(3),
      '& .MuiTypography-root': {
        color: '#E0E0E0',
      },
    },
    '& .MuiDialogActions-root': {
      backgroundColor: '#2D2D2D',
      borderTop: '1px solid #404040',
      padding: spacing(2),
    },
    '& .MuiButton-root': {
      color: '#90CAF9',
      textTransform: 'none',
      fontWeight: 500,
      padding: '8px 24px',
    },
  },
  orderInfo: {
    color: '#B0B0B0',
    marginBottom: spacing(2),
    padding: spacing(2),
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: spacing(1),
  },
  orderStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing(1),
    padding: spacing(2),
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderRadius: spacing(1),
    marginTop: spacing(2),
    '& i': {
      color: '#4CAF50',
      fontSize: '1.2rem',
    },
    '& .MuiTypography-root': {
      color: '#4CAF50',
      fontWeight: 500,
    },
  },
  acceptButton: {
    backgroundColor: '#1976D2',
    color: '#FFFFFF',
    padding: '8px 24px',
    borderRadius: spacing(1),
    textTransform: 'none',
    fontWeight: 500,
    '&:hover': {
      backgroundColor: '#1565C0',
    },
  },
  pageTitle: {
    color: '#E0E0E0',
    marginBottom: spacing(4),
    textAlign: 'center',
    fontWeight: 600,
    fontSize: '2rem',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50vh',
    backgroundColor: '#121212',
  },
  progress: {
    color: '#1976D2',
  },
  container: {
    backgroundColor: '#121212',
    minHeight: '100vh',
    padding: spacing(4),
  },
  gridContainer: {
    marginTop: spacing(4),
  },
  errorText: {
    color: '#FF5252',
    textAlign: 'center',
    fontSize: '1.2rem',
  },
  emptyText: {
    color: '#B0B0B0',
    textAlign: 'center',
    fontSize: '1.2rem',
  },
}));