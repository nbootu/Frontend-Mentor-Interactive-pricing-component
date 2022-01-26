/* set pricing options */
const options = [
  {
    price: 0,
    pageviews: 1,
    websites: 2,
  },
  {
    price: 90,
    pageviews: 10,
    websites: 10,
  },
  {
    price: 144,
    pageviews: 25,
    websites: 100,
  },
  {
    price: 225,
    pageviews: 50,
    websites: 1000,
  },
  {
    price: 450,
    pageviews: 100,
    websites: 'Unlimited',
  },
];

/* get elements on page */
const elSlider = document.querySelector('input[type="range"]');
const elPageviews = document.querySelector('.pageviews');
const elPrice = document.querySelector('.price > span');
const elBillingPeriod = document.querySelector('.price');
const elWebsites = document.querySelector('ul > li:first-child');
const elSwitch = document.querySelector('.bill-switcher input');

/* take a slider element, return a percentage string for use in CSS */
const rangeToPercent = (slider) => {
  const max = slider.getAttribute('max') || 10;
  const percent = (slider.value / max) * 100;

  return `${parseInt(percent)}%`;
};

/* change the billing period basend on the switch element */
const changeBillingPeriod = () => {
  // Check if switch is on
  const checked = elSwitch.checked;
  let billingPeriod;

  if (!checked) {
    console.log('off');
    // Switch is off -> monthly
    options.map((option) => (option.price /= 9));
    billingPeriod = ' / month';
    setValues(elSlider, billingPeriod);
  } else {
    // Switch is on -> yearly
    console.log('on');
    options.map((option) => (option.price *= 9));
    billingPeriod = ' / year';
    setValues(elSlider, billingPeriod);
  }

  elBillingPeriod.childNodes[1].replaceWith(billingPeriod);
};

/* set the values based on the range element */
const setValues = (slider) => {
  const idx = slider.value;

  let price = `$${options[idx].price}.00`;
  let pageviews = `${options[idx].pageviews}K Pageviews`;
  let websites = `${options[idx].websites} websites`;

  elPageviews.innerText = pageviews;
  elPrice.innerText = price;
  elWebsites.innerText = websites;
};

/* on page load, set the fill amount and set the billing period */
changeBillingPeriod();
elSlider.style.setProperty('--track-fill', rangeToPercent(elSlider));

/* when a slider changes, update the fill prop and set the values */
elSlider.addEventListener('input', (e) => {
  e.target.style.setProperty('--track-fill', rangeToPercent(e.target));
  setValues(elSlider);
});

// listen to change on input
elSwitch.addEventListener('input', changeBillingPeriod);
