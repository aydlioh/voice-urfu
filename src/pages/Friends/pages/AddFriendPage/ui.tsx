import { CloseButton, FriendRequest } from "@/features/notification";
import { toast } from "react-toastify"

export const AddFriendPage = () => {
  const toatify = () => {
    toast(
      <FriendRequest
        handleRefuse={() => {}}
        handleAccept={() => {}}
        message={{receiver: '123', sender: '333'}}
      />,
      {
        closeButton: <CloseButton />,
      }
    );
  }
  return (
    <div onClick={toatify}>AddFriendPage</div>
  )
}
