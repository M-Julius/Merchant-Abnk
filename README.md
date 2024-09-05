# Merchant Abnk 
[![Codecov](https://codecov.io/gh/M-Julius/Merchant-Abnk/branch/main/graph/badge.svg)](https://codecov.io/gh/M-Julius/Merchant-Abnk)

[<img src="screenshoot/abnk.png" />](screenshot/abnk.png)
Merchant Abnk is a mobile application that displays a list of merchants at abnk, with authentication by phone number, and verify by code otp.

## Currently includes:
- [Demo](https://drive.google.com/file/d/1PPFvwRib2ypZCatcYbmaPnB2K08P4d0X/view?usp=sharing)
- Built with React Native CLI
- React Navigation for routing and navigation
- Redux Toolkit for state management
- TypeScript for type safety
- Unit Testing with coverage of 88%
- And more!


## Installation

1. Clone this repository

```bash
git clone https://github.com/M-Julius/Merchant-Abnk.git
```

2. Install dependencies

```bash
cd Merchant-Abnk
yarn install
```
3. Setup environment in ```.env```
```bash
API_URL='https://api.your.com/api' # add your API_URL in here
```

4. Run a

for android
```bash
yarn android 
```
for ios
```bash
cd ios
bundle install # you need to run this only once in your project.
bundle exec pod install
cd ..
```
```bash
yarn ios
```

## Feature App:
- [x] Splashscreen
- [x] Login with mobile number
- [x] Verify OTP
- [x] Homescreen - Merchant list
- [x] Profile Screen