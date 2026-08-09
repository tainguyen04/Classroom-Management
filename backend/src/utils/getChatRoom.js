export function getChatRoom(sender, receiver) {
  return [sender, receiver].sort().join("_");
}
