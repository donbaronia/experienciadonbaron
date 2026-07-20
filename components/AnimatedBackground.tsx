export function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-noir" />
      <div className="absolute inset-0 bg-noir-depth" />

      <div
        className="absolute left-1/2 top-[-20%] h-[40vh] w-[50vw] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(212,175,55,0.05) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-[-30%] right-[-10%] h-[40vh] w-[30vw] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(212,175,55,0.025) 0%, transparent 65%)",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,0.5) 100%)",
        }}
      />
    </div>
  );
}
