import { useTimerRedirect } from "@/shared/hooks";

export const NotFoundPage = () => {
  const redirectSeconds = useTimerRedirect("/", 3);

  return (
    <section className="h-[calc(100vh-80px)] flex justify-center items-center text-secondary">
      <div className="flex flex-col gap-1 items-center">
        <div className="font-minecraft text-rose-500 text-[40px]">
          <h2>404</h2>
        </div>
        <div className="text-center">
          <p className="text-[22px]">Страница не найдена!</p>
          <p className="text-[14px] text-secondary/60">Перенаправление через {redirectSeconds}...</p>
        </div>
      </div>
    </section>
  );
};
