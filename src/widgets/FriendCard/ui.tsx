import { FriendCardTools } from '@/features/user';

type Props = {
  user: {
    imgSrc: string;
    login: string;
    fullname: string;
  };
  endContent?: React.ReactNode;
};

export const FriendCard = ({ user, endContent }: Props) => {
  return (
    <div className="bg-page rounded-lg">
      <div className="flex justify-between items-center sm:px-6 px-3 sm:py-4 py-2">
        <div className="flex flex-row sm:gap-5 gap-3">
          <div className="flex justify-center items-center w-14">
            <img
              src={user.imgSrc}
              alt="user avatar"
              className="w-10 h-10 object-cover rounded-full "
            />
          </div>
          <div>
            <h5 className="sm:text-[16px] text-[14px]">{user.fullname}</h5>
            <p className="sm:text-[14px] text-[12px] text-secondary/70 font-thin">
              {user.login}
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-1 items-center">
          {endContent}
          <FriendCardTools user={user} />
        </div>
      </div>
    </div>
  );
};
