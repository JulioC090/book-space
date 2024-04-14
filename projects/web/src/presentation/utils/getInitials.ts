export default function getInitials(str: string, amount: number = 2) {
  const words = str.split(' ');
  let initials = '';

  if (amount < 1) return '';

  for (const word of words) {
    if (initials.length >= amount) break;
    if (word.length > 0) {
      if (initials.length > 1 && word[0] === word[0].toUpperCase()) {
        initials += word[0].toUpperCase();
      } else {
        initials += word[0].toUpperCase();
      }
    }
  }
  return initials;
}
