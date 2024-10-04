export const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    },
    sideBar: {
      background: '#007490',
      borderRadius: '0 10px 10px 0',
      boxShadow: '10px 3px 8px rgba(0,0,0,.15)',
      ml: -3
    },
    titleContainer: {
      display: 'flex',             
      flexDirection: 'column',     
      alignItems: 'center',         
      justifyContent: 'center',     
      textAlign: 'center',        
      color: '#007490',
    },
    title: {
      fontSize: '5.2em',
      fontWeight: 'bold',
    },
    formContainer: {
      pl: 8,
      pr: 8,
      pt: 10,
      pb: 10,
      background: 'rgba(0, 116, 144, 1)',
      borderRadius: 2,
      boxShadow: '10px 3px 8px rgba(0,0,0,.15)',
    },
    formTitle: {
      fontWeight: 'bold',
      color: '#F2F2F2',
      pb: 3,
    },
    textField: {
      background: '#F2F2F2',
      borderRadius: 1,
      height: '55px',
      '& .MuiInputBase-root': { height: '55px' },
      '& .MuiInputBase-input': { padding: '12px 14px' },
      '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#fff',
      },
      '& input:-webkit-autofill': {
        WebkitBoxShadow: '0 0 0 30px #F2F2F2 inset',
        WebkitTextFillColor: '#000',
      },
      '& input:-moz-autofill': {
        boxShadow: '0 0 0 30px #F2F2F2 inset',
        color: '#000',
      },
    },
    submitButton: {
      mt: 3,
      mb: 3,
      background: '#f2f2f2',
      color: '#007490',
      borderRadius: 1,
      height: '55px',

      '&:hover': {
        backgroundColor: '#f2f2f2',
        color: '#007490',
        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
      },
    },
    errorText: {
      color: '#f2f2f2',
      fontSize: '10px',
      mt: 1,
      fontWeight: 'bold',
    },
    linkText: {
      color: '#F2F2F2',
      textDecoration: 'underline',
      fontWeight: 'bold',
    },
    titleLink: {
      textAlign: 'center',
      color: '#F2F2F2',
      fontSize: '0.8rem',
    },
  };
  