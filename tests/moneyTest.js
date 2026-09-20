import {formatCurrency} from '../scripts/utils/money.js';
if(formatCurrency(2095) === '20.95'){
  console.log('formatCurrency1 test passed');
}
else{
  console.log('formatCurrency1 test failed');
}

if(formatCurrency(0) === '0.00'){
  console.log('formatCurrency2 test passed');
}
else{
  console.log('formatCurrency2 test failed');
}

if(formatCurrency(2000.5) === '20.01'){
  console.log('formatCurrency3 test passed');
}
else{
  console.log('formatCurrency3 test failed');
}