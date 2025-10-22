export const GradientSpinner = () => {
  return (
    <div className="relative top-1/2 left-1/2 h-24 w-24 rounded-full bg-gradient-to-b from-[#9b59b6] via-[#84cdfa] to-[#5ad1cd] animate-rotate_3922">
      <span className="absolute h-full w-full rounded-full bg-gradient-to-b from-[#9b59b6] via-[#84cdfa] to-[#5ad1cd] blur-[5px]" />
      <span className="absolute h-full w-full rounded-full bg-gradient-to-b from-[#9b59b6] via-[#84cdfa] to-[#5ad1cd] blur-[10px]" />
      <span className="absolute h-full w-full rounded-full bg-gradient-to-b from-[#9b59b6] via-[#84cdfa] to-[#5ad1cd] blur-[25px]" />
      <span className="absolute h-full w-full rounded-full bg-gradient-to-b from-[#9b59b6] via-[#84cdfa] to-[#5ad1cd] blur-[50px]" />
      <div className="absolute inset-[10px] rounded-full border-[5px] border-white bg-white"></div>

      <style>{`
        @keyframes rotate_3922 {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        .animate-rotate_3922 {
          animation: rotate_3922 1.2s linear infinite;
          position: absolute;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </div>
  );
};
