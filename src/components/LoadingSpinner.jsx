import { Bars } from 'react-loader-spinner';
function LoadingSpinner() {
  return (
    <>
      <Bars
        height='25'
        width='40'
        color='#4d7c58'
        ariaLabel='bars-loading'
        visible={true}
      />
    </>
  );
}
export default LoadingSpinner;
