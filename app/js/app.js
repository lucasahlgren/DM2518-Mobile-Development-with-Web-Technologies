// Initialize Firebase
var config = {
	apiKey: "AIzaSyDFN8hxCYuOipmB-UWY0JsQPICV6jSqxHM",
	authDomain: "shapping-41333.firebaseapp.com",
	databaseURL: "https://shapping-41333.firebaseio.com",
	projectId: "shapping-41333",
	storageBucket: "shapping-41333.appspot.com",
	messagingSenderId: "987966090005"
};
firebase.initializeApp(config);

//We instantiate our model
this.model = new ShoppingModel();
var scanElement = document.getElementById("scanProduct.html")

// Current user
var currenUser;

// References
var searchElement = document.getElementById("search.html")
var printSearch = document.getElementById("search")
var payElement = document.getElementById("pay.html")
var payProductsElement = document.getElementById("productsContent")
var payUserElement = document.getElementById("checkoutUser")
var cartElement = document.getElementById("shoppingCart.html")
var printCart = document.getElementById("shoppingCart")
var loginElement = document.getElementById("logIn.html")
var defaultElement = document.getElementById("default-page")
var productInfoElement = document.getElementById("productInfo.html")
var printproductInfo = document.getElementById("productInfo")
var signUpElement = document.getElementById("signUp.html")
var navBarElement = document.getElementById("navBar.html")
var loginInfoElement = document.getElementById("loginInfo")
var signUpInfoElement = document.getElementById("signUpInfo")

// Login, Logout, Sign up
var logoutBtn = document.getElementById("logoutBtn");
var inputEmail = document.getElementById("inputEmail");
var inputPassword = document.getElementById("inputPassword");
var loginBtn = document.getElementById("loginBtn");
var emailSignUp = document.getElementById("inputEmailSignUp")
var passwordSignup = document.getElementById("inputPasswordSignUp")

//Pay
var qrCode = document.getElementById("payQR")


// Show sign up page
function signUpPage() {
	//console.log("signUp")
	signUpElement.style.display = "block"
	loginElement.style.display = "none"
}

// Sign up a user on firebase
function signUpUser() {
	const email = emailSignUp.value
	const password = passwordSignup.value

	//Create new user with firebase
	const promise = firebase.auth().createUserWithEmailAndPassword(email, password)
	promise.catch(e => {

		// Display error message
		signUpInfoElement.style.display = "block"

		if (e.code === "auth/email-already-in-use") {
			signUpInfoElement.innerHTML = "Email already exists, try another one!"
		} else if (e.code === "auth/weak-password") {
			signUpInfoElement.innerHTML = "Password should be at least 6 characters!"
		} else if (e.code === "auth/network-request-failed") {
			loginInfoElement.innerHTML = "No internet access!"
			alert("No internet access!")
		}
	})

	this.currentUser = firebase.auth().currentUser

	//Create a user instance in database for the created user
	firebase.firestore().doc('users/' + this.currentUser.uid).set({
		email: this.currentUser.email,
	})
	firebase.firestore().doc('users/' + this.currentUser.uid).collection('shoppingCart')
		.catch((err) => {
			console.log("Error: " + err);
		})
	currenUser = this.currentUser;
	//console.log("current user setup:" + currenUser)
}

// Runs when app.js start
function start() {

	// Show login
	scanElement.style.display = "none";
	payElement.style.display = "none";
	productInfoElement.style.display = "none";
	searchElement.style.display = "none";
	cartElement.style.display = "none";
	navBarElement.style.display = "none";
	signUpElement.style.display = "none";
	loginInfoElement.style.display = "none";
	signUpInfoElement.style.display = "none";
	loginElement.style.display = "block";

	// Go to login
	login()
}

// Login
function login() {

	// Eventlistener for login button
	loginBtn.addEventListener("click", e => {
		const email = inputEmail.value;
		const pass = inputPassword.value;
		const auth = firebase.auth();

		// Sign in
		const promise = auth.signInWithEmailAndPassword(email, pass);
		promise.catch(e => {

			// Display error message
			loginInfoElement.style.display = "block"

			if (e.code === "auth/invalid-email") {
				loginInfoElement.innerHTML = "Invalid email, try again!"
			} else if (e.code === "auth/user-not-found") {
				loginInfoElement.innerHTML = "User doesn't exist, try again!"
			} else if (e.code === "auth/wrong-password") {
				loginInfoElement.innerHTML = "Wrong password, try again!"
			} else if (e.code === "auth/network-request-failed") {
				loginInfoElement.innerHTML = "No internet access!"
				alert("No internet access!")
			}

			console.log(e)
		});
	})
}

// OnstateChanged
firebase.auth().onAuthStateChanged(firebaseUser => {

	// When a user is logged in, enter the app.
	if (firebaseUser) {
		//console.log(firebaseUser);
		this.currentUser = firebase.auth().currentUser
		currenUser = this.currentUser

		// Remove error message
		loginInfoElement.style.display = "none"
		loginInfoElement.innerHTML = ''

		signUpInfoElement.style.display = "none"
		signUpInfoElement.innerHTML = ''

		console.log("current user: uid " + currenUser.uid + ' email: ' + currenUser.email)
		enterApp()

	} else {
		console.log("not logged in");
	}
})

// Logout eventlistener
logoutBtn.addEventListener("click", e => {
	firebase.auth().signOut();
	inputEmail.value = ''
	inputPassword.value = ''
	inputEmailSignUp.value = ''
	inputPasswordSignUp.value = ''
	qrCode.style.display = "none";
	loginPage()
})

// Enter app when user login
function enterApp() {
	loginElement.style.display = "none"
	navBarElement.style.display = "flex";
	model.setCurrentUser(currenUser);
	searchPage()
}

// QR-code and pay message
function payMessage() {
	var shoppingCart = model.returnShoppingCart()

	if (shoppingCart.length > 0) {
		ons.notification.alert({ message: 'You paid: ' + model.getTotalPrice() + ' kr.', title: 'Congratulation!' })
		qrCode.style.display = "block";
	} else {
		ons.notification.alert({ message: 'Put a product in the cart and come back.', title: 'Shopping cart is empty!' })
	}
}

// App pages

function loginPage() {
	searchElement.style.display = "none";
	scanElement.style.display = "none";
	payElement.style.display = "none";
	cartElement.style.display = "none";
	loginElement.style.display = "block"
	navBarElement.style.display = "none";
	productInfoElement.style.display = "none";
	printproductInfo.style.display = "none";
	signUpElement.style.display = "none";
}

function searchPage() {
	var search = new Search(model, printSearch)
	var pay = new Pay(model, payProductsElement, payUserElement, currentUser)
	var shoppingCart = new ShoppingCart(model, printCart, currenUser)
	//console.log("nu körs search")

	searchElement.style.display = "block";
	scanElement.style.display = "none";
	payElement.style.display = "none";
	cartElement.style.display = "none";
	productInfoElement.style.display = "none";
	loginElement.style.display = "none"
	signUpElement.style.display = "none"
	navBarElement.style.display = "block";
}

function scanPage() {
	searchElement.style.display = "none";
	scanElement.style.display = "block";
	payElement.style.display = "none";
	cartElement.style.display = "none";
	productInfoElement.style.display = "none";
	loginElement.style.display = "none"
	signUpElement.style.display = "none"
	navBarElement.style.display = "block";
	var beaconApp = new BeaconApp(model, scanElement)
	beaconApp.startScanning();
}

function payPage() {
	searchElement.style.display = "none";
	scanElement.style.display = "none";
	payElement.style.display = "block";
	cartElement.style.display = "none";
	productInfoElement.style.display = "none";
	loginElement.style.display = "none"
	signUpElement.style.display = "none"
	navBarElement.style.display = "block";
	model.runShoppingCartLoader();
}

function cartPage() {
	searchElement.style.display = "none";
	scanElement.style.display = "none";
	payElement.style.display = "none";
	cartElement.style.display = "block";
	productInfoElement.style.display = "none";
	loginElement.style.display = "none"
	signUpElement.style.display = "none"
	navBarElement.style.display = "block";
	model.runShoppingCartLoader();
}

function productInfoPage(g) {
	model.setCurrentProduct(g);
	var pressInfo = new PressInfo(model, printproductInfo)
	searchElement.style.display = "none";
	scanElement.style.display = "none";
	payElement.style.display = "none";
	cartElement.style.display = "none";
	productInfoElement.style.display = "block";
	loginElement.style.display = "none"
	signUpElement.style.display = "none"
	navBarElement.style.display = "block";
	printproductInfo.style.display = "block";
}

start()