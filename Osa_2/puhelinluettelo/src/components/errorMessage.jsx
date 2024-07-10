
const ErrorMessage = ({errorMessage}) => {
    
    const addedStyle =  {
      color: "red",
      background: "lightgrey",
      fontsSize: 26,
      borderStyle: "solid",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }
        
    if (errorMessage === null) {
      return null
    }
      
    return (
      <div style={addedStyle}>
        {errorMessage}
      </div>
    )
    }
      
export default ErrorMessage
