import { PandaEmptySvg } from '@/shared/assets/svgs';

export const EmptyChatPage = () => {
  return (
    <section className="h-full w-full flex justify-center items-center text-primaryText">
      <div className='max-w-[400px]'>
        <img src={PandaEmptySvg} alt="Panda" className='w-full' />
        <h1 className="font-minecraft text-center lg:text-[40px] md:text-[34px]">Выберите чат</h1>
      </div>
    </section>
  );
};
