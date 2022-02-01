import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useState } from 'react';
import MetaData from '../../MetaData';
import Shipping from './Shipping';
import ConfirmOrder from './ConfirmOrder';
import OrderSummery from "./OrderSummery";
import Logo from '../user/Logo';
import Payment from './Payment';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { selectBasket } from "../../slices/basketSilce";

function Checkout(){
    
    const [step, setStep] = useState(0);
    const { stripeApiKey } = useSelector(selectBasket);
    const steps = [
        {
          label: "Shipping Details",
          icon: <LocalShippingIcon />,
        },
        {
          label: "Confirm Order",
          icon: <LibraryAddCheckIcon />,
        },
        {
          label: "Payment",
          icon: <AccountBalanceIcon />,
        },
    ];

    return (
        <div className='checkout' style={{
            backgroundColor:"white",
            paddingTop:"20px",
        }}> 
           <Logo />
            <MetaData title={`step ${step+1}`} />
           <Stepper activeStep={step} alternativeLabel>
               {steps.map((item, index) => (
                    <Step
                       key={index}
                       active={step === index ? true : false}
                       completed={step >= index ? true : false}
                    >
                       <StepLabel
                            style={{
                              color: step >= index ? "rgb(255, 187, 0)" : "rgba(0, 0, 0, 0.649)",
                            }}
                            icon={item.icon}
                        >
                           {item.label}
                        </StepLabel>
                    </Step>
                ))}
           </Stepper>

           <h1 style={{ 
               margin:"20px auto",
               textAlign:"center",
               borderBottom:"1px solid gray" ,
               maxWidth:"300px",
               paddingBottom:"20px",
               color:"rgba(0, 0, 0, 0.649)"
            }}>{steps[step].label}</h1>

            {step === 0 && <Shipping nextStep={() =>{setStep(1)}} />}
            {step === 1 && (
              <div style={{
                display:"flex",
                flexWrap:"wrap",
                justifyContent:"center"
              }}>
                <ConfirmOrder />
                <OrderSummery
                  prevStep={() =>{setStep(0)}}
                  nextStep={() =>{setStep(2)}}
                />
              </div>
            )}

            {step === 2 && (
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment prevStep={() =>{setStep(1)}} />
              </Elements>
            )}
        </div>
    );
}

export default Checkout;