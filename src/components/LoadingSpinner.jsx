import { Bars, Oval, RotatingLines, ThreeDots } from 'react-loader-spinner';

const spinnerType = {
  Bars,
  Oval,
  RotatingLines,
  ThreeDots,
};

function LoadingSpinner({
  spinner = 'Bars',
  height = '25',
  width = '40',
  color = '#4d7c58',
  visible = true,
}) {
  // 預設用 Bars
  const Spinner = spinnerType[spinner] || Bars;
  return (
    <>
      <Spinner
        height={height}
        width={width}
        color={color}
        strokeColor={color}
        visible={visible}
        ariaLabel='loading'
      />
    </>
  );
}
export default LoadingSpinner;
