export default function getInitials(str: string) {
  const words = str.split(' ');
  let initials = '';
  for (let word of words) {
    if (initials.length > 1) break;
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
