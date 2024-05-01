import { useParams } from "react-router-dom";

export const RoomPage = () => {
  const { id: roomId } = useParams();

  return (
    <div>RoomPage {roomId}</div>
  )
}
