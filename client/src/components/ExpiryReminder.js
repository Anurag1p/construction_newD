// src/components/ExpiryReminder.js
import React, { useState, useEffect } from 'react';

function ExpiryReminder(props) {






  const { data } = props;

  console.log(data,"expiry")

  const breakdate =  data?.split("-")
  const day = breakdate[0]
  const month = breakdate[1]
  const year = breakdate[2]

  const expiryDate = `${year}-${month}-${day}`

  console.log(expiryDate, "expiryDate")
  

  

  
  const [daysRemaining, setDaysRemaining] = useState(null);

  useEffect(() => {
    const today = new Date();
    const expirationDate = new Date(expiryDate);
    const timeDifference = expirationDate - today;

    if (timeDifference > 0) {
      const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24));
      setDaysRemaining(daysRemaining);
    }
  }, [expiryDate]);

  if (daysRemaining !== null) {
    return (
      <div>
        <button className="bg-warning rounded-4 text white border-0">Expires in {daysRemaining} days</button>
      </div>
    );
  } else {
    return <button className="bg-danger rounded-4 text-white border-0" >Expired <i className="fa fa-warning"></i></button>;
  }
}

export default ExpiryReminder;
