export const GradientSpinner = () => {
  return (
    <div className="relative inline-block h-[35px] w-[35px] animate-spin78236">
      <div className="absolute h-full w-[30%] bottom-[5%] left-0 origin-[50%_85%] rotate-[60deg]">
        <div className="absolute bottom-0 left-0 w-full pb-full bg-[#5D3FD3] rounded-full animate-wobble1 delay-[-0.3s]" />
      </div>

      <div className="absolute h-full w-[30%] bottom-[5%] right-0 origin-[50%_85%] -rotate-[60deg]">
        <div className="absolute bottom-0 left-0 w-full pb-full bg-[#5D3FD3] rounded-full animate-wobble1 delay-[-0.15s]" />
      </div>

      <div className="absolute h-full w-[30%] bottom-[-5%] left-0 translate-x-[116.666%]">
        <div className="absolute top-0 left-0 w-full pb-full bg-[#5D3FD3] rounded-full animate-wobble2" />
      </div>

      <style>{`
        @keyframes spin78236 {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes wobble1 {
          0%, 100% {
            transform: translateY(0%) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateY(-66%) scale(0.65);
            opacity: 0.8;
          }
        }

        @keyframes wobble2 {
          0%, 100% {
            transform: translateY(0%) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateY(66%) scale(0.65);
            opacity: 0.8;
          }
        }

        .animate-spin78236 {
          animation: spin78236 2s linear infinite;
        }

        .animate-wobble1 {
          animation: wobble1 0.8s ease-in-out infinite;
        }

        .animate-wobble2 {
          animation: wobble2 0.8s ease-in-out infinite;
        }

        .delay-[-0.3s] {
          animation-delay: -0.3s;
        }

        .delay-[-0.15s] {
          animation-delay: -0.15s;
        }

        .pb-full {
          padding-bottom: 100%;
        }
      `}</style>
    </div>
  );
};
