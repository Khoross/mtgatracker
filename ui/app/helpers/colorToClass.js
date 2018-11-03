export function colorToClass(colArr) {
  switch(colArr.length){
    case 0:
      return 'card card-c'
    case 1:
    case 2:
      return `card ${colArr.map(col=>`card-${col.toLowerCase()}`).join(' ')}`
    default:
      return `card card-m`
  }
}

export function costToClass(colArr) {
  switch(colArr.length){
    case 0:
      return 'card card-c'
    case 1:
    case 2:
      return `card ${colArr.map(col=>`card-${col.toLowerCase()}`).join(' ')}`
    default:
      return `card card-m`
  }
}