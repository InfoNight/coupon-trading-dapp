# Coupon Trading App

### Overview
- Project title: Decentralized coupon management service using NFT
- Project type: Option 1: Web3 app prototype
- Team name: InfoChain
- Team members: Kyoung Hur (student), Geonho Lee (student), Jaejun Lee (student)
- Mentor: John Kim


### Deliverables
- [Running Web3 app URL](https://infochaincloud.github.io/)
- [Web3 app introduction deck URL](https://docs.google.com/presentation/d/1C5zL0P1wUNnVmKoB6xi_VNBtECdriiv_PA_sJS-1AxM/edit?usp=sharing)
- [Youtube video URL](https://youtu.be/slv9It0doyE)
- [Smart contract URL](https://github.com/InfoNight/CouponNFT)
- To use our service, you need to register baobab network and receive faucet. You can get a faucet for free through this link.

### Summary 

This is a service that manages coupons through NFTs. Stores can create coupon types and mint coupon NFTs. The information entered into the coupon type is the coupon name, redeem unit, description, and image. When a coupon is minted, a QR code is automatically issued, and the store can deliver this QR code to the user along with the product. Meanwhile, the user enters the received QR code to claim the coupon. And when the coupon is collected and exceeds the redemption unit set by the store. When the coupon is redeemed, the store is notified and the store can receive the coupon.

The entire service is developed with a serverless architecture and is a fully decentralized application that creates and uses NFTs by requesting smart contracts and IPFS directly from the client. We implemented the process of Issue, Claim, Use, Receive, etc. with a smart contract, and deployed the smart contract to the baobab network through Remix. The image files and JSON files used to issue NFTs were distributed through pinata. For web services, we developed with React.js, used web3.js, axios for API calls, and used semantic UI as a css framework.