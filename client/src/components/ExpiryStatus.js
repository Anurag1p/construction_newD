import React from 'react';

function ExpiryReminder(props) {
  const { data } = props;

  const breakdate = data?.split("-");
  const day = breakdate[2];
  const month = breakdate[1];
  const year = breakdate[0];
  const expiryDate = `${year}-${month}-${day}`;

  const today = new Date();
  const expirationDate = new Date(expiryDate);
  const timeDifference = expirationDate - today;
  const daysRemaining = timeDifference > 0 ? Math.ceil(timeDifference / (1000 * 3600 * 24)) : 0;

  const buttonStyle = {
    width: '130px', // Set the desired width here
  };

  return (
    <div>
      <button  style={buttonStyle} className={`bg-${daysRemaining > 0 ? 'info' : 'danger'} rounded-4 text-white border-0`}>
        {daysRemaining > 0 ? `Expires in ${daysRemaining} days` : 'Expired'} {daysRemaining <= 0 && <i className="fa fa-warning"></i>}
      </button>
    </div>
  );
}

export default ExpiryReminder;
