function shortenDescription(description) {
  const arr = description.split(' ', 25);
  if (description.length <= 120) return description;
  return `${arr.join(' ')}...`;
}

export default shortenDescription;
