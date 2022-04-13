function LoadingSpinner() {
  return (
    <div className='fixed inset-0 z-50 flex justify-center items-center bg-black/50'>
      <div className='w-16 h-16 border-8 border-solid border-x-transparent border-t-black border-b-gray-700 rounded-full animate-spin'></div>
    </div>
  );
}

export default LoadingSpinner;
