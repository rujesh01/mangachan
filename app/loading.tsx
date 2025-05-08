const Loading = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
        <p className="mt-6 text-lg font-semibold animate-pulse">
          Loading, please wait...
        </p>
      </div>
    );
  };
  
  export default Loading;
  