const Notification = ({ message }) => {
  const addedStyle =  {
    color: "green",
    background: "lightgrey",
    fontsSize: 26,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  
  if (message === null) {
    return null
  }

  return (
    <div style={addedStyle}>
      {message}
    </div>
  )
}

export default Notification