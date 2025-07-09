// 'use client';

// import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
// const ProgressBarProvider = ({ children }) => {
//   return (
//     <>
//       {children}
      
//       <ProgressBar
//         height="4px"
//         color="black"
//         options={{ showSpinner: false }}
//         shallowRouting
//       />
//     </>
//   );
// };

// export default ProgressBarProvider;

'use client';
//import { Prog } from "next-nprogress-bar";
import { AppProgressBar } from "next-nprogress-bar";
const ProgressBarProvider = ({ children }) => {
  // console.log("ProgressBar");
  return (
    <>
    
      <AppProgressBar
        height="4px"
        color="red"
        options={{ showSpinner: false }}
        shallowRouting={false}
      />
      {children}
    </>
  );
};

export default ProgressBarProvider;