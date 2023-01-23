const formatDate = (newDate) => {
    const theDate = new Date(newDate)
    const formatedDate = theDate.getDate() + '/' + parseInt(theDate.getMonth() + 1) + '/' + theDate.getFullYear()
    return formatedDate
}
  export { formatDate }