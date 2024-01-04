// src/components/ExpiryReminder.js
import React, { useState, useEffect } from 'react';

function ExpiryReminder(props) {

  const { data } = props;

// console.log("heelodate", data)

  const breakdate =  data?.split("-")
  console.log("breakdate", breakdate)
  
  const day = breakdate[2]
  const month = breakdate[1]
  const year = breakdate[0]
  console.log("day", day)
  console.log("month", month)
  console.log("year", year)

  const expiryDate = `${year}-${month}-${day}`
  
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
