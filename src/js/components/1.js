const a = 1;
const promise = new Promise((resolve, reject) => {
	setTimeout(()=> {resolve('Promise success!!!')}, 1000);
});

promise.then(data => {
	console.log(data);
}).catch(console.error);