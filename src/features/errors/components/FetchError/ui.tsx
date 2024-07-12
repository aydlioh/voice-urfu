type Props = {
  message: string;
};

export const FetchError = ({ message }: Props) => {
  return (
    <section className='h-[calc(100vh-40px)] flex justify-center items-center'>
      <div className='flex flex-col items-center'>
        <h2 className='font-minecraft text-rose-500 text-[22px]'>
          Fetch Error
        </h2>
        <p className='text-[14px] text-secondary/60'>{message}</p>
      </div>
    </section>
  );
};
