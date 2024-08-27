const imageContainer = document.querySelector(".image-container");
const prevbtn = document.querySelector("#prev");
const nextbtn = document.querySelector("#next");
let a = 0;
let timeout;
prevbtn.addEventListener("click", () => {
	a += 40;
	clearTimeout(timeout);
	updateFun();
	console.log(a);
});
nextbtn.addEventListener("click", () => {
	a -= 40;
	clearTimeout(timeout);
	updateFun();
	console.log(a);
});

function updateFun() {
	// imageContainer.style.transform = `perspective(1000px) rotateY(${a}deg) `;
	imageContainer.style.transform = `perspective(1000px) rotateX(${a}deg) `;
	// timeout = setTimeout(() => {
	// 	a -= 40;
	// 	updateFun();
	// }, 5000);
}
updateFun();
