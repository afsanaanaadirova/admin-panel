import { SkeletonType } from "./skeleton";

const Shimmer = ({ className = "w-full h-full min-h-[16px]" }: SkeletonType) => {
  
  return (
    <div className={`animate-pulse bg-gradient-to-r from-gray/70 to-gray/50 rounded ${className}`}>
    </div>
  );
};

export default Shimmer;