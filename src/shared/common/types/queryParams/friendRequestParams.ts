export type FriendRequestParams = {
  belonging: 'sender' | 'receiver';
  type: 'pending' | 'accepted' | 'refused';
};
