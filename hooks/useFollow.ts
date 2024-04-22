import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";
import toast from "react-hot-toast";
import axios from "axios";
import { Router, useRouter } from "next/router";

const useFollow = (userId: string) => {
  const router = useRouter();
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutatefetchedUser } = useUser(userId);
  const cUser = currentUser?.id;

  const loginModal = useLoginModal();
  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];
    return list.includes(userId);
  }, [userId, currentUser?.followingIds]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return loginModal;
    }
    try {
      let request;
      if (isFollowing) {
        request = () =>
          axios.delete("/api/follow", { data: { userId, cUser } });
      } else {
        request = () => axios.post("/api/follow", { userId, cUser });
      }

      await request();
      mutateCurrentUser;
      mutatefetchedUser;

      toast.success("Success");
      router.reload();
    } catch (error) {
      toast.error("Something went Wrong :(");
    }
  }, [
    currentUser,
    isFollowing,
    userId,
    mutateCurrentUser,
    mutatefetchedUser,
    loginModal,
  ]);

  return {
    isFollowing,
    toggleFollow,
  };
};

export default useFollow;
