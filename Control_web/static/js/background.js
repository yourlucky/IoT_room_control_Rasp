const images = ["0.jpeg", "1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg"];

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");
//bgImage.src = `img/${chosenImage}`;
//console.log("{{url_for('static',filename='img/${chosenImage}')}}");
bgImage.src = "{{url_for('static',filename='img/${chosenImage}')}}";
document.body.appendChild(bgImage);
bgImage.classList.add("bgImage");
