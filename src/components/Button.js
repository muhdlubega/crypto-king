
  
const CryptoButton = ({ children, selected, onClick }) => {
    const useStyles = () => ({
        selectbutton: {
            border: "1px solid gold",
            borderRadius: 5,
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
            fontFamily: "Montserrat",
            cursor: "pointer",
            backgroundColor: selected ? "gold" : "",
            color: selected ? "black" : "",
            fontWeight: selected ? 700 : 500,
            "&:hover": {
              backgroundColor: "gold",
              color: "black",
            },
            width: "22%",
          },
      });
      
  const classes = useStyles();

  return (
    <span onClick={onClick} className={classes.selectbutton} style={{
      border: "1px solid darkorchid",
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: "Montserrat",
      cursor: "pointer",
      backgroundColor: selected ? "darkorchid" : "",
      color: selected ? "black" : "",
      fontWeight: selected ? 700 : 500,
      "&:hover": {
        backgroundColor: "darkorchid",
        color: "black",
      },
      width: "22%",
    }}>
      {children}
    </span>
  );
};

export default CryptoButton;