const quotes = [
  {
    quote: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
  },
  {
    quote: "Happiness is an uphill battle. Wear the good shoes.",
    author: "Kurt Vonnegut",
  },
  {
    quote: "Without ice cream, there would be chaos and darkness.",
    author: "Don Kardong",
  },
  {
    quote: "When things go wrong, don't go with them.",
    author: "Elvis Presley",
  },
  {
    quote: "Happiness is a warm puppy.",
    author: "Charles M. Schulz",
  },
  {
    quote: "Happiness never decreases by being shared.",
    author: "Buddha",
  },
  {
    quote: "Happiness is a choice. You can choose to be happy.",
    author: "Anonymous",
  },
  {
    quote:
      "Happiness is not something ready made. It comes from your own actions.",
    author: "Dalai Lama",
  },
  {
    quote: "Happiness is not a goal... it's a by-product of a life well lived.",
    author: "Eleanor Roosevelt",
  },
  {
    quote: "Happiness is not a goal... it's a by-product of a life well lived.",
    author: "Eleanor Roosevelt",
  },
];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;