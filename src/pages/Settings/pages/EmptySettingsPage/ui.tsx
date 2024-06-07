import { PandaEmptySvg } from "@/shared/assets/svgs";

const EmptySettingsPage = () => {
  return (
    <section className="h-full w-full flex justify-center items-center text-primaryText">
      <div className="max-w-[400px] flex flex-col items-center">
        <img src={PandaEmptySvg} alt="Panda" className="w-[250px]" />
        <h1 className="font-minecraft text-[28px]">Выберите раздел</h1>
      </div>
    </section>
  );
};

export default EmptySettingsPage;
