/**
 * This file was created to handle joyride globally and taught me that it was really bad idea, the hard way.
 * Running joyride on component mount and different joyride components for different route is BEST.
 * Don't need this file for now (might delete it in future)
 */



// import { type CallBackProps, type Step, STATUS, EVENTS } from 'react-joyride';
// import { create } from "zustand";

// type JoyRideNeedsType = {
//     steps: Step[],
//     stepIndex: number,
//     run: boolean,
//     firstTime: boolean,
// }

// type JoyRideStoreType = {
//     tState: JoyRideNeedsType,

//     setStepIndex : (index: number) => void,
//     setRun : (runStatus: boolean) => void,
//     nextStep: () => void,
//     customJoyCallback: (data: CallBackProps) => void,
//     pushNewStep: (data: Step) => void,
// }

// const steps: Step[] = [
//   {
//     target: 'body',
//     title: "Welcome to My Food Delivery Website Zomiggy",
//     content: 'This is my first ride, where I will tell about application',
//     placement: 'center' as const,
//   },
//   {
//     target: '#city-search-component',
//     content: 'Please select one of the city to view restaurants',
//     placement: "top",
//     disableScrolling: true,
//     hideFooter: true,
//     disableBeacon: true,

//     styles: {
//       tooltip: {
//         backgroundColor: '#fff3cd',
//         border: '1px solid #ffeaa7'
//       }
//     }
//   },
// ];


// export const useJoyRideStore = create<JoyRideStoreType>()(
//     (set, get) => ({
//         tState: {
//             steps: steps,
//             stepIndex: 0,
//             run: true,
//             firstTime: true,
//         },
//         setStepIndex: (index: number) => 
//             set( (state) => ({
//                 tState: {
//                     ...state.tState,
//                     stepIndex: index,
//                 }
//             })),

//         setRun: (runStatus: boolean) => 
//             set( (state)=> ({
//                 tState: {
//                     ...state.tState,
//                     run: runStatus,
//                 }
//             })),

//         nextStep: () =>
//             set((state) => ({
//                 tState: {
//                     ...state.tState,
//                     stepIndex: state.tState.stepIndex + 1,
//                 }
//             })),

//         customJoyCallback: (data: CallBackProps) => {
//             const { action, index, type, status} = data;
//             console.log("Current index: ", index, "Action: ", action, "Type: ", type);
            
            
//             // if (index === 1 && ( type === 'step:after')){
//             //     get().setRun(false);
//             //     get().setStepIndex(1);
//             //     console.log("Set run after : ", get().tState.run);
//             //     return;
//             // }

//             // if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
//             //     get().nextStep();
//             // } 
//             // else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
//             //     // You need to set our running state to false, so we can restart if we click start again.
//             //     get().setRun(false);
//             // }
            
//             if (action === 'next' && type === 'step:after'){
//                 get().setRun(false);
//             }

//             if (action === 'close' || action === 'skip'){
//                 get().setRun(false);
//             }

//         },

//         pushNewStep: (data: Step) => 
//             set((state) => ({
//                 tState: {
//                     ...state.tState,
//                     steps: [
//                         ...state.tState.steps,
//                         data,
//                     ]
//                 }
//             }))
//     })
// )
