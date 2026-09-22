import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
export const deliveryOptions = [{
  id : '1',
  deliveryDays : 7,
  priceCents : 0
},{
  id : '2',
  deliveryDays : 3,
  priceCents : 499
}, {
  id : '3',
  deliveryDays : 1,
  priceCents : 999
}];

export function getDeliveryOption(deliveryOptionId){
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if(option.id === deliveryOptionId){
      deliveryOption = option;
    }
  });
  return deliveryOption;
}

function isWeekend(date){
  const dayOfWeek = date.format('dddd');
  if(dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday'){
    return true;
  }
  return false;
}

export function calculateDeliveryDate(deliveryOption){
  let deliveryDate = dayjs(); //today
  let deliveryDays = deliveryOption.deliveryDays;
  while(deliveryDays > 0){
    deliveryDate = deliveryDate.add(1, 'day');
    if(!isWeekend(deliveryDate)){
      deliveryDays--;
    }
  }
  const dateString = deliveryDate.format('dddd, MMMM D');
  return dateString;
}