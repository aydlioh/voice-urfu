import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFriend } from "./api";

export const useDeleteFriend = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteFriend,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['friends'] }),
  });
}