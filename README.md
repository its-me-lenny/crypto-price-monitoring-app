# **Crypto Price Monitoring App**

### _A Firebase-React JS Project_

<br><br>

# Table of Contents

- [Project Description](#description)
- [Development Challenges](#challenges)
- [Application Improvements (Optional)](#improvements)
- [How To Setup](#setup)
- [Credits](#credits)

<br>

## **Description**

Welcome fellow developer, thank you for your interest in this project. I created projects like this to mainly put into practice and deep dive into the React library and at the same time learn some backend technologies.

This is a crypto price monitoring app powered by [**CoinGecko**](https://www.coingecko.com/) that requires user authentication. You can choose coins to be included with your watchlist. [**Firebase**](https://firebase.google.com/) handles the backend (Authentication, Firestore) while for the frontend, the [**React library**](https://reactjs.org/) was used. Styling was done using [**Tailwind CSS**](https://tailwindcss.com/).

<br>

## **Challenges**

- Unsubscribing the listeners of the Firestore database during sign out in the useEffect hook. _(Resolved)_

<br>

## **Improvements**

- For added security, another page can be implemented where the user will get redirected to verify their email address after signing up, the [sendEmailVerification method](https://firebase.google.com/docs/auth/web/manage-users#send_a_user_a_verification_email) built in Firebase Authentication can be used for this. _Note: This adds frictions to the users._

- A stricter password requirement on registration. There are multiple ways to implement this type of validation.

<br>

## **Setup**

1. You can either [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) the repository or [download](https://github.com/its-me-lenny/crypto-price-monitoring-app/archive/refs/heads/main.zip) and extract it in your local machine.

2. You need to [create](https://firebase.google.com/docs/web/setup#create-project) a Firebase project (I did not enable Analytics in my project) and [register](https://firebase.google.com/docs/web/setup#register-app) this app.

3. You need to create an .env file first with these variables which will contain the configuration from Firebase. This will help prevent others to have access to your configuration data if you are planning to share the codebase to others. Just make sure that the _.env_ is included in your _.gitignore_ file.} :

   > `VITE_FB_APIKEY=` <br> `VITE_FB_AUTHDOMAIN= `<br> `VITE_FB_PROJECTID=` <br> `VITE_FB_STORAGEBUCKET=` <br> `VITE_FB_MESSAGINGSENDERID=` <br> `VITE_FB_APPID=` <br>

4. To initialize the Firebase SDK and for the app to be able to use the Firebase services, fill out the corresponding variables in the _.env_ file with your configuration data that looks like this:

   > `const firebaseconfig = {
//...
}`

5. Run the following command on the root directory of the codebase:

   > `npm install`

6. After succesfull installation of dependencies, you can now run the command,

   > `npm run dev`

   to start serving the app on your local machine.

7. Always remember to use a **real and valid email** for registration, as this has a email verification process. If you want, you can remove it to reduce friction to the user flow but it will take major changes on the routing and to some of the components.

8. If you want to deploy the app, just initiate the command:

   > `npm run build`

   After that, you can use the _dist_ folder in the root directory for your production deployment.

<br>

## **Credits**

- For data fetching, [Axios](https://axios-http.com/docs/intro).
- For icons, [react-icons](https://react-icons.github.io/react-icons/).
- For price charting, [react-sparklines](https://github.com/borisyankov/react-sparklines).
- For sanitizing HTMl content, [DOMPurify](https://github.com/cure53/DOMPurify)
- For routing, [react-router-dom](https://reactrouter.com/en/main/start/tutorial).
- Rocket favicon by [Icons8](https://icons8.com/icon/9378/rocket).
- [Tutorial and inspiration](https://www.youtube.com/watch?v=gYCOWMbt31k&t=15198s) from [Code Commerce](https://www.youtube.com/@LamaDev/featured) ([fireclint](https://github.com/fireclint) on GitHub).
- [Vite](https://vitejs.dev/) for bootstrapping the project.
