import { useEffect, useRef } from "react";
//مسئول تشخیص  اینکه کاربر به انتهای لیست رسیده یا نه تا فرایند اسکرول و گرفتن دیتای استارت  بخوره 
export function useIntersectionObserver({
  onIntersect,
  enabled = true,
  root = null,
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      {
        root,       
        threshold: 0.1,
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [onIntersect, enabled, root]);

  return ref;
}
