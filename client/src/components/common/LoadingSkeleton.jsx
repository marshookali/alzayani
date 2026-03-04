const LoadingSkeleton = ({ count = 8, variant = 'card' }) => {
  if (variant === 'card') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse">
            <div className="w-full h-48 shimmer" />
            <div className="p-5 space-y-3">
              <div className="h-4 shimmer rounded w-3/4" />
              <div className="h-3 shimmer rounded w-1/2" />
              <div className="h-6 shimmer rounded w-1/3" />
              <div className="h-10 shimmer rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex gap-4 p-4 bg-white rounded-xl animate-pulse">
            <div className="w-24 h-16 shimmer rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 shimmer rounded w-1/2" />
              <div className="h-3 shimmer rounded w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default LoadingSkeleton;
