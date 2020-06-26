function validateErrors(err){
  err.map(e => {
    const field = document.getElementById(e);
    field.style.borderColor = 'red';
    return null
  })
}

export default validateErrors