export default function (num) {
  const n = Number(num)
  return `NT ${n.toFixed(0).replace(/./g, (c, i, a) => {
    const currency = i && c !== '.' && (a.length - i) % 3 === 0 ? `, ${c}`.replace(/\s/g, '') : c
    return currency
  })} 元`
}
